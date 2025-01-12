package Backend.repository.Hero;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.model.Hero.Hero;

@Repository
public interface HeroRepository extends JpaRepository<Hero, Long> {
    Optional<Hero> findByName(String name);
}
