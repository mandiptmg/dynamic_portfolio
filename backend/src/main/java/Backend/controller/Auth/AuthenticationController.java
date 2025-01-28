package Backend.controller.Auth;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.dto.JwtResponseDTO;
import Backend.dto.LoginDTO;
import Backend.dto.RefreshTokenRequestDTO;
import Backend.model.ApiResponse;
import Backend.service.Auth.AuthenticationService;

// import Backend.repository.UserRepository;
// import Backend.service.JWT.JwtService;
import Backend.service.JWT.RefreshTokenService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authService;

    // @Autowired
    // private JwtService jwtService;

    // @Autowired
    // private UserRepository userRepository;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        JwtResponseDTO token = authService.login(loginDTO);
        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        refreshTokenService.revokeRefreshToken(refreshTokenRequestDTO.getToken());
        return buildResponse(
                "success",
                HttpStatus.OK,
                "Logged out successfully",
                null);
    }

    // // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }
}
