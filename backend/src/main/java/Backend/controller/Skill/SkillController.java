package Backend.controller.Skill;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Backend.model.ApiResponse;
import Backend.model.Skill.Skill;
import Backend.service.Skill.SkillService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/skills")
public class SkillController {
    @Autowired
    private SkillService SkillService;

    @PostMapping("/add-skill")
    public ResponseEntity<ApiResponse<Skill>> addSkill(@Valid @RequestBody Skill Skill) {
        Skill newSkill = SkillService.creatSkill(Skill);

        if (newSkill == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Language not created", null);
        }
        return buildResponse("success", HttpStatus.CREATED, newSkill.getName() + " created successfully", newSkill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Skill>> updateSkill(@PathVariable("id") Long id,
            @Valid @RequestBody Skill Skill) {
        Optional<Skill> skillOptional = SkillService.getSkillById(id);
        String skillName = skillOptional.get().getName();
        Skill updatedSkill = SkillService.updateSkill(id, Skill);
        if (updatedSkill == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Language not updated", null);
        }
        return buildResponse("success", HttpStatus.OK, skillName + " updated successfully", updatedSkill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable("id") Long id) {
        Optional<Skill> skillOptional = SkillService.getSkillById(id);
        String skillName = skillOptional.get().getName();
        SkillService.deleteSkill(id);

        return buildResponse("success", HttpStatus.OK, skillName + "deleted successfully", null);
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
