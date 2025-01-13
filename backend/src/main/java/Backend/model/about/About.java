package Backend.model.about;

import java.util.List;

import Backend.model.Skill.Skill;
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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    private String resumePath;

    private String subSkillTitle;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Skill> skills;

    private String firstImagePath;

    private String secondImagePath;

    private String projectInquiry;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String inquiryDescription;
}