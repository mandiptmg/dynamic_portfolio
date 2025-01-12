package Backend.service.Image;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import Backend.config.FileUploadProperties;

@Service
public class ImageService {

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${base-url}")
    private String baseUrl;

    @Autowired
    private FileUploadProperties fileUploadProperties;

    public String saveImage(String category, MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            throw new RuntimeException("Invalid image file");
        }

        String uploadDir = Optional.ofNullable(fileUploadProperties.getPaths().get(category))
                .orElseThrow(() -> new RuntimeException("Invalid upload category: " + category));

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.createDirectories(filePath.getParent());
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return baseUrl + contextPath + "/uploads/" + category + "/" + fileName;
    }

    public void deleteImage(String category, String imagePath) {
        if (imagePath != null && !imagePath.isEmpty()) {
            String relativePath = imagePath.replace(baseUrl + contextPath + "/uploads/" + category + "/", "");
            String uploadDir = fileUploadProperties.getPaths().get(category);
            Path filePath = Paths.get(uploadDir, relativePath);

            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image file: " + relativePath, e);
            }
        }
    }

}
