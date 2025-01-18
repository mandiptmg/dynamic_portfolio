package Backend.service.Project;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import Backend.dto.ProjectRequestDTO;
import Backend.model.Project.Project;
import Backend.repository.Project.ProjectRepository;
import Backend.service.Image.ImageService;

@Service
public class ProjectService {

    private static final String PROJECT_CATEGORY = "project";

    @Autowired
    private ImageService imageService;

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

        String imagePath = imageService.saveImage(PROJECT_CATEGORY, image);
        projectDetails.setImage(imagePath);
        return projectRepository.save(projectDetails);
    }

    public Project updateProject(Long id, ProjectRequestDTO projectRequest) throws IOException {
        return projectRepository.findById(id).map(existingProject -> {
            try {

                // // Handle image update if a new image is provided
                if (projectRequest.getImage() != null &&
                        !projectRequest.getImage().isEmpty()) {
                    imageService.deleteImage(PROJECT_CATEGORY, existingProject.getImage());
                    String imagePath = imageService.saveImage(PROJECT_CATEGORY,
                            projectRequest.getImage());
                    existingProject.setImage(imagePath);
                }

                existingProject.setName(projectRequest.getName());
                existingProject.setLink(projectRequest.getLink());
                return projectRepository.save(existingProject);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update project image", e);
            }
        }).orElseThrow(() -> new RuntimeException("Project not found with ID: " + id));

    }

    public void deleteProject(Long id) {
        projectRepository.findById(id).ifPresent(project -> {
            // Delete associated image file
            imageService.deleteImage(PROJECT_CATEGORY, project.getImage());
            projectRepository.deleteById(id);
        });
    }

}
