import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../Api/Axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    to: "mandiptamang159@gmail.com",
    subject: "Contact Me",
    personalizedMessage: "",
    fullName: "",
    email: "",
    attachments: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "attachments" && value.length > 0) {
        Array.from(value).forEach((file) => {
          formDataToSend.append("attachments", file);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.post("/send-email", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Message sent successfully!", {
        position: "top-center",
      });
      setFormData({
        to: "mandiptamang159@gmail.com",
        subject: "Contact Me",
        fullName: "",
        email: "",
        personalizedMessage: "",
        attachments: [],
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-20 p-7">
      <form
        onSubmit={handleSubmit}
        className="w-full text-left dark:text-black mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block text-gray-700 dark:text-gray-200 font-semibold"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADB5] focus:outline-[#00ADB5] focus:ring-[#00ADB5]"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-200 font-semibold"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADB5] focus:outline-[#00ADB5] focus:ring-[#00ADB5]"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 dark:text-gray-200 font-semibold"
          >
            Message
          </label>
          <textarea
            name="personalizedMessage"
            className="mt-1 block w-full focus:outline-[#00ADB5] rounded-md p-2 border-gray-300 shadow-sm focus:border-[#00ADB5] resize-none focus:ring-[#00ADB5]"
            rows={4}
            placeholder="Enter your message"
            value={formData.personalizedMessage}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="attachments"
            className="block text-gray-700 dark:text-gray-200 font-semibold"
          >
            Attachments (Optional)
          </label>
          <input
            type="file"
            name="attachments"
            className="mt-1 block p-2 w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-[#00ADB5] focus:outline-[#00ADB5] focus:ring-[#00ADB5]"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#00ADB5] hover:bg-[rgb(143,195,231)] duration-700 text-white py-2 px-4 rounded-md focus:outline-[#00ADB5] focus:ring-2 capitalize focus:ring-offset-2 focus:ring-[#00ADB5]"
          disabled={loading}
        >
          {loading ? "Send Message..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
