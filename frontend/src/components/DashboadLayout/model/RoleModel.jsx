/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useGlobalContext } from "../../context/Context";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
export default function RoleModel({
  formData,
  setFormData,
  editId,
  isClose,
  activeModel,
}) {
  const { setLoading, loading } = useGlobalContext();

  const handleClose = () => {
    isClose();
    setFormData({ name: "" }); // Clear form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (editId) {
        // Update Role
        response = await axiosInstance.put(`/roles/${editId}`, {
          name: formData.name,
        });
      } else {
        // Add Role
        response = await axiosInstance.post("/roles/add-role", {
          name: formData.name,
        });
      }
      const { code, message } = response.data;
      if (code === 200 || code === 201) {
        toast.success(message || "Operation successful!");
        handleClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(message || "Operation failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
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
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                {editId ? "Edit Role" : "Add Role"}
              </DialogTitle>
              <form onSubmit={handleSubmit} className="mt-4 px-3 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter role name"
                    required
                    className="mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/25"
                  />
                </div>
                <div className="bg-transparent px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                    disabled={loading}
                  >
                    {loading
                      ? "Loading..."
                      : editId
                      ? "Update Role"
                      : "Add Role"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-red-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
