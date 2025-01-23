import { useGlobalContext } from "../../context/Context";
import { ChevronRight, ClipboardPen, Trash2 } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import RoleModel from "../model/RoleModel";
import { useState } from "react";

const RoleTable = () => {
  const { allRoles, error } = useGlobalContext();

  const [formData, setFormData] = useState({
    name: "",
  });
  const [editId, setEditId] = useState(null);
  const [activeModel, setActiveModel] = useState(false);

  const headings = [{ key: "name", value: "Role Name" }];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      const response = await axiosInstance.delete(`/roles/${id}`);
      toast.success(response.data.message || "role deleted successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete the role."
      );
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = (role) => {
    setFormData({
      name: role.name,
    });
    setEditId(role.id);

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
        <RoleModel
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
            roles
          </h1>
          <p className="text-gray-600 text-sm">
            A list of all the roles in your account including their name.
          </p>
        </div>
        <button
          onClick={() => {
            setActiveModel(true);
            setFormData({ name: "" });
            setEditId(null);
          }}
          className="p-2 rounded-md text-sm text-white bg-cyan-500 hover:bg-cyan-600"
        >
          Add role
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <TableHeader />
          <tbody>
            {allRoles.length > 0 ? (
              allRoles.map((role, index) => (
                <tr key={role.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  {headings.map((heading) => (
                    <td key={heading.key} className="py-3 px-6 text-center">
                      {role[heading.key]}
                    </td>
                  ))}
                  <td className="py-3 px-6 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEdit(role)}
                      title="Edit"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ClipboardPen />
                    </button>

                    <button
                      onClick={() => handleDelete(role.id)}
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

export default RoleTable;
