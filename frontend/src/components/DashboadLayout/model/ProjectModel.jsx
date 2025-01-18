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

export default function ProjectModel({
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
      link: "",
      image: null,
      imagePreview: null,
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
      imagePreview: files ? URL.createObjectURL(files[0]) : prev.imagePreview,
    }));
  };
  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            formPayload.append(key, value);
          }
        } else if (value) {
          formPayload.append(key, value);
        }
      });

      let response;
      if (editId) {
        // Update project
        response = await axiosInstance.put(`/projects/${editId}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Add new project
        response = await axiosInstance.post(
          "/projects/add-project",
          formPayload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      const { code, message } = response.data;
      if (code === 201 || code === 200) {
        toast.success(message || "Project successfully added/updated!");
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

  return (
    <Dialog open={activeModel} onClose={handleClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {editId
                    ? "Update Project Information"
                    : "Add Project Information"}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="mt-4 px-3 space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Project Name"
                      className="mt-1 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs">{errors.name}</p>
                    )}
                  </div>

                  {/* Icon Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Link URL
                    </label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder="Enter link URL "
                      className="mt-1 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.link && (
                      <p className="text-red-600 text-xs">{errors.link}</p>
                    )}
                  </div>

                  {/* Image Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>
                  {(formData.imagePreview || formData.image) && (
                    <img
                      src={formData.imagePreview || formData.image}
                      alt="Preview"
                      className="mt-3 w-full max-h-48 object-contain rounded-md"
                    />
                  )}

                  {/* Action Buttons */}
                  <div className="text-right space-x-2">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                      disabled={loading}
                    >
                      {loading
                        ? "Loading..."
                        : editId
                        ? "Update Project"
                        : "Create Project"}
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
