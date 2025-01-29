package Backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.dto.UserDTO;
import Backend.model.Role;
import Backend.model.User;
import Backend.repository.RoleRepository;
import Backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public User createUser(UserDTO userDTO) {

        Optional<User> existUserOptional = userRepository.findByEmail(userDTO.getEmail());

        if (existUserOptional.isPresent()) {
            throw new RuntimeException("User email already exists");
        }

        // Map DTO to User entity
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        Role role = roleRepository.findByName(userDTO.getRole().getName());

        if (role == null) {
            throw new RuntimeException("Role '" + userDTO.getRole().getName() + "' not found.");
        }

        user.setRole(role);

        return userRepository.save(user);

    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        // Fetch existing user or throw an exception if not found
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found."));

        // Check if the email is already in use by another user
        if (!user.getEmail().equals(userDTO.getEmail()) && userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("The provided email is already in use.");
        }

        // Update user details
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());

        // Update password if provided (and hash it)
        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        // Update role if provided
        if (userDTO.getRole() != null && userDTO.getRole().getName() != null) {
            Role role = roleRepository.findByName(userDTO.getRole().getName());
            if (role == null) {
                throw new RuntimeException("Role '" + userDTO.getRole().getName() + "' not found.");
            }
            user.setRole(role);
        }

        // Save updated user
        User updatedUser = userRepository.save(user);

        // Convert updated user to UserDTO and return
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
