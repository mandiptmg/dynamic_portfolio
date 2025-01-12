package Backend.service.Hero;

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
import Backend.model.Hero.Hero;
import Backend.repository.Hero.HeroRepository;

@Service
public class HeroService {

    private static final String HERO_CATEGORY = "hero";

    @Autowired
    private FileUploadProperties fileUploadProperties;

    @Autowired
    private HeroRepository heroRepository;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${base-url}")
    private String baseUrl;

    public List<Hero> getHeroes() {
        return heroRepository.findAll();
    }

    public Hero saveOrUpdateHero(Hero hero, MultipartFile image) {
        try {
            if (hero.getId() == null) {
                return createNewHero(hero, image);
            } else {
                return updateExistingHero(hero, image);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error saving or updating Hero: " + e.getMessage(), e);
        }
    }

    private Hero createNewHero(Hero hero, MultipartFile image) throws IOException {
        String imagePath = saveImage(HERO_CATEGORY, image);
        hero.setImage(imagePath);
        return heroRepository.save(hero);
    }

    private Hero updateExistingHero(Hero hero, MultipartFile image) throws IOException {
        Hero firstHero = heroRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No heroe found in the database"));

        if (!hero.getId().equals(firstHero.getId())) {
            throw new RuntimeException("Only the first Hero can be updated");
        }

        Hero existingHero = heroRepository.findById(hero.getId())
                .orElseThrow(() -> new RuntimeException("Hero not found"));

        if (image != null && !image.isEmpty()) {
            deleteImage(HERO_CATEGORY, existingHero.getImage());
            String imagePath = saveImage(HERO_CATEGORY, image);
            existingHero.setImage(imagePath);
        }

        existingHero.setName(hero.getName());
        existingHero.setPosition(hero.getPosition());
        existingHero.setDescription(hero.getDescription());

        return heroRepository.save(existingHero);
    }

    private String saveImage(String category, MultipartFile image) throws IOException {
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

    private void deleteImage(String category, String imagePath) {
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
