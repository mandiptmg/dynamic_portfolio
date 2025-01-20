/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { axiosInstance } from "../../../Api/Axios";
import { useGlobalContext } from "../../../context/Context";

import Select from "react-select";

import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AboutSection = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { aboutData, skillData } = useGlobalContext();

  const [formData, setFormData] = useState({
    id: aboutData?.id || "",
    title: aboutData?.title || "",
    description: aboutData?.description || "",
    resume: aboutData?.resume || "",
    firstImage: aboutData?.firstImage || "",
    secondImage: aboutData?.secondImage || "",
    subSkillTitle: aboutData?.subSkillTitle || "",
    projectInquiry: aboutData?.projectInquiry || "",
    inquiryDescription: aboutData?.inquiryDescription || "",
    skills: aboutData?.skills?.map((skill) => skill.id) || [],
    firstImageURL: "",
    secondImageURL: "",
  });


  useEffect(() => {
    if (aboutData) {
      setFormData((prev) => ({
        ...prev,
        ...aboutData,
        skills: aboutData.skills?.map((skill) => skill.id) || [],
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
          fieldName === "firstImage" ? "First Image" : "Second image"
        } uploaded successfully!`
      );
    } else {
      toast.error("No file uploaded!");
    }
  }, []);

  const imageDropzone = useDropzone({
    onDrop: (files) => handleFileDrop(files, "firstImage"),
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
      if (["firstImage", "secondImage", "resume"].includes(key)) {
        // Handle File objects
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
      const response = await axiosInstance.post("/about/save", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { code, message } = response.data;

      if ([200, 201].includes(code)) {
        setTimeout(() => window.location.reload(), 1000);
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

  return (
    <div>
      <h1 className="text-lg capitalize font-semibold flex items-center gap-1">
        <FaChevronRight className="text-cyan-500" /> About
      </h1>

      <div className="p-4 bg-white mt-4 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />

          <div className="grid md:grid-cols-2 gap-4">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("title")}
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Resume :
                {formData.resume && (
                  <span>
                    <a
                      className="text-green-400 px-4 pr-4 "
                      href={formData.resume}
                    >
                      (Open)
                    </a>
                  </span>
                )}
              </label>
              <input
                type="file"
                name="resume"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    resume: e.target.files[0],
                  }))
                }
                className={`mt-1 block w-full rounded-lg border ${
                  errors.resume ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("resume")}
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

            {/* Sub Skill Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub Skill Title
              </label>
              <input
                type="text"
                name="subSkillTitle"
                value={formData.subSkillTitle}
                onChange={handleInputChange}
                placeholder="Enter sub-skill title"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.subSkillTitle ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("subSkillTitle")}
            </div>

            {/* Project Inquiry */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Project Inquiry
              </label>
              <input
                type="text"
                name="projectInquiry"
                value={formData.projectInquiry}
                onChange={handleInputChange}
                placeholder="Enter project inquiry"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.projectInquiry ? "border-red-500" : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("projectInquiry")}
            </div>

            {/* Inquiry Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Inquiry Description
              </label>
              <textarea
                name="inquiryDescription"
                value={formData.inquiryDescription}
                onChange={handleInputChange}
                placeholder="Enter inquiry description"
                className={`mt-1 block w-full rounded-lg border ${
                  errors.inquiryDescription
                    ? "border-red-500"
                    : "border-gray-300"
                } py-1.5 px-3 text-sm`}
              />
              {renderError("inquiryDescription")}
            </div>

            {/* Image Upload */}
            <ImageUploadSection
              dropzoneProps={imageDropzone.getRootProps()}
              inputProps={imageDropzone.getInputProps()}
              label="First Image"
              image={formData.firstImage || formData.firstImageURL}
              imageURL={formData.firstImageURL || formData.firstImage}
              error={errors.firstImage}
            />

            {/* Background Image Upload */}
            <ImageUploadSection
              dropzoneProps={secondImageDropzone.getRootProps()}
              inputProps={secondImageDropzone.getInputProps()}
              label="Second Image"
              image={formData.secondImage || formData.secondImageURL}
              imageURL={formData.secondImageURL || formData.secondImage}
              error={errors.secondImage}
            />

            {/* Skills Selection */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={(selectedOptions) => {
                  const selectedSkillIds = selectedOptions.map(
                    (option) => option.value
                  );
                  setFormData({ ...formData, skills: selectedSkillIds });
                }}
                value={skillData
                  .filter((skill) => formData.skills.includes(skill.id))
                  .map((skill) => ({
                    label: skill.name,
                    value: skill.id,
                  }))}
                isMulti
                options={skillData.map((skill) => ({
                  label: skill.name,
                  value: skill.id,
                  selected: formData.skills.includes(skill.id),
                }))}
              />

              {renderError("skills")}
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
