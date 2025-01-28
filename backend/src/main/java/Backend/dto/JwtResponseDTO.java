package Backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponseDTO {
    private String accessToken;
    private String refreshToken;
    private String message;
}
