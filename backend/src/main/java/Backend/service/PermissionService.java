package Backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.model.Permission;
import Backend.repository.PermissionRepository;

@Service
public class PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission createPermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    public Optional<Permission> getPermissionById(Long id) {
        return permissionRepository.findById(id);
    }

    public Permission updatePermission(Long id, Permission permissionDetails) {
        return permissionRepository.findById(id).map(permission -> {
            permission.setName(permissionDetails.getName());
            return permissionRepository.save(permission);
        }).orElseThrow(() -> new RuntimeException("Permission not found"));
    }

    public void deletePermission(Long id) {
        permissionRepository.deleteById(id);
    }

}
