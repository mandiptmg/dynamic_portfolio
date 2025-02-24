package Backend.controller.SocialData;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Backend.model.ApiResponse;
import Backend.model.socialData.SocialData;
import Backend.service.socialData.SocialDataService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/social-data")
public class SocialDataController {

    @Autowired
    private SocialDataService socialDataService;

    // Add new social data
    @PostMapping("/add-data")
    public ResponseEntity<ApiResponse<SocialData>> addSocialData(@Valid @RequestBody SocialData socialData) {
        SocialData newSocialData = socialDataService.createSocialData(socialData);
        return buildResponse("success", HttpStatus.CREATED, newSocialData.getName() + " created successfully",
                newSocialData);
    }

    // Update social data by ID
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SocialData>> updateSocialData(@PathVariable("id") Long id,
            @Valid @RequestBody SocialData socialData) {
        Optional<SocialData> social = socialDataService.getSocialDataById(id);
        String socialName = social.get().getName();
        SocialData updatedSocialData = socialDataService.updateSocialData(id, socialData);
        return buildResponse("success", HttpStatus.OK, socialName + " updated successfully", updatedSocialData);
    }

    // Delete social data by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSocialData(@PathVariable("id") Long id) {
        Optional<SocialData> social = socialDataService.getSocialDataById(id);
        String socialName = social.get().getName();
        socialDataService.deleteSocialData(id);
        return buildResponse("success", HttpStatus.OK, socialName + " deleted successfully", null);
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }
}
