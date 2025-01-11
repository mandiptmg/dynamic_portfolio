package Backend.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProjectRequestDTO {

    @NotBlank(message = "Project name is required.")
    private String name;

    @NotBlank(message = "Project link is required.")
    private String link;

    @NotNull(message = "Image file is required.")
    private MultipartFile image;

}
