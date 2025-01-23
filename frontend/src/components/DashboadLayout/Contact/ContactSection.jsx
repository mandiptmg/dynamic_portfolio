/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { axiosInstance } from "../../../Api/Axios";

import Select from "react-select";

import makeAnimated from "react-select/animated";
import { useGlobalContext } from "../../../context/Context";

const animatedComponents = makeAnimated();

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData, socialData } = useGlobalContext();


  const [formData, setFormData] = useState({
    id: contactData?.id || null,
    name: contactData?.name || "",
    position: contactData?.position || "",
    description: contactData?.description || "",
    contactImage: contactData?.contactImage || null,
    subTitle: contactData?.subTitle || "",
    socials: contactData?.socialData?.map((social) => social.id) || [],
    contactImageURL: null,
  });


  useEffect(() => {
    if (contactData) {
      setFormData((prev) => ({
        ...prev,
        ...contactData,
        socials: contactData.socialData?.map((social) => social.id) || [],
      }));
    }
  }, [contactData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleFileDrop = useCallback((acceptedFiles, fieldName) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
        [`${fieldName}URL`]: URL.createObjectURL(file),
      }));
      toast.success(`${fieldName} uploaded successfully!`);
    } else {
      toast.error("No file uploaded!");
    }
  }, []);

  const imageDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, "contactImage"),
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
      if (["contactImage"].includes(key)) {
        if (value instanceof File) {
          formPayload.append(key, value);
        }
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item) => formPayload.append(`${key}[]`, item));
      } else if (value != null) {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.post(
        "/contact-details/save",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { code, message } = response.data;

      if ([200, 201].includes(code)) {
        setTimeout(() => window.location.reload(), 1000);
        toast.success(
          message || "contact details created/updated successfully"
        );
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

  return (
    <div>
      <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
        <FaChevronRight className="text-cyan-500" /> Contact Details
      </h1>

      <div className="p-4 bg-white mt-4 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />

          <div className="grid md:grid-cols-2 gap-4">
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
                placeholder="Enter name"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("name")}
            </div>

            {/* Position Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter position"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.position ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("position")}
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <JoditEditor
                value={formData.description}
                tabIndex={1}
                onBlur={handleEditorBlur}
                className="text-black col-span-2 jodit-editor"
              />
              {renderError("description")}
            </div>

            {/* Sub Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub Title
              </label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleInputChange}
                placeholder="Enter sub title"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.subTitle ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("subTitle")}
            </div>

            {/* Image Upload */}
            <ImageUploadSection
              dropzoneProps={imageDropzone.getRootProps()}
              inputProps={imageDropzone.getInputProps()}
              label="Contact Image"
              image={formData.contactImage || formData.contactImageURL}
              imageURL={formData.contactImageURL || formData.contactImage}
              error={errors.contactImage}
            />

            {/* Socials Selection */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Socials
              </label>

              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={(selectedOptions) => {
                  const selectedSocialIds = selectedOptions.map(
                    (option) => option.value
                  );
                  setFormData({ ...formData, socials: selectedSocialIds });
                }}
                value={socialData
                  .filter((social) => formData.socials.includes(social.id))
                  .map((social) => ({
                    label: social.name,
                    value: social.id,
                  }))}
                isMulti
                options={socialData.map((social) => ({
                  label: social.name,
                  value: social.id,
                  selected: formData.socials.includes(social.id),
                }))}
              />

              {renderError("socials")}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="col-span-2 w-full hover:bg-cyan-600 text-white bg-cyan-500 font-bold py-2 px-4 rounded focus:outline-none"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : formData.id
                ? "Update Contact"
                : "Create Contact"}
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

export default ContactSection;
