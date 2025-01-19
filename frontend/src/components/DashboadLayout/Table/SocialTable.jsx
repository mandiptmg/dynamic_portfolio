import { ChevronRight, ClipboardPen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { useState } from "react";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";
import SocialModel from "../model/SocialModel";

const SocialTable = () => {
  const { socialData, error } = useGlobalContext();
  const [activeModel, setActiveModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    icon: "",
  });

  const headings = [
    { key: "name", value: " Name" },
    { key: "icon", value: "Icon" },
    { key: "link", value: " Link" },
  ];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this social media?"))
      return;
    try {
      const response = await axiosInstance.delete(`/social-data/${id}`);
      toast.success(response.data.message || "social media deleted successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete the social media."
      );
    }
  };

  const handleEdit = (social ) => {
    setFormData({
      name: social .name,
      link: social .link,
      icon: social .icon,
    });
    setEditId(social .id);

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
        <SocialModel
          isClose={() => setActiveModel(false)}
          activeModel
          formData={formData}
          setFormData={setFormData}
          editId={editId}
        />
      )}

      <div className="flex items-start justify-between mb-6">
        <div className="space-y-3">
          <h1 className="text-lg font-semibold flex items-center gap-1">
            <span className="text-cyan-500">
              <ChevronRight />
            </span>
            Headers
          </h1>
          <p className="text-gray-600 text-sm">
            A list of all the Skill in your account including their name, link,
            and icon.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => {
              setActiveModel(true);
              setEditId(null);
            }}
            className="p-2 rounded-md text-sm text-white bg-cyan-500 hover:bg-cyan-600"
          >
            Add header
          </button>
        </div>
      </div>

      {/* table  */}

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <TableHeader />
          <tbody>
            {socialData.length > 0 ? (
              socialData.map((person, index) => (
                <tr key={person.id} className="border-t  hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  {headings.map((heading) => (
                    <td key={heading.key} className="py-3 px-6 text-center">
                      {
                        person[heading.key]
                      }
                    </td>
                  ))}
                  <td className="py-3 px-6 flex justify-center items-center gap-3">
                    <button
                      onClick={() => handleEdit(person)}
                      title="Edit"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ClipboardPen />
                    </button>
                    <button
                      onClick={() => handleDelete(person.id)}
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
                  Error: {error.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default SocialTable;
