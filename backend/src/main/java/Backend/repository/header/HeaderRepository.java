package Backend.repository.header;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.model.Header.Header;

@Repository
public interface HeaderRepository extends JpaRepository<Header, Long> {
    Optional<Header> findByName(String name);
}
