package Backend.service.Project;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import Backend.model.Project.Project;
import Backend.repository.Project.ProjectRepository;

@Service
public class ProjectService {

    @Value("${file-upload.path}")
    private String uploadPath;

    @Value("${server.servlet.context-path}")
    private String contextPath; // Add this to capture the context path for static files

    @Value("${base-url}")
    private String baseUrl;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project creatProject(Project projectDetails, MultipartFile image) throws IOException {

        Optional<Project> existingProject = projectRepository.findByName(projectDetails.getName());
        if (existingProject.isPresent()) {
            throw new RuntimeException(projectDetails.getName() + " already exists");
        }

        // Handle image upload
        String imagePath = saveImage(image);

        Project newProject = new Project();
        newProject.setName(projectDetails.getName());
        newProject.setImage(imagePath);
        newProject.setLink(projectDetails.getLink());
        return projectRepository.save(newProject);
    }

    public Project updateProject(Long id, Project projectDetails, MultipartFile image) throws IOException {
        return projectRepository.findById(id).map(existingProject -> {
            try {
                // Handle image update if a new image is provided
                if (image != null && !image.isEmpty()) {
                    deleteImage(existingProject.getImage());
                    String imagePath = saveImage(image);
                    existingProject.setImage(imagePath);
                }
                // Update project details
                existingProject.setName(projectDetails.getName());
                existingProject.setLink(projectDetails.getLink());
                return projectRepository.save(existingProject);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update project image", e);
            }
        }).orElseThrow(() -> new RuntimeException("Project not found with ID: " + id));

    }

    public void deleteProject(Long id) {
        projectRepository.findById(id).ifPresent(project -> {
            // Delete associated image file
            deleteImage(project.getImage());
            projectRepository.deleteById(id);
        });
    }

    // Help method to save an image
    private String saveImage(MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            throw new RuntimeException("Invalid image file");
        }

        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadPath + fileName);

        if (!Files.exists(filePath.getParent())) {
            Files.createDirectories(filePath.getParent());
        }
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return baseUrl + contextPath + "/uploads/projects/" + fileName;

    }

    // Helop method to delete an image
    private void deleteImage(String imagePath) {
        if (imagePath != null && !imagePath.isEmpty()) {
            String fileName = imagePath.replace(baseUrl + contextPath + "/uploads/projects/", "");
            Path filePath = Paths.get(uploadPath + fileName);

            try {
                Files.deleteIfExists(filePath);

            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image file:" + fileName, e);
            }
        }
    }
}
