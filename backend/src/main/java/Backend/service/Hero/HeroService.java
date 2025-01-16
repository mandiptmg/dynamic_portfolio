package Backend.service.Hero;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import Backend.model.Hero.Hero;
import Backend.repository.Hero.HeroRepository;
import Backend.service.Image.ImageService;

@Service
public class HeroService {

    private static final String HERO_CATEGORY = "hero";

    @Autowired
    private HeroRepository heroRepository;

    @Autowired
    private ImageService imageService;

    public Hero getHero() {
        return heroRepository.findById(1L).orElse(null);
    }

    public Hero saveOrUpdateHero(Hero hero, MultipartFile image, MultipartFile bgImage) {
        try {
            if (hero.getId() == null) {
                return createNewHero(hero, image, bgImage);
            }
            return updateExistingHero(hero, image, bgImage);
        } catch (IOException e) {
            throw new RuntimeException("Error saving or updating Hero", e);
        }
    }

    private Hero createNewHero(Hero hero, MultipartFile image, MultipartFile bgImage) throws IOException {
        hero.setImage(processImage(image));
        hero.setBgImage(processImage(bgImage));
        return heroRepository.save(hero);
    }

    private Hero updateExistingHero(Hero hero, MultipartFile image, MultipartFile bgImage) throws IOException {
        Hero existingHero = heroRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No hero found in the database"));

        if (!hero.getId().equals(existingHero.getId())) {
            throw new RuntimeException("Only the first Hero can be updated");
        }

        // Update images if provided
        updateImage(existingHero, image, true);
        updateImage(existingHero, bgImage, false);

        // Update other properties
        existingHero.setName(hero.getName());
        existingHero.setPosition(hero.getPosition());
        existingHero.setDescription(hero.getDescription());

        return heroRepository.save(existingHero);
    }

    private String processImage(MultipartFile image) throws IOException {
        return (image != null && !image.isEmpty()) ? imageService.saveImage(HERO_CATEGORY, image) : null;
    }

    private void updateImage(Hero hero, MultipartFile image, boolean isPrimary) throws IOException {
        if (image != null && !image.isEmpty()) {
            String oldImagePath = isPrimary ? hero.getImage() : hero.getBgImage();
            if (oldImagePath != null) {
                imageService.deleteImage(HERO_CATEGORY, oldImagePath);
            }
            String newImagePath = imageService.saveImage(HERO_CATEGORY, image);
            if (isPrimary) {
                hero.setImage(newImagePath);
            } else {
                hero.setBgImage(newImagePath);
            }
        }
    }
}
