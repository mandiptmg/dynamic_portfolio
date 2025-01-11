package Backend.service.Skill;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.model.Skill.Skill;
import Backend.repository.Skill.SkillRepository;

@Service
public class SkillService {
    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    public Skill creatSkill(Skill Skill) {
        Optional<Skill> existingSkill = skillRepository.findByName(Skill.getName());
        if (existingSkill.isPresent()) {
            throw new RuntimeException(Skill.getName() + " already exists");
        }

        Skill newSkill = new Skill();
        newSkill.setName(Skill.getName());
        newSkill.setIcon(Skill.getIcon());
        newSkill.setDescription(Skill.getDescription());
        return skillRepository.save(newSkill);
    }

    public Skill updateSkill(Long id, Skill SkillDetails) {
        return skillRepository.findById(id).map(Skill -> {
            Skill.setName(SkillDetails.getName());
            Skill.setIcon(SkillDetails.getIcon());
            Skill.setDescription(SkillDetails.getDescription());

            return skillRepository.save(Skill);
        }).orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

}
