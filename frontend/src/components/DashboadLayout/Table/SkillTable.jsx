import { ChevronRight, ClipboardPen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { useState } from "react";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";
import SkillModel from "../model/skillModel";

const SkillTable = () => {
  const { skillData, error } = useGlobalContext();
  const [activeModel, setActiveModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    description: "",
  });

  const headings = [
    { key: "name", value: " Name" },
    { key: "icon", value: " icon" },
    { key: "description", value: "description" },
  ];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const response = await axiosInstance.delete(`/skills/${id}`);
      toast.success(response.data.message || "Skills deleted successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete the skill."
      );
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      icon: skill.icon,
      description: skill.description,
    });
    setEditId(skill.id);

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
        <SkillModel
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
            Skills
          </h1>
          <p className="text-gray-600 text-sm">
            A list of all the Skill in your account including their name, icon,
            and description.
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
            Add Skill
          </button>
        </div>
      </div>

      {/* table  */}

      <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <TableHeader />
          <tbody>
            {skillData.length > 0 ? (
              skillData.map((skill, index) => (
                <tr key={skill.id} className="border-t  hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
                  {headings.map((heading) => (
                  <td key={heading.key} className="py-3 px-6 text-center">
                  {heading.key === "description" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        {skill[heading.key]?.slice(0, 50)}
                        {skill[heading.key]?.length > 50 && "..."}
                      </span>
                    </div>
                  ) : (
                    skill[heading.key]
                  )}
                </td>
                
                  ))}
                  <td className="py-3 px-6 flex justify-center items-center gap-3">
                    <button
                      onClick={() => handleEdit(skill)}
                      title="Edit"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ClipboardPen />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
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

export default SkillTable;
