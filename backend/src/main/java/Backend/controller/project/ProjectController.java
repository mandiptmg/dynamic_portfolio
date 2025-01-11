package Backend.controller.project;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Backend.model.ApiResponse;
import Backend.model.Header.Header;
import Backend.service.Header.HeaderService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private HeaderService headerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Header>>> getAllHeaders() {
        List<Header> headers = headerService.getAllHeaders();
        if (headers.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No headers found", headers);
        }
        return buildResponse("success", HttpStatus.OK, "Headers retrieved successfully", headers);
    }

    @PostMapping("/add-header")
    public ResponseEntity<ApiResponse<Header>> addHeader(@Valid @RequestBody Header header) {
        Header newHeader = headerService.creatHeader(header);
        if (newHeader == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Header not created", null);
        }
        return buildResponse("success", HttpStatus.CREATED, newHeader.getName() + " created successfully", newHeader);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Header>> getHeaderById(@PathVariable("id") Long id) {
        Optional<Header> headerOptional = headerService.getHeaderById(id);
        if (!headerOptional.isPresent()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Header not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Header retrieved successfully", headerOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Header>> updateHeader(@PathVariable("id") Long id,
            @Valid @RequestBody Header header) {

        Optional<Header> headerOptional = headerService.getHeaderById(id);
        String headerName = headerOptional.isPresent() ? headerOptional.get().getName() : "";
        Header updatedHeader = headerService.updateHeader(id, header);
        if (updatedHeader == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Header not updated", null);
        }
        return buildResponse("success", HttpStatus.OK, headerName + " updated successfully", updatedHeader);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHeader(@PathVariable("id") Long id) {
        Optional<Header> headerOptional = headerService.getHeaderById(id);
        String headerName = headerOptional.isPresent() ? headerOptional.get().getName() : "";
        headerService.deleteHeader(id);
        return buildResponse("success", HttpStatus.OK, headerName + " deleted successfully", null);
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
