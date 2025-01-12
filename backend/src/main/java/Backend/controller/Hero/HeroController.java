package Backend.controller.Hero;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Backend.dto.HeroDto;
import Backend.model.ApiResponse;
import Backend.model.Hero.Hero;
import Backend.service.Hero.HeroService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/hero")
public class HeroController {
    @Autowired
    private HeroService heroService;

    // Get all heroes
    @GetMapping
    public ResponseEntity<ApiResponse<List<Hero>>> getAllHeroes() {
        List<Hero> heroes = heroService.getHeroes();
        if (heroes.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No heroes found", heroes);
        }
        return buildResponse("success", HttpStatus.OK, "Heroes retrieved successfully", heroes);
    }

    // Save or update hero
    @PostMapping("/save")
    public ResponseEntity<ApiResponse<Hero>> saveOrUpdateHero(@ModelAttribute @Valid HeroDto heroDto) {
        if (!heroDto.isImageValid()) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Image is required and cannot be empty", null);
        }

        Hero hero = new Hero();
        hero.setId(heroDto.getId());
        hero.setName(heroDto.getName());
        hero.setPosition(heroDto.getPosition());
        hero.setDescription(heroDto.getDescription());

        return buildResponse("success", HttpStatus.OK,
                "Hero" + (hero.getId() != null ? " update " : " save ") + "successfully",
                heroService.saveOrUpdateHero(hero, heroDto.getImage()));
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
