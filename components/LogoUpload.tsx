import React, { useRef, useState } from 'react';
import { CustomCheckbox } from "@/components/CustomCheckbox";

interface LogoUploadProps {
  onLogoUpload: (file: File) => void;
  onGenerateLogoChange: (checked: boolean) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  onLogoUpload,
  onGenerateLogoChange,
}) => {
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [generateLogo, setGenerateLogo] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedLogo(file);
      setGenerateLogo(false);
      onLogoUpload(file);
      onGenerateLogoChange(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedLogo(file);
      setGenerateLogo(false);
      onLogoUpload(file);
      onGenerateLogoChange(false);
    }
  };

  const handleGenerateLogoChange = (checked: boolean) => {
    setGenerateLogo(checked);
    onGenerateLogoChange(checked);
    if (checked) {
      setUploadedLogo(null);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Upload brand logo (optional)</label>
      <div
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="logoUpload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="logoUpload"
                name="logoUpload"
                type="file"
                ref={logoInputRef}
                className="sr-only"
                onChange={handleLogoUpload}
                accept="image/*"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG or JPG up to 10MB</p>
        </div>
      </div>
      {uploadedLogo && <p className="mt-2 text-sm text-gray-500">Uploaded: {uploadedLogo.name}</p>}
      <div className="flex items-center space-x-2 mt-4">
        <CustomCheckbox
          id="generateLogo"
          checked={generateLogo}
          onCheckedChange={handleGenerateLogoChange}
        />
        <label
          htmlFor="generateLogo"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Generate logo for me
        </label>
      </div>
    </div>
  );
};

export default LogoUpload;