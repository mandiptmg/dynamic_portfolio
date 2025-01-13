package Backend.service.About;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.dto.AboutDTO;
import Backend.model.about.About;
import Backend.repository.About.AboutRepository;
import Backend.repository.Skill.SkillRepository;
import Backend.service.Image.ImageService;

@Service
public class AboutService {

    private static final String ABOUT_CATEGORY = "about";
    private static final String RESUME_CATEGORY = "resume";

    @Autowired
    private AboutRepository aboutRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private SkillRepository skillRepository;

    public About getAbout() {
        return aboutRepository.findById(1L).orElse(null);
    }

    public About saveOrUpdateAbout(AboutDTO aboutDTO) throws IOException {
        About existingAbout = aboutRepository.findById(1L).orElse(new About());
        // Update existingAbout with DTO values
        existingAbout.setTitle(aboutDTO.getTitle());
        existingAbout.setDescription(aboutDTO.getDescription());
        existingAbout.setSubSkillTitle(aboutDTO.getSubSkillTitle());
        existingAbout.setProjectInquiry(aboutDTO.getProjectInquiry());
        existingAbout.setInquiryDescription(aboutDTO.getInquiryDescription());

        // Handle resume upload
        if (aboutDTO.getResume() != null && !aboutDTO.getResume().isEmpty()) {
            imageService.deleteImage(RESUME_CATEGORY, existingAbout.getResumePath());
            String resumePath = imageService.saveImage(RESUME_CATEGORY, aboutDTO.getResume());
            existingAbout.setResumePath(resumePath);
        }

        // Handle image uploads
        if (aboutDTO.getFirstImage() != null && !aboutDTO.getResume().isEmpty()) {
            imageService.deleteImage(ABOUT_CATEGORY, existingAbout.getFirstImagePath());
            String firstImagePath = imageService.saveImage(ABOUT_CATEGORY, aboutDTO.getFirstImage());
            existingAbout.setFirstImagePath(firstImagePath);
        }

        if (aboutDTO.getSecondImage() != null && !aboutDTO.getResume().isEmpty()) {
            imageService.deleteImage(ABOUT_CATEGORY, existingAbout.getSecondImagePath());
            String secondImagePath = imageService.saveImage(ABOUT_CATEGORY, aboutDTO.getSecondImage());
            existingAbout.setSecondImagePath(secondImagePath);
        }

        // Set skills
        if (aboutDTO.getSkillIds() != null && !aboutDTO.getResume().isEmpty()) {
            existingAbout.setSkills(skillRepository.findAllById(aboutDTO.getSkillIds()));
        }

        return aboutRepository.save(existingAbout);
    }

}