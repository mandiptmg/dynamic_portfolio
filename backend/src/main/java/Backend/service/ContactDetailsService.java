package Backend.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.dto.ContactDetailsDTO;
import Backend.model.ContactDetails;
import Backend.repository.ContactDetailsRepository;
import Backend.repository.socialData.SocialDataRepository;
import Backend.service.Image.ImageService;

@Service
public class ContactDetailsService {

    @Autowired
    private ContactDetailsRepository contactRepository;

    @Autowired
    private SocialDataRepository socialDataRepository;

    @Autowired
    ImageService imageService;

    private static final String CONTACT_DETAILS_CATEGORY = "contact";

    public ContactDetails getContactDetails() {
        return contactRepository.findById(1L).orElse(null);
    }

    public ContactDetails saveOrUpdatContactDetails(ContactDetailsDTO contactDetailsDTO) throws IOException {
        ContactDetails existingDetails = contactRepository.findById(1L).orElse(new ContactDetails());
        existingDetails.setName(contactDetailsDTO.getName());
        existingDetails.setPosition(contactDetailsDTO.getPosition());
        existingDetails.setDescription(contactDetailsDTO.getDescription());
        existingDetails.setSubTitle(contactDetailsDTO.getSubTitle());

        // handle Image uploads
        if (contactDetailsDTO.getContactImage() != null && !contactDetailsDTO.getContactImage().isEmpty()) {
            imageService.deleteImage(CONTACT_DETAILS_CATEGORY, existingDetails.getContactImage());
            String imagePath = imageService.saveImage(CONTACT_DETAILS_CATEGORY, contactDetailsDTO.getContactImage());
            existingDetails.setContactImage(imagePath);

        }

        // set social data
        if (contactDetailsDTO.getSocials() != null && !contactDetailsDTO.getSocials().isEmpty()) {
            existingDetails.setSocialData(socialDataRepository.findAllById(contactDetailsDTO.getSocials()));
        }

        return contactRepository.save(existingDetails);

    }

}
