package Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.model.SiteSettings;

@Repository
public interface SiteSettingsRepository extends JpaRepository<SiteSettings, Long> {

}
