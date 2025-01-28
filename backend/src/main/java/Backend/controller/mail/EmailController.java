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

    @PostMapping("/public/send-email")
    public ResponseEntity<ApiResponse<?>> sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String personalizedMessage,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam(required = false) MultipartFile[] attachments) {
        try {
            emailService.sendEmail(to, subject, personalizedMessage, fullName, email, attachments);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            "Success",
                            HttpStatus.OK.value(),
                            "Email sent successfully",
                            null,
                            java.time.LocalDateTime.now().toString()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(
                            "Failure",
                            HttpStatus.BAD_REQUEST.value(),
                            "Failed to send email: " + e.getMessage(),
                            null,
                            java.time.LocalDateTime.now().toString()));
        }
    }

}
