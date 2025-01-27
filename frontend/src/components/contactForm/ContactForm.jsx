import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../Api/Axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    personalizedMessage: "",
    attachments: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullName, email, personalizedMessage, attachments } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("to", "mandiptamang159@gmail.com"); // Example email
    formDataToSend.append("subject", "Contact Me"); // Default subject
    formDataToSend.append("personalizedMessage", personalizedMessage);
    formDataToSend.append("fullName", fullName);
    formDataToSend.append("email", email);
    attachments.forEach((file) => formDataToSend.append("attachments", file));

    try {
      const response = await axiosInstance.post("/send-email", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === 200) {
        toast.success(response.data.message || "message send successfull", {
          position: "top-center",
        });
        setFormData({
          fullName: "",
          email: "",
          message: "",
          attachments: [],
        });
      }
    } catch (error) {
      toast.error(error?.response || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-20 p-7">
      <form
        onSubmit={handleSubmit}
        method="POST"
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
            id="fullName"
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
            id="email"
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
            id="personalizedMessage"
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
            id="attachments"
            className="mt-1 block w-full"
            multiple
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#00ADB5] hover:bg-[rgb(143,195,231)] duration-700 text-white py-2 px-4 rounded-md focus:outline-[#00ADB5] focus:ring-2 focus:ring-offset-2 focus:ring-[#00ADB5]"
          disabled={loading}
        >
          {loading ? "send message..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
