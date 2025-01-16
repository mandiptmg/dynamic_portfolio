/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../Api/Axios";
import { useState } from "react";

export default function SkillModel({
  formData,
  setFormData,
  editId,
  isClose,
  activeModel,
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleClose = () => {
    isClose();
    setFormData({
      name: "",
      icon: "",
      description: "",
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      let response;
      if (editId) {
        // Update skill
        response = await axiosInstance.put(`/skills/${editId}`, formData);
      } else {
        // Add new skill
        response = await axiosInstance.post("/skills/add-skill", formData);
      }

      const { code, message } = response.data;
      if (code === 201 || code === 200) {
        toast.success(message || "Skill successfully added/updated!");
        handleClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(message || "An unknown error occurred.", {
          position: "top-center",
        });
      }
    } catch (error) {
      const errorResponse = error?.response?.data?.errors || {};

      if (errorResponse) {
        setErrors(errorResponse);
      }
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during the request.";
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, value, onChange, placeholder, error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {<p className="text-red-600 text-xs">{error}</p>}
    </div>
  );

  return (
    <Dialog open={activeModel} onClose={handleClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="text-center sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {editId
                    ? "Update Skill Information"
                    : "Add Skill Information"}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="mt-4 px-3 space-y-4">
                  {/* Name Field */}
                  <InputField
                    label="Name"
                    name="name"
                    error={errors.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Skill Name"
                  />

                  {/* Icon Field */}
                  <InputField
                    label="Icon"
                    name="icon"
                    error={errors.icon}
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="Enter Icon URL"
                  />

                  {/* Description Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the skill..."
                      className="mt-1 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.description && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-transparent px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                      disabled={loading}
                    >
                      {loading
                        ? "Loading..."
                        : editId
                        ? "Update Skill"
                        : "Create Skill"}
                    </button>
                    <button
                      onClick={handleClose}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-red-600 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
