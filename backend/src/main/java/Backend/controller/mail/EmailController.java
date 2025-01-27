package Backend.controller.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import Backend.model.ApiResponse;
import Backend.service.Mail.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<ApiResponse<?>> sendEmail(
            @RequestParam String to,
            @RequestParam String subject, // Default value for subject
            @RequestParam String personalizedMessage,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam(required = false) MultipartFile[] attachments) {
        try {
            emailService.sendEmail(to, subject, personalizedMessage, fullName, email, attachments);
            ApiResponse<?> response = new ApiResponse<>(
                    "Success",
                    HttpStatus.OK.value(),
                    "Email sent successfully",
                    null,
                    java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            ApiResponse<?> response = new ApiResponse<>(
                    "fail",
                    HttpStatus.BAD_REQUEST.value(),
                    "failed to send email",
                    null,
                    java.time.LocalDateTime.now().toString());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
