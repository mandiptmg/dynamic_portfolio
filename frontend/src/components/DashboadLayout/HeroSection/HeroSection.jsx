/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";

const HeroSection = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { heroData } = useGlobalContext();
  const [formData, setFormData] = useState({
    id: heroData?.id || null,
    name: heroData?.name || "",
    position: heroData?.position || "",
    description: heroData?.description || "",
    image: heroData?.image || null,
    bgImage: heroData?.bgImage || null,
    imageURL: null,
    bgImageURL: null,
  });

  useEffect(() => {
    if (heroData) {
      setFormData({
        id: heroData.id || null,
        name: heroData.name || "",
        position: heroData.position || "",
        description: heroData.description || "",
        image: heroData.image || null,
        bgImage: heroData.bgImage || null,
      });
    }
  }, [heroData]);

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
          fieldName === "image" ? "Image" : "Background image"
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

  const bgImageDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, "bgImage"),
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
      if (key === "image" || key === "bgImage") {
        if (value instanceof File) {
          formPayload.append(key, value);
        }
      } else if (value) {
        formPayload.append(key, value);
      }
    });

    try {
      const response = await axiosInstance.post(`/hero/save`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { code, message } = response.data;

      if ([200, 201].includes(code)) {
        window.location.reload();
        toast.success(message || "Hero created/updated successfully");
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

  return (
    <div>
      <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
        <FaChevronRight className="text-cyan-500" /> Hero
      </h1>

      <div className="p-4 bg-white mt-4 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />

          <div className="grid md:grid-cols-2 gap-4">
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
                className={`mt-1 block w-full rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm text-gray-900 focus:ring-cyan-500`}
              />
              {errors.name && (
                <p className="text-red-600 text-xs">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Position"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.position ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm text-gray-900 focus:ring-cyan-500`}
              />
              {errors.position && (
                <p className="text-red-600 text-xs">{errors.position}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <JoditEditor
                value={formData.description}
                tabIndex={1}
                onBlur={handleEditorBlur}
                className="text-black jodit-editor"
              />
              {errors.description && (
                <p className="text-red-600 text-xs">{errors.description}</p>
              )}
            </div>

            {/* image  */}
            <ImageUploadSection
              dropzoneProps={imageDropzone.getRootProps()}
              inputProps={imageDropzone.getInputProps()}
              label="Image"
              image={formData.image || formData.imageURL}
              imageURL={formData.imageURL || formData.image}
              error={errors.image}
            />

            {/* Background image  */}
            <ImageUploadSection
              dropzoneProps={bgImageDropzone.getRootProps()}
              inputProps={bgImageDropzone.getInputProps()}
              label="Background Image"
              image={formData.bgImage || formData.bgImageURL}
              imageURL={formData.bgImageURL || formData.bgImage}
              error={errors.bgImage}
            />

            <button
              type="submit"
              className="col-span-2 w-full hover:bg-cyan-600 text-white bg-cyan-500 font-bold py-2 px-4 rounded focus:outline-none"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : formData.id
                ? "Update Hero"
                : "Create Hero"}
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

export default HeroSection;
