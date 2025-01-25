/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";

const SettingSection = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { siteSettingData } = useGlobalContext();

  const [formData, setFormData] = useState({
    id: siteSettingData?.id || "",
    footer: siteSettingData?.footer || "",
    portfolioCover: siteSettingData?.portfolioCover || "",
    aboutCover: siteSettingData?.aboutCover || "",
    favicon: siteSettingData?.favicon || "",
    logo: siteSettingData?.logo || "",
    contactCover: siteSettingData?.contactCover || "",
    contactURL: "",
    logoURL: "",
    faviconURL: "",
    portfolioURL: "",
    aboutURL: "",
  });

  useEffect(() => {
    if (siteSettingData) {
      setFormData((prev) => ({
        ...prev,
        ...siteSettingData,
      }));
    }
  }, [siteSettingData]);

  console.log(formData);

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

  const useCreateDropzone = (fieldName) => {
    return useDropzone({
      onDrop: (files) => handleFileDrop(files, fieldName),
      accept: "image/*",
      maxFiles: 1,
    });
  };

  const handleEditorBlur = (content) => {
    setFormData((prev) => ({ ...prev, footer: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (
        [
          "logo",
          "favicon",
          "contactCover",
          "aboutCover",
          "portfolioCover",
        ].includes(key)
      ) {
        if (value instanceof File) {
          formPayload.append(key, value);
        }
      } else {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.post(
        `/site-settings/save`,
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
        toast.success(message || "Site setting created/updated successfully");
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

  const dropzones = {
    logo: useCreateDropzone("logo"),
    favicon: useCreateDropzone("favicon"),
    contactCover: useCreateDropzone("contactCover"),
    aboutCover: useCreateDropzone("aboutCover"),
    portfolioCover: useCreateDropzone("portfolioCover"),
  };

  return (
    <div>
      <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
        <FaChevronRight className="text-cyan-500" /> Site Setting
      </h1>

      <div className="p-4 bg-white mt-4 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />

          <div className="grid md:grid-cols-2 gap-4">
            {/* image upload section  */}
            {[
              "logo",
              "favicon",
              "contactCover",
              "aboutCover",
              "portfolioCover",
            ].map((field) => (
              <ImageUploadSection
                key={field}
                dropzoneProps={dropzones[field].getRootProps()}
                inputProps={dropzones[field].getInputProps()}
                label={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")
                }
                image={formData[field] || formData[`${field}URL`]}
                imageURL={formData[`${field}URL`] || formData[field]}
                error={errors[field]}
              />
            ))}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Footer
              </label>
              <JoditEditor
                value={formData.footer}
                tabIndex={1}
                onBlur={handleEditorBlur}
                className="text-black jodit-editor"
              />
              {errors.footer && (
                <p className="text-red-600 text-xs">{errors.footer}</p>
              )}
            </div>
            <button
              type="submit"
              className="col-span-2 w-full hover:bg-cyan-600 text-white bg-cyan-500 font-bold py-2 px-4 rounded focus:outline-none"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : formData.id
                ? "Update Setting"
                : "Create Setting"}
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
      } bg-white`}
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

export default SettingSection;
