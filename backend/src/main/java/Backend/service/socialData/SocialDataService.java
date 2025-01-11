package Backend.service.socialData;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.model.socialData.SocialData;
import Backend.repository.socialData.SocialDataRepository;

@Service
public class SocialDataService {

    @Autowired
    private SocialDataRepository socialDataRepository;

    // Get all social data
    public List<SocialData> getAllSocialData() {
        return socialDataRepository.findAll();
    }

    // Get social data by ID
    public Optional<SocialData> getSocialDataById(Long id) {
        return socialDataRepository.findById(id);
    }

    // Create new social data
    public SocialData createSocialData(SocialData socialData) {
        Optional<SocialData> existingSocialData = socialDataRepository.findByName(socialData.getName());
        if (existingSocialData.isPresent()) {
            throw new RuntimeException(socialData.getName() + " already exists");
        }

        // Creating a new SocialData
        SocialData newSocialData = new SocialData();
        newSocialData.setName(socialData.getName());
        newSocialData.setIcon(socialData.getIcon());
        newSocialData.setLink(socialData.getLink());

        return socialDataRepository.save(newSocialData);
    }

    // Update existing social data
    public SocialData updateSocialData(Long id, SocialData socialDataDetails) {
        return socialDataRepository.findById(id).map(existingSocialData -> {
            existingSocialData.setName(socialDataDetails.getName());
            existingSocialData.setIcon(socialDataDetails.getIcon());
            existingSocialData.setLink(socialDataDetails.getLink());
            return socialDataRepository.save(existingSocialData);
        }).orElseThrow(() -> new RuntimeException("Social Data not found"));
    }

    // Delete social data by ID
    public void deleteSocialData(Long id) {
        socialDataRepository.deleteById(id);
    }
}
