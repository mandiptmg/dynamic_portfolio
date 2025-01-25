package Backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "site_settings")
@Entity
public class SiteSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String logo;

    @Column(nullable = true)
    private String favicon;

    @Column(nullable = true)
    private String footer;

    @Lob // Large Object
    @Column(nullable = true)
    private String aboutCover;

    @Column(nullable = true)
    private String portfolioCover;

    @Column(nullable = true)
    private String contactCover;

}
