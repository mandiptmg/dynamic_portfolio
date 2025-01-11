package Backend.dto;

import lombok.Data;

@Data
public class JwtResponseDTO {
    private String accessToken;
    private String refreshToken;
    private String message;
}
