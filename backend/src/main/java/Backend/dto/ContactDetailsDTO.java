package Backend.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import Backend.validation.ConditionalNotNull;
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

    @NotNull(message = "socials  are required")
    private List<Long> socials;

    @ConditionalNotNull(message = "Contact Image file is required.", conditionField = "id")
    private MultipartFile contactImage;

}