package Backend.controller.public_Api;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.dto.UserDTO;
import Backend.model.ApiResponse;
import Backend.model.ContactDetails;
import Backend.model.Permission;
import Backend.model.Role;
import Backend.model.SiteSettings;
import Backend.model.Header.Header;
import Backend.model.Hero.Hero;
import Backend.model.Project.Project;
import Backend.model.Skill.Skill;
import Backend.model.about.About;
import Backend.model.socialData.SocialData;
import Backend.service.ContactDetailsService;
import Backend.service.PermissionService;
import Backend.service.RoleService;
import Backend.service.SiteSettingsService;
import Backend.service.UserService;
import Backend.service.About.AboutService;
import Backend.service.Header.HeaderService;
import Backend.service.Hero.HeroService;
import Backend.service.Project.ProjectService;
import Backend.service.Skill.SkillService;
import Backend.service.socialData.SocialDataService;

@RestController
@RequestMapping("/public")
public class ApiController {

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private HeroService heroService;

    @Autowired
    private AboutService aboutService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SocialDataService socialDataService;

    @Autowired
    private ContactDetailsService contactService;

    @Autowired
    private SiteSettingsService siteSettingsService;

    @Autowired
    private HeaderService headerService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @GetMapping("/hero")
    public ResponseEntity<ApiResponse<Hero>> getAllHero() {
        Hero hero = heroService.getHero();
        if (hero == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No hero details found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Hero Details retrieved successfully", hero);
    }

    @GetMapping("/about")
    public ResponseEntity<ApiResponse<About>> getAbout() {
        About about = aboutService.getAbout();
        if (about == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No about found", null);
        }
        return buildResponse("success", HttpStatus.OK, "About retrieved successfully", about);
    }

    @GetMapping("/headers")
    public ResponseEntity<ApiResponse<List<Header>>> getAllHeaders() {
        List<Header> headers = headerService.getAllHeaders();
        if (headers.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No headers found", headers);
        }
        return buildResponse("success", HttpStatus.OK, "Headers retrieved successfully", headers);
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<Project>>> getAllProjects() {
        List<Project> Projects = projectService.getAllProjects();
        if (Projects.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No Projects found", Projects);
        }
        return buildResponse("success", HttpStatus.OK, "Projects retrieved successfully", Projects);
    }

    @GetMapping("projects/{id}")
    public ResponseEntity<ApiResponse<Project>> getProjectById(@PathVariable("id") Long id) {
        Optional<Project> ProjectOptional = projectService.getProjectById(id);
        if (!ProjectOptional.isPresent()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Project not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Project retrieved successfully", ProjectOptional.get());
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<Skill>>> getAllSkills() {
        List<Skill> Skills = skillService.getAllSkills();
        if (Skills.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No Languages found", Skills);
        }
        return buildResponse("success", HttpStatus.OK, "Languages retrieved successfully", Skills);
    }

    @GetMapping("/skills/{id}")
    public ResponseEntity<ApiResponse<Skill>> getSkillById(@PathVariable("id") Long id) {
        Optional<Skill> SkillOptional = skillService.getSkillById(id);
        if (!SkillOptional.isPresent()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Language not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Language retrieved successfully", SkillOptional.get());
    }

    // Get all social data
    @GetMapping("/social-data")
    public ResponseEntity<ApiResponse<List<SocialData>>> getAllSocialDatas() {
        List<SocialData> socialDataList = socialDataService.getAllSocialData();
        if (socialDataList.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No Social Data found", socialDataList);
        }
        return buildResponse("success", HttpStatus.OK, "Social Data retrieved successfully", socialDataList);
    }

    // Get social data by ID
    @GetMapping("social-data/{id}")
    public ResponseEntity<ApiResponse<SocialData>> getSocialDataById(@PathVariable("id") Long id) {
        Optional<SocialData> socialDataOptional = socialDataService.getSocialDataById(id);
        if (!socialDataOptional.isPresent()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Social Data not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Social Data retrieved successfully", socialDataOptional.get());
    }

    @GetMapping("/contact-details")
    public ResponseEntity<ApiResponse<ContactDetails>> getContactDetails() {
        ContactDetails ContactDetails = contactService.getContactDetails();
        if (ContactDetails == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No Contact Details found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Contact Details retrieved successfully",
                ContactDetails);
    }

    @GetMapping("/permissions")
    public ResponseEntity<ApiResponse<List<Permission>>> getPermissions() {
        List<Permission> permissions = permissionService.getAllPermissions();
        if (permissions.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No permissions found", permissions);
        }
        return buildResponse("success", HttpStatus.OK, "Permissions retrieved successfully", permissions);

    }

    @GetMapping("/permissions/{id}")
    public ResponseEntity<ApiResponse<Permission>> getPermissionById(@PathVariable Long id) {
        Permission permission = permissionService.getPermissionById(id).orElse(null);
        if (permission == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Permission not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Permission retrieved successfully", permission);
    }

    @GetMapping("/roles")
    public ResponseEntity<ApiResponse<List<Role>>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        if (roles.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No roles found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Roles retrieved successfully", roles);
    }

    @GetMapping("/roles/{id}")
    public ResponseEntity<ApiResponse<Role>> getRoleById(@PathVariable Long id) {
        Role role = roleService.getRoleById(id).orElse(null);
        if (role == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "Role not found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Role retrieved successfully", role);

    }

    // Get all heroes
    @GetMapping("/site-settings")
    public ResponseEntity<ApiResponse<SiteSettings>> getSiteSettings() {
        SiteSettings siteSettings = siteSettingsService.getSiteSettings();
        if (siteSettings == null) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No site settings found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Site settings retrieved successfully", siteSettings);
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getUsers() {
        List<UserDTO> users = userService.getAllUsers();

        if (users.isEmpty()) {
            return buildResponse("error", HttpStatus.NOT_FOUND, "No roles found", null);
        }
        return buildResponse("success", HttpStatus.OK, "Roles retrieved successfully", users);
    }

    // Helper method to create response
    private <T> ResponseEntity<ApiResponse<T>> buildResponse(String status, HttpStatus statusCode, String message,
            T data) {
        ApiResponse<T> response = new ApiResponse<>(status, statusCode.value(), message, data,
                LocalDateTime.now().toString());
        return ResponseEntity.status(statusCode).body(response);
    }

}
