package Backend.repository.About;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.model.about.About;

@Repository
public interface AboutRepository extends JpaRepository<About, Long> {

}
