package Backend.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ContactDetailsDTO {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "position is required")
    private String position;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Sub Title is required")
    private String subTitle;

    @NotNull(message = "social Ids are required")
    private List<Long> socialIds;

    @NotNull(message = "Contact Image is required")
    private MultipartFile contactImage;

}