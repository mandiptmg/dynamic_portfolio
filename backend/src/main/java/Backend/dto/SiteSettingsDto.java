package Backend.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SiteSettingsDto {
    private Long id; // Optional for updates

    @NotBlank(message = "Footer is required")
    private String footer;

    @NotNull(message = "Logo file is required.")
    private MultipartFile logo;

    @NotNull(message = "Favicon file is required.")
    private MultipartFile favicon;

    @NotNull(message = "About cover image file is required.")
    private MultipartFile aboutCover;

    @NotNull(message = "Portfolio cover image file is required.")
    private MultipartFile portfolioCover;

    @NotNull(message = "Contact cover image file is required.")
    private MultipartFile contactCover;

    public boolean isLogoValid() {
        return logo != null && !logo.isEmpty();
    }

    public boolean isFaviconValid() {
        return favicon != null && !favicon.isEmpty();
    }

    public boolean isAboutCoverValid() {
        return aboutCover != null && !aboutCover.isEmpty();
    }

    public boolean isPortfolioCoverValid() {
        return portfolioCover != null && !portfolioCover.isEmpty();
    }

    public boolean isContactCoverValid() {
        return contactCover != null && !contactCover.isEmpty();
    }
}
