package Backend.controller.project;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import Backend.dto.ProjectRequestDTO;
import Backend.model.ApiResponse;
import Backend.model.Project.Project;
import Backend.service.Project.ProjectService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Project>>> getAllProjects() {
        List<Project> Projects = projectService.getAllProjects();
        if (Projects.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No Projects found", Projects);
        }
        return buildResponse("success", HttpStatus.OK, "Projects retrieved successfully", Projects);
    }

    @PostMapping("/add-project")
    public ResponseEntity<ApiResponse<Project>> addProject(@ModelAttribute @Valid ProjectRequestDTO projectRequest) {
        // if (bindingResult.hasErrors()) {
        // // Return validation errors
        // return new ResponseEntity<>(bindingResult.getAllErrors(),
        // HttpStatus.BAD_REQUEST);
        // }
        try {
            // Map DTO to Project entity
            Project projectDetails = new Project();
            projectDetails.setName(projectRequest.getName());
            projectDetails.setLink(projectRequest.getLink());

            Project newProject = projectService.creatProject(projectDetails, projectRequest.getImage());
            if (newProject == null) {
                return buildResponse("error", HttpStatus.BAD_REQUEST, "Project not created", null);
            }
            return buildResponse("success", HttpStatus.CREATED, newProject.getName() + " created successfully",
                    newProject);
        } catch (IOException e) {
            return buildResponse("error", HttpStatus.INTERNAL_SERVER_ERROR, "Error creating project: " + e.getMessage(),
                    null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> getProjectById(@PathVariable("id") Long id) {
        Optional<Project> ProjectOptional = projectService.getProjectById(id);
        if (!ProjectOptional.isPresent()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Project not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Project retrieved successfully", ProjectOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> updateProject(
            @PathVariable("id") Long id, @Valid ProjectRequestDTO projectRequest, MultipartFile image) {

        Optional<Project> projectOptional = projectService.getProjectById(id);
        String projectName = projectOptional.isPresent() ? projectOptional.get().getName() : "";

        try {
          
            Project updatedProject = projectService.updateProject(id, projectRequest);
            if (updatedProject == null) {
                return buildResponse("error", HttpStatus.BAD_REQUEST, "Project not updated", null);
            }
            return buildResponse("success", HttpStatus.OK, projectName + " updated successfully", updatedProject);
        } catch (IOException e) {
            return buildResponse("error", HttpStatus.INTERNAL_SERVER_ERROR, "Error updating project: " + e.getMessage(),
                    null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable("id") Long id) {
        Optional<Project> ProjectOptional = projectService.getProjectById(id);
        String ProjectName = ProjectOptional.isPresent() ? ProjectOptional.get().getName() : "";
        projectService.deleteProject(id);
        return buildResponse("success", HttpStatus.OK, ProjectName + " deleted successfully", null);
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
