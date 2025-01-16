/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useGlobalContext } from "../../context/Context";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axiosInstance";

export default function UserModel({
  formData,
  setFormData,
  editId,
  isClose,
  activeModel,
}) {
  const { setLoading, allRoles, loading } = useGlobalContext();

  const handleClose = () => {
    isClose();
    setFormData({
      name: "",
      email: "",
      password: "",
      role: {
        name: "",
      },
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      setFormData({
        ...formData,
        role: { name: value }, // Update role.name specifically
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (editId) {
        // Update user
        response = await axiosInstance.put(`/users/${editId}`, formData);
      } else {
        // Add user
        response = await axiosInstance.post("/users/add-user", formData);
      }

      const { code, message } = response.data;
      if (code === 201 || code === 200) {
        toast.success(message || "Registration successful!");
        handleClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(message || "An unknown error occurred.", {
          position: "top-center",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration.";
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
              <div className="text-center sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                 { editId ? "Update User Information" : "User Information"}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="mt-4 px-3 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Password */}
                  <div className={editId ? "hidden" : ""}>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="mt-1 block w-full rounded-lg border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 py-1.5 px-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {allRoles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="bg-transparent px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                      disabled={loading}
                    >
                      {loading
                        ? "Loading..."
                        : editId
                        ? "Update User"
                        : "Create User"}
                    </button>
                    <button
                      onClick={() => isClose()}
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
