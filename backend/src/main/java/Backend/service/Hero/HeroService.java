package Backend.service.Hero;

import java.io.IOException;
import java.util.List;

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
        String imagePath = imageService.saveImage(HERO_CATEGORY, image);
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
            imageService.deleteImage(HERO_CATEGORY, existingHero.getImage());
            String imagePath = imageService.saveImage(HERO_CATEGORY, image);
            existingHero.setImage(imagePath);
        }

        existingHero.setName(hero.getName());
        existingHero.setPosition(hero.getPosition());
        existingHero.setDescription(hero.getDescription());

        return heroRepository.save(existingHero);
    }

}
