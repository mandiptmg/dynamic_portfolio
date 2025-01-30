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

export default function PermissionModel({
  formData,
  setFormData,
  editId,
  isClose,
  activeModel,
}) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    isClose();
    setFormData({
      name: "",
    }); // Clear name after closing the dialog
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError = (error) => {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while processing the request.";
    toast.error(errorMessage, { position: "top-center" });
  };

  const handleSuccess = (message) => {
    toast.success(message || "Permission added successfully!");
    handleClose();
    setTimeout(() => window.location.reload(), 1000);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (editId) {
        // Update permission
        response = await axiosInstance.put(`/permissions/${editId}`, formData);
      } else {
        // Add permission
        response = await axiosInstance.post(
          "/permissions/add-permission",
          formData
        );
      }

      const { code, message } = response.data;
      if (code === 200 || code === 201) {
        handleSuccess(message);
      } else {
        toast.error(message || "An unknown error occurred.", {
          position: "top-center",
        });
      }
    } catch (error) {
      handleError(error);
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
              <div className="text-center sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {editId ? "Update Permission" : "Add Permission"}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="mt-4 px-3 space-y-4">
                  {/* Permission Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Permission Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Permission Name"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
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
                        ? "Update Permission"
                        : "Create Permission"}
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
