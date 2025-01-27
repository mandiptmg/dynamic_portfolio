package Backend.dto;

import org.springframework.web.multipart.MultipartFile;

import Backend.validation.ConditionalNotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SiteSettingsDto {
    private Long id; // Optional for updates

    @NotBlank(message = "Footer is required")
    private String footer;

    @ConditionalNotNull(message = "Logo file is required.", conditionField = "id")
    private MultipartFile logo;

    @ConditionalNotNull(message = "Dark Logo file is required.", conditionField = "id")
    private MultipartFile darkLogo;

    @ConditionalNotNull(message = "Favicon file is required.", conditionField = "id")
    private MultipartFile favicon;

    @ConditionalNotNull(message = "About cover image file is required.", conditionField = "id")
    private MultipartFile aboutCover;

    @ConditionalNotNull(message = "Portfolio cover image file is required.", conditionField = "id")
    private MultipartFile portfolioCover;

    @ConditionalNotNull(message = "Contact cover image file is required.", conditionField = "id")
    private MultipartFile contactCover;


}
