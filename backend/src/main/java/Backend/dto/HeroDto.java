package Backend.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Image file is required.")
    private MultipartFile image;

    public boolean isImageValid() {
        return image != null && !image.isEmpty();
    }
}
