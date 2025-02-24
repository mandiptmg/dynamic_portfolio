package Backend.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import Backend.model.SiteSettings;
import Backend.repository.SiteSettingsRepository;
import Backend.service.Image.ImageService;

@Service
public class SiteSettingsService {

    private static final String LOGO_CATEGORY = "logo";
    private static final String COVER_IMAGE_CATEGORY = "cover";

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    @Autowired
    private ImageService imageService;

    public SiteSettings getSiteSettings() {
        return siteSettingsRepository.findById(1L).orElse(null);
    }

    public SiteSettings saveOrUpdateSiteSettings(SiteSettings siteSettings, MultipartFile logo, MultipartFile darkLogo,
            MultipartFile favicon,
            MultipartFile aboutCover,
            MultipartFile portfolioCover, MultipartFile contactCover) throws IOException {
        SiteSettings existingSettings = siteSettingsRepository.findById(1L).orElse(new SiteSettings());

        if (logo != null && !logo.isEmpty()) {
            imageService.deleteImage(LOGO_CATEGORY, existingSettings.getLogo());
            String logoPath = imageService.saveImage(LOGO_CATEGORY, logo);
            existingSettings.setLogo(logoPath);
        }

        if (darkLogo != null && !darkLogo.isEmpty()) {
            imageService.deleteImage(LOGO_CATEGORY, existingSettings.getDarkLogo());
            String darkLogoPath = imageService.saveImage(LOGO_CATEGORY, darkLogo);
            existingSettings.setDarkLogo(darkLogoPath);
        }

        if (favicon != null && !favicon.isEmpty()) {
            imageService.deleteImage(LOGO_CATEGORY, existingSettings.getFavicon());
            String faviconPath = imageService.saveImage(LOGO_CATEGORY, favicon);
            existingSettings.setFavicon(faviconPath);
        }

        if (aboutCover != null && !aboutCover.isEmpty()) {
            imageService.deleteImage(COVER_IMAGE_CATEGORY, existingSettings.getAboutCover());
            String aboutCoverPath = imageService.saveImage(COVER_IMAGE_CATEGORY, aboutCover);
            existingSettings.setAboutCover(aboutCoverPath);
        }

        if (portfolioCover != null && !portfolioCover.isEmpty()) {
            imageService.deleteImage(COVER_IMAGE_CATEGORY, existingSettings.getPortfolioCover());
            String portfolioCoverPath = imageService.saveImage(COVER_IMAGE_CATEGORY, portfolioCover);
            existingSettings.setPortfolioCover(portfolioCoverPath);
        }

        if (contactCover != null && !contactCover.isEmpty()) {
            imageService.deleteImage(COVER_IMAGE_CATEGORY, existingSettings.getContactCover());
            String contactCoverPath = imageService.saveImage(COVER_IMAGE_CATEGORY, contactCover);
            existingSettings.setContactCover(contactCoverPath);
        }

        existingSettings.setFooter(siteSettings.getFooter());
        return siteSettingsRepository.save(existingSettings);

    }

}
