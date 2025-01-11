package Backend.repository.socialData;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.model.socialData.SocialData;

public interface SocialDataRepository extends JpaRepository<SocialData, Long> {
    Optional<SocialData> findByName(String name);

}
