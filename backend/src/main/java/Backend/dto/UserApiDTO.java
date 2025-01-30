package Backend.dto;

import lombok.Data;

@Data
public class UserApiDTO {
    private Long id;
    private String name;
    private String email;
    private RoleDTO role;

}
