package Backend.dto;

import org.springframework.web.multipart.MultipartFile;

import Backend.validation.ConditionalNotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectRequestDTO {

    @NotBlank(message = "Project name is required.")
    private String name;

    @NotBlank(message = "Project link is required.")
    private String link;

    @ConditionalNotNull(message = "Image file is required.", conditionField = "id")
    private MultipartFile image;


}
