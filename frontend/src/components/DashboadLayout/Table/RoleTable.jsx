import { ChevronRight, ClipboardPen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../../context/Context";
import { axiosInstance } from "../../../Api/Axios";
import { Link } from "react-router-dom";

const RoleTable = () => {
  const { roleData, error } = useGlobalContext();

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
        <button className="p-2 rounded-md text-sm text-white bg-cyan-500 hover:bg-cyan-600">
          <Link to="/dashboard/roles/create-role">Add role</Link>
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <TableHeader />
          <tbody>
            {roleData.length > 0 ? (
              roleData.map((role, index) => (
                <tr key={role.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  {headings.map((heading) => (
                    <td key={heading.key} className="py-3 px-6 text-center">
                      {role[heading.key]}
                    </td>
                  ))}
                  <td className="py-3 px-6 flex items-center justify-center gap-3">
                    <button
                      title="Edit"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Link to={`/dashboard/roles/edit/${role.id}`}>
                        <ClipboardPen />
                      </Link>
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
