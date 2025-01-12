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

import Backend.config.FileUploadProperties;
import Backend.model.Project.Project;
import Backend.repository.Project.ProjectRepository;

@Service
public class ProjectService {

    private static final String PROJECT_CATEGORY = "project";

    @Autowired
    private FileUploadProperties fileUploadProperties;

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

        String imagePath = saveImage(PROJECT_CATEGORY, image);
        projectDetails.setImage(imagePath);
        return projectRepository.save(projectDetails);
    }

    public Project updateProject(Long id, Project projectDetails, MultipartFile image) throws IOException {
        return projectRepository.findById(id).map(existingProject -> {
            try {
                // Handle image update if a new image is provided
                if (image != null && !image.isEmpty()) {
                    deleteImage(PROJECT_CATEGORY, existingProject.getImage());
                    String imagePath = saveImage(PROJECT_CATEGORY, image);
                    existingProject.setImage(imagePath);
                }

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
            deleteImage(PROJECT_CATEGORY, project.getImage());
            projectRepository.deleteById(id);
        });
    }

    // Help method to save an image
    public String saveImage(String category, MultipartFile image) throws IOException {

        if (image == null || image.isEmpty()) {
            throw new RuntimeException("Invalid image file");
        }

        String uploadDir = Optional.ofNullable(fileUploadProperties.getPaths().get(category))
                .orElseThrow(() -> new RuntimeException("Invalid upload category: " + category));

        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.createDirectories(filePath.getParent());
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return baseUrl + contextPath + "/uploads/" + category + "/" + fileName;
    }

    // Help method to delete an image
    private void deleteImage(String category, String imagePath) {
        if (imagePath != null && !imagePath.isEmpty()) {
            String relativePath = imagePath.replace(baseUrl + contextPath + "/uploads/" + category + "/", "");

            String uploadDir = fileUploadProperties.getPaths().get(category);
            Path filePath = Paths.get(uploadDir + relativePath);

            try {
                Files.deleteIfExists(filePath);

            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image file:" + relativePath, e);
            }
        }
    }
}
