import { ChevronRight, ClipboardPen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";
import { useState } from "react";
import PermissionModel from "../model/PermisisonModel";

const PermissionTable = () => {
  const { permissionData, error } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [editId, setEditId] = useState(null);
  const [activeModel, setActiveModel] = useState(false);

  const headings = [{ key: "name", value: "Permission Name" }];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this permission?"))
      return;
    try {
      const response = await axiosInstance.delete(`/permissions/${id}`);
      toast.success(
        response.data.message || "permission deleted successfully!"
      );
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete the permission."
      );
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = (permission) => {
    setFormData({
      name: permission.name})
    setEditId(permission.id);
    setActiveModel(true);
  };

  // Table Header Component
  const TableHeader = () => {
    return (
      <thead className="bg-cyan-500 text-white">
        <tr>
          <th className="py-3 px-6 text-center uppercase">Id</th>
          {headings.map((heading) => (
            <th key={heading.key} className="py-3 px-6 text-center">
              {heading.value}
            </th>
          ))}
          <th className="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
    );
  };

  return (
    <main>
      {activeModel && (
        <PermissionModel
          isClose={() => setActiveModel(false)}
          activeModel
          formData={formData}
          setFormData={setFormData}
          editId={editId}
        />
      )}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-3">
          <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
            <span className="text-cyan-500">
              <ChevronRight />
            </span>
            permissions
          </h1>
          <p className="text-gray-600 text-sm">
            A list of all the permissions in your account including their name.
          </p>
        </div>
        <button
          onClick={() => setActiveModel(true)}
          className="p-2 rounded-md text-sm text-white bg-cyan-500 hover:bg-cyan-600"
        >
          Add permission
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <TableHeader />
          <tbody>
            {permissionData.length > 0 ? (
              permissionData.map((permission, index) => (
                <tr key={permission.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  {headings.map((heading) => (
                    <td key={heading.key} className="py-3 px-6 text-center">
                      {permission[heading.key]}
                    </td>
                  ))}
                  <td className="py-3 px-6 flex items-center justify-center gap-3">
                    <button
                      title="Edit"
                      onClick={() => handleEdit(permission)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ClipboardPen />
                    </button>

                    <button
                      onClick={() => handleDelete(permission.id)}
                      title="Delete"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headings.length + 1} className="py-4 text-center">
                  Error: {error}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PermissionTable;
