package Backend.config;

import Backend.model.Permission;
import Backend.model.Role;
import Backend.model.User;
import Backend.repository.PermissionRepository;
import Backend.repository.RoleRepository;
import Backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DefaultDataConfig {

    private static final String ADMIN_EMAIL = "mandiptamang159@gmail.com";
    private static final String DEFAULT_PASSWORD = "As1@mandip";

    @Bean
    public CommandLineRunner loadDefaultData(
            PermissionRepository permissionRepository,
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return _ -> {
            // Default permissions
            Permission createUser = getOrCreatePermission("CREATE_USER", permissionRepository);
            Permission readUser = getOrCreatePermission("READ_USER", permissionRepository);
            Permission updateUser = getOrCreatePermission("UPDATE_USER", permissionRepository);
            Permission deleteUser = getOrCreatePermission("DELETE_USER", permissionRepository);

            // Combine permissions into a set
            Set<Permission> allPermissions = Set.of(createUser, updateUser, readUser, deleteUser);

            // Create default roles
            Role adminRole = getOrCreateRole("ADMIN", allPermissions, roleRepository);

            // Create default users
            createDefaultUser(
                    "Mandip Tamang",
                    ADMIN_EMAIL,
                    DEFAULT_PASSWORD,
                    adminRole,
                    userRepository,
                    passwordEncoder);

        };
    }

    private Permission getOrCreatePermission(String permissionName, PermissionRepository repository) {
        return repository.findByName(permissionName).orElseGet(() -> {
            Permission permission = new Permission();
            permission.setName(permissionName);
            return repository.save(permission);
        });
    }

    private Role getOrCreateRole(String roleName, Set<Permission> permissions, RoleRepository repository) {
        Role roleExist = repository.findByName(roleName);

        if (roleExist != null) {
            return roleExist; // Return the existing role, no need to create a new one
        }
        Role role = new Role();
        role.setName(roleName);
        role.setPermissions(permissions);
        return repository.save(role);
    }

    private void createDefaultUser(
            String name,
            String email,
            String password,
            Role roles,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        userRepository.findByEmail(email).orElseGet(() -> {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(roles);
            return userRepository.save(user);
        });
    }
}
