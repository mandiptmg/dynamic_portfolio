import { ChevronRight, ClipboardPen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { useState } from "react";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";
import ProjectModel from "../model/ProjectModel";

const PortfolioTable = () => {
  const { projectData, error } = useGlobalContext();
  const [activeModel, setActiveModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    image: null,
  });

  const headings = [
    { key: "image", value: "Image" },
    { key: "name", value: " Name" },
    { key: "link", value: " Link" },
  ];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const response = await axiosInstance.delete(`/projects/${id}`);
      toast.success(response.data.message || "projects deleted successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete the project."
      );
    }
  };

  const handleEdit = (project) => {
    setFormData({
      name: project.name,
      link: project.link,
      image: project.image,
    });
    setEditId(project.id);

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
        <ProjectModel
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
            Protfolio
          </h1>
          <p className="text-gray-600 text-sm">
            A list of all the Skill in your account including their name, link,
            and image.
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
            Add project
          </button>
        </div>
      </div>

      {/* table  */}

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <TableHeader />
          <tbody>
            {projectData.length > 0 ? (
              projectData.map((person, index) => (
                <tr key={person.id} className="border-t  hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  {headings.map((heading) => (
                    <td key={heading.key} className="py-3 px-6 text-center">
                      {heading.key === "image" ? (
                        <img
                          src={person[heading.key]}
                          alt={person.name} 
                          className="w-12 h-12 mx-auto object-top object-cover rounded-md"
                        />
                      ) : (
                        person[heading.key]
                      )}
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

export default PortfolioTable;
