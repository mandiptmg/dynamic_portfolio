// package Backend.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import Backend.dto.JwtResponseDTO;
// import Backend.dto.LoginDTO;
// import Backend.model.RefreshToken;
// import Backend.model.User;
// import Backend.repository.UserRepository;

// @Service
// public class LoginService {
    
//     // @Autowired
//     // private UserRepository userRepository;

//     //   // login
//     // public JwtResponseDTO login(LoginDTO loginDTO) {

//     //     User user = userRepository.findByEmail(loginDTO.getEmail());
//     //     if (user == null) {
//     //         throw new RuntimeException("Email not found");
//     //     }


//     //     // Validate password manually
//     //     if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
//     //         throw new BadCredentialsException("Invalid password");
//     //     }

//     //     // Authenticate user credentials
//     //     Authentication authentication = authManager.authenticate(
//     //             new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

//     //     if (authentication == null) {
//     //         throw new RuntimeException("Authentication failed");
//     //     }
//     //     // Generate Tokens
//     //     String accessToken = jwtService.generateAccessToken(loginDTO.getEmail());
//     //     // Generate Refresh Token
//     //     RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginDTO.getEmail());

//     //     return JwtResponseDTO.builder()
//     //             .accessToken(accessToken)
//     //             .refreshToken(refreshToken.getToken())
//     //             .message("Login successful")
//     //             .build();

//     // }


// }
