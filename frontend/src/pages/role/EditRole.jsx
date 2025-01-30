import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../Api/Axios";
import { useGlobalContext } from "../../context/Context";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const EditRole = () => {
  const navigate = useNavigate();
  const { permissionData } = useGlobalContext();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    permissions: new Set(), // Store selected permissions as a Set for quick lookup
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get(`/roles/${id}`);
        const role = response.data.data;
        setFormData({
          name: role.name,
          permissions: new Set(role.permissions.map((perm) => perm.id)), // Store IDs in Set
        });
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    fetchRole();
  }, [id]);

  // Handle checkbox changes
  const handlePermissionChange = (permId) => {
    setFormData((prevData) => {
      const updatedPermissions = new Set(prevData.permissions);
      if (updatedPermissions.has(permId)) {
        updatedPermissions.delete(permId);
      } else {
        updatedPermissions.add(permId);
      }
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format permissions as an array of objects with "id"
    const formattedPermissions = Array.from(formData.permissions).map((id) => ({
      id,
    }));

    try {
      const response = await axiosInstance.put(`/roles/${id}`, {
        name: formData.name.toUpperCase(),
        permissions: formattedPermissions,
      });
      const { message } = response.data;
      toast.success(message || "Role updated successfully!");
      navigate("/dashboard/roles");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(error.response?.data?.message || "Failed to update role.");
    }
  };

  return (
    <div>
      <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
        <span className="text-cyan-500">
          <ChevronRight />
        </span>
        Edit Role
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 mt-5 max-w-2xl mx-auto w-full rounded-lg"
      >
        {/* Role Name Input */}
        <div className="mb-4">
          <label className="block font-medium">Role Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-3 block w-full rounded-lg border  py-1.5 px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        {/* Permissions Section */}
        <h2 className="mt-4 text-lg">Permissions</h2>
        <div className="flex items-start  flex-wrap md:justify-around gap-4 border-2 rounded-lg p-3">
          {permissionData.map((permission) => (
            <label key={permission.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.permissions.has(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              />
              {permission.name}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 w-full bg-cyan-500 text-white rounded"
        >
          Update Role
        </button>
      </form>
    </div>
  );
};

export default EditRole;
