package Backend.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import Backend.validation.ConditionalNotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AboutDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Resume is required")
    private MultipartFile resume;

    @NotBlank(message = "Sub Skill Title is required")
    private String subSkillTitle;

    @NotNull(message = "Skill Ids are required")
    private List<Long> skillIds;

    @ConditionalNotNull(message = "First Image file is required.", conditionField = "id")
    private MultipartFile firstImage;

    @ConditionalNotNull(message = "Second Image file is required.", conditionField = "id")
    private MultipartFile secondImage;

    @NotBlank(message = "Project Inquiry is required")
    private String projectInquiry;

    @NotBlank(message = "Inquiry Description is required")
    private String inquiryDescription;
}