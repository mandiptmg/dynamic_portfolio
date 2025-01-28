package Backend.service.JWT;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.model.RefreshToken;
import Backend.model.User;
import Backend.repository.RefreshTokenRepository;
import Backend.repository.UserRepository;


@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public RefreshToken createRefreshToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email not found"));
      
        // Check if the user already has a refresh token
        RefreshToken existingToken = user.getRefreshToken();
        Instant expiryDate = Instant.now().plusMillis(1000 * 60 * 60 * 24); // 24 hours expiry

        if (existingToken != null) {
            // Update the expiry date of the existing token
            existingToken.setExpiryDate(expiryDate); // 24 hours expiry
            return refreshTokenRepository.save(existingToken);
        }

        // Create a new refresh token if none exists
        RefreshToken newToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expiryDate(expiryDate) // 24 hours expiry
                .user(user)
                .build();

        // Associate the new token with the user
        user.setRefreshToken(newToken);

        return refreshTokenRepository.save(newToken);
    }

    // ✅ Validate Refresh Token
    public RefreshToken validateRefreshToken(String token) {
        // Find the refresh token in the database
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        // Check if the token is expired
        if (refreshToken.getExpiryDate().compareTo(Instant.now()) < 0) {
            // Remove expired token from database
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException("Refresh token has expired");
        }

        return refreshToken;
    }

    // 🔄 Revoke Refresh Token
    public void revokeRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        refreshTokenRepository.delete(refreshToken);
    }

}