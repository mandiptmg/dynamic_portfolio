package Backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.dto.ContactDetailsDTO;
import Backend.model.ApiResponse;
import Backend.model.ContactDetails;
import Backend.service.ContactDetailsService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/contact-details")
public class ContactController {

    @Autowired
    private ContactDetailsService contactDetailsService;

    @GetMapping
    public ResponseEntity<ApiResponse<ContactDetails>> getContactDetails() {
        ContactDetails ContactDetails = contactDetailsService.getContactDetails();
        if (ContactDetails == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No Contact Details found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Contact Details retrieved successfully",
                ContactDetails);
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse<ContactDetails>> createContactDetails(
            @ModelAttribute @Valid ContactDetailsDTO ContactDetailsDTO) {
        try {
            ContactDetails ContactDetails = contactDetailsService.saveOrUpdatContactDetails(ContactDetailsDTO);
            return buildResponse("success", HttpStatus.CREATED,
                    "ContactDetails " + ContactDetails.getId() != null ? "update" : "save" + " successfully",
                    ContactDetails);
        } catch (Exception e) {
            return buildResponse("error", HttpStatus.INTERNAL_SERVER_ERROR, "Error creating ContactDetails", null);
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
