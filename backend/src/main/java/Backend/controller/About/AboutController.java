package Backend.controller.About;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.dto.AboutDTO;
import Backend.model.ApiResponse;
import Backend.model.about.About;
import Backend.service.About.AboutService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/about")
public class AboutController {

    @Autowired
    private AboutService aboutService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<About>>> getAbout() {
        About about = aboutService.getAbout();
        if (about == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No about found", null);
        }
        return buildResponse("success", HttpStatus.OK, "About retrieved successfully", List.of(about));
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse<About>> createAbout(@ModelAttribute @Valid AboutDTO aboutDTO) {
        try {
            About about = aboutService.saveOrUpdateAbout(aboutDTO);
            return buildResponse("success", HttpStatus.CREATED,
                    "About" + about.getId() != null ? "update" : "save" + "successfully", about);
        } catch (Exception e) {
            return buildResponse("error", HttpStatus.INTERNAL_SERVER_ERROR, "Error creating about", null);
        }
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
