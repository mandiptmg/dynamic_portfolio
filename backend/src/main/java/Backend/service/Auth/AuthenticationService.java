package Backend.service.Auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Backend.dto.JwtResponseDTO;
import Backend.dto.LoginDTO;
import Backend.model.RefreshToken;
import Backend.model.User;
import Backend.repository.UserRepository;
import Backend.service.JWT.JwtService;
import Backend.service.JWT.RefreshTokenService;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    // login
    public JwtResponseDTO login(LoginDTO loginDTO) {

        Optional<User> user = userRepository.findByEmail(loginDTO.getEmail());
        if (user == null) {
            throw new RuntimeException("Email not found");
        }

        // Validate password manually
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.get().getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        // Authenticate user credentials
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        if (authentication == null) {
            throw new RuntimeException("Authentication failed");
        }

        // Generate Tokens
        String accessToken = jwtService.generateAccessToken(loginDTO.getEmail());
        // Generate Refresh Token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginDTO.getEmail());

        return JwtResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .message("Login successful")
                .build();
    }

}
