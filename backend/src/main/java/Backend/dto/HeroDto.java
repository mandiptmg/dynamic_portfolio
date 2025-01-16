package Backend.dto;

import org.springframework.web.multipart.MultipartFile;

import Backend.validation.ConditionalNotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class HeroDto {
    private Long id; // Optional for updates

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Position is required")
    private String position;

    @NotBlank(message = "Description is required")
    private String description;

     @ConditionalNotNull(
        message = "Image file is required.",
        conditionField = "id"
    )
    private MultipartFile image;

    @ConditionalNotNull(
        message = "Background image file is required.",
        conditionField = "id"
    )
    private MultipartFile bgImage;

}
