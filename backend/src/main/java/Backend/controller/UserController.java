package Backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.dto.UserApiDTO;
import Backend.dto.UserDTO;
import Backend.model.ApiResponse;
import Backend.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add-user")
    public ResponseEntity<ApiResponse<UserDTO>> CreateUser(@Valid @RequestBody UserDTO userDTO) {
        UserDTO createUser = userService.createUser(userDTO);
        if (createUser != null) {
            return buildResponse("success", HttpStatus.CREATED, createUser.getName() + " Created successfully",
                    createUser);
        } else {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "User failed to create", null);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(@PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO) {
        UserApiDTO user = userService.getUserById(id);
        String userName = user != null ? user.getName() : "";
        UserDTO updateUser = userService.updateUser(id, userDTO);
        if (updateUser != null) {
            return buildResponse("success", HttpStatus.OK, userName + " Updated successfully", updateUser);
        } else {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "update failed to  user", null);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        UserApiDTO userApiDTO = userService.getUserById(id);
        String userName = userApiDTO != null ? userApiDTO.getName() : "";
        userService.deleteUser(id);
        return buildResponse("success", HttpStatus.OK, userName + " deleted successfully", null);

    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
