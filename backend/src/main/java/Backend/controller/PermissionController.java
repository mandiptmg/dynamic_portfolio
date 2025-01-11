package Backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Backend.model.ApiResponse;
import Backend.model.Permission;
import Backend.service.PermissionService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/permissions")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Permission>>> getPermissions() {
        List<Permission> permissions = permissionService.getAllPermissions();
        if (permissions.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No permissions found", permissions);
        }
        return buildResponse("success", HttpStatus.OK, "Permissions retrieved successfully", permissions);

    }

    @PostMapping("/add-permission")
    public ResponseEntity<ApiResponse<Permission>> addPermission(@Valid @RequestBody Permission permission) {
        Permission newPermission = permissionService.createPermission(permission);
        if (newPermission == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Permission not created", null);
        }
        return buildResponse("success", HttpStatus.CREATED, newPermission.getName() + " created successfully",
                newPermission);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Permission>> getPermissionById(@PathVariable Long id) {
        Permission permission = permissionService.getPermissionById(id).orElse(null);
        if (permission == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Permission not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Permission retrieved successfully", permission);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Permission>> updatePermission(@PathVariable Long id,
            @Valid @RequestBody Permission permissionDetail) {

        Optional<Permission> permission = permissionService.getPermissionById(id);
        String permissionName = permission.isPresent() ? permission.get().getName() : "";
        Permission updatedPermission = permissionService.updatePermission(id, permissionDetail);
        if (updatedPermission == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, permissionName + " not updated", null);
        }
        return buildResponse("success", HttpStatus.OK, permissionName + " updated successfully", updatedPermission);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePermission(@PathVariable Long id) {
        Optional<Permission> permission = permissionService.getPermissionById(id);
        String permissionName = permission.isPresent() ? permission.get().getName() : "";
        permissionService.deletePermission(id);
        return buildResponse("success", HttpStatus.OK, permissionName + " deleted successfully", null);
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }
}
