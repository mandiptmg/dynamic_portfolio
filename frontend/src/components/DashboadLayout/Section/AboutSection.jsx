/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";

const AboutSection = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { aboutData } = useGlobalContext();

  // Destructure formData state for easy access
  const [formData, setFormData] = useState({
    id: aboutData?.id || null,
    title: aboutData?.title || "",
    description: aboutData?.description || "",
    image: aboutData?.image || null,
    resume: aboutData?.resume || null,
    subSkillTitle: aboutData?.subSkillTitle || "",
    secondImage: aboutData?.secondImage || null,
    projectInquiry: aboutData?.projectInquiry || "",
    inquiryDescription: aboutData?.inquiryDescription || "",
    imageURL: null,
    secondImageURL: null,
  });

  useEffect(() => {
    if (aboutData) {
      setFormData((prev) => ({
        ...prev,
        ...aboutData,
      }));
    }
  }, [aboutData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = useCallback((acceptedFiles, fieldName) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
        [`${fieldName}URL`]: URL.createObjectURL(file),
      }));
      toast.success(
        `${
          fieldName === "image" ? "First Image" : "Second image"
        } uploaded successfully!`
      );
    } else {
      toast.error("No file uploaded!");
    }
  }, []);

  const imageDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, "image"),
    accept: "image/*",
    maxFiles: 1,
  });

  const secondImageDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, "secondImage"),
    accept: "image/*",
    maxFiles: 1,
  });

  const handleEditorBlur = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formPayload.append(key, value);
      } else if (value) {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.post("/about/save", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { code, message } = response.data;

      if ([200, 201].includes(code)) {
        window.location.reload();
        toast.success(message || "About created/updated successfully");
        setErrors({});
      }
    } catch (error) {
      const errorResponse = error?.response?.data?.errors || {};
      if (errorResponse) {
        setErrors(errorResponse);
      }
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-red-600 text-xs">{errors[field]}</p>;

  const formFields = [
    { name: "title", label: "Title", type: "text", placeholder: "Title" },
    { name: "resume", label: "Resume", type: "file" },
    {
      name: "description",
      label: "Description",
      type: "editor",
      placeholder: "",
    },
    {
      name: "subSkillTitle",
      label: "Sub Skill Title",
      type: "text",
      placeholder: "Skill Title",
    },
    {
      name: "projectInquiry",
      label: "Project Inquiry",
      type: "text",
      placeholder: "Project Inquiry",
    },
    {
      name: "inquiryDescription",
      label: "Inquiry Description",
      type: "textarea",
      placeholder: "Inquiry Description",
    },
  ];

  return (
    <div>
      <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
        <FaChevronRight className="text-cyan-500" /> About
      </h1>

      <div className="p-4 bg-white mt-4 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />

          <div className="grid md:grid-cols-2 gap-4">
            {formFields.map((field) => (
              <div
                key={field.name}
                className={
                  field.type === "editor" || field.type === "textarea"
                    ? "col-span-2"
                    : ""
                }
              >
                <label className={`block text-sm font-medium text-gray-700 `}>
                  {field.label}
                </label>
                {field.type === "editor" ? (
                  <JoditEditor
                    value={formData[field.name]}
                    tabIndex={1}
                    onBlur={handleEditorBlur}
                    className="text-black col-span-2  jodit-editor"
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-
                50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-c
                yan-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus-ring-cyan-500 dark:focus:border-cyan-500"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className={`mt-1 block w-full rounded-lg border ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    } py-1.5 px-3 text-sm text-gray-900 focus:ring-cyan-500`}
                  />
                )}
                {renderError(field.name)}
              </div>
            ))}

            {/* Image Upload Section */}
            <ImageUploadSection
              dropzoneProps={imageDropzone.getRootProps()}
              inputProps={imageDropzone.getInputProps()}
              label="First Image"
              image={formData.image || formData.imageURL}
              imageURL={formData.imageURL || formData.image}
              error={errors.image}
            />

            {/* Background Image Upload Section */}
            <ImageUploadSection
              dropzoneProps={secondImageDropzone.getRootProps()}
              inputProps={secondImageDropzone.getInputProps()}
              label="Second Image"
              image={formData.secondImage || formData.secondImageURL}
              imageURL={formData.secondImageURL || formData.secondImage}
              error={errors.secondImage}
            />

            <button
              type="submit"
              className="col-span-2 w-full hover:bg-cyan-600 text-white bg-cyan-500 font-bold py-2 px-4 rounded focus:outline-none"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : formData.id
                ? "Update About"
                : "Create About"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ImageUploadSection = ({
  dropzoneProps,
  inputProps,
  label,
  image,
  imageURL,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div
      {...dropzoneProps}
      className={`flex flex-col items-center justify-center border-2 min-h-[150px] rounded-lg p-6 cursor-pointer ${
        error ? "border-red-500" : "border-gray-300"
      } bg-slate-900`}
    >
      <input {...inputProps} />
      {image ? (
        <img
          src={imageURL}
          alt={label}
          className="w-full h-48 object-contain mb-3"
        />
      ) : (
        <p className="text-gray-600">
          Drag and drop an image or click to upload
        </p>
      )}
    </div>
    {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
  </div>
);

export default AboutSection;
