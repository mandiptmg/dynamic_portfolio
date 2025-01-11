package Backend.service;

import Backend.model.Permission;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.model.Role;
import Backend.repository.PermissionRepository;
import Backend.repository.RoleRepository;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

     @Autowired
    private PermissionRepository permissionRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public Role createRole(Role role) {
        // Ensure all permissions in the role have valid `name` values
        role.getPermissions().forEach(permission -> {
            if (permission.getName() == null) {
                Optional<Permission> existingPermission = permissionRepository.findById(permission.getId());
                existingPermission.ifPresent(existing -> permission.setName(existing.getName()));
            }
        });

        // Save and return the role
        return roleRepository.save(role);
    }


    public Role updateRole(Long id, Role roleDetails) {
        return roleRepository.findById(id).map(role -> {
            role.setName(roleDetails.getName());
            role.setPermissions(roleDetails.getPermissions());
            return roleRepository.save(role);
        }).orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

}
