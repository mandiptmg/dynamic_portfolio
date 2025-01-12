package Backend.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Backend.dto.SiteSettingsDto;
import Backend.model.ApiResponse;
import Backend.model.SiteSettings;
import Backend.service.SiteSettingsService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("site-settings")
public class SiteSettingsController {
    @Autowired
    private SiteSettingsService siteSettingsService;

    // Get all heroes
    @GetMapping
    public ResponseEntity<ApiResponse<List<SiteSettings>>> getSiteSettings() {
        SiteSettings siteSettings = siteSettingsService.getSiteSettings();
        if (siteSettings == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No site settings found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Site settings retrieved successfully", List.of(siteSettings));
    }

    // Save or update SiteSettings
    @PostMapping("/save")
    public ResponseEntity<ApiResponse<SiteSettings>> saveOrUpdateSiteSettings(
            @ModelAttribute @Valid SiteSettingsDto siteSettingsDto) throws IOException {
        if (!siteSettingsDto.isLogoValid() || !siteSettingsDto.isFaviconValid() || !siteSettingsDto.isAboutCoverValid()
                || !siteSettingsDto.isContactCoverValid() || !siteSettingsDto.isPortfolioCoverValid()) {
            return buildResponse("error", HttpStatus.BAD_REQUEST, "Image is required and cannot be empty", null);
        }   

        SiteSettings siteSettings = new SiteSettings();
        siteSettings.setFooter(siteSettingsDto.getFooter());

        return buildResponse("success", HttpStatus.OK,
                "Hero" + (siteSettings.getId() != null ? " update " : " save ") + "successfully",
                siteSettingsService.saveOrUpdateSiteSettings(siteSettings, siteSettingsDto.getLogo(),
                        siteSettingsDto.getFavicon(), siteSettingsDto.getAboutCover(),
                        siteSettingsDto.getPortfolioCover(), siteSettingsDto.getContactCover()));
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
