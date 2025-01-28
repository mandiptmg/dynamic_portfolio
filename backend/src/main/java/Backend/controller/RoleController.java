package Backend.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.model.ApiResponse;
import Backend.model.Role;
import Backend.service.RoleService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;

 

    @PostMapping("/add-role")
    public ResponseEntity<ApiResponse<Role>> createRole(@Valid @RequestBody Role role) {
        Role newRole = roleService.createRole(role);
        if (newRole == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Role not created", null);
        }
        return buildResponse("success", HttpStatus.CREATED, newRole.getName() + " created successfully", newRole);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Role>> getRoleById(@PathVariable Long id) {
        Role role = roleService.getRoleById(id).orElse(null);
        if (role == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Role not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Role retrieved successfully", role);

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Role>> updateRole(@PathVariable Long id, @Valid @RequestBody Role roleDetail) {
        Optional<Role> role = roleService.getRoleById(id);
        String roleName = role.isPresent() ? role.get().getName() : "";
        Role updatedRole = roleService.updateRole(id, roleDetail);
        if (updatedRole == null) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, roleDetail + "not updated", null);
        } else {
            return buildResponse("success", HttpStatus.OK, roleName + " updated successfully", updatedRole);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable Long id) {
        Optional<Role> role = roleService.getRoleById(id);
        String roleName = role.isPresent() ? role.get().getName() : "";
        roleService.deleteRole(id);
        return buildResponse("success", HttpStatus.OK, roleName + "deleted successfully", null);

    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
