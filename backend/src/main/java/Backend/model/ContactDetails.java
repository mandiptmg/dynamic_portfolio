package Backend.model;

import java.util.List;

import Backend.model.socialData.SocialData;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contactImage;
    private String name;
    private String position;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    private String subTitle;

    @OneToMany(fetch = FetchType.LAZY)
    private List<SocialData> socialData;


}
