import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.txt"
          className="hidden"
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload PDF/TXT
        </label>
        {uploadedFileName && <span className="ml-3 text-sm">{uploadedFileName}</span>}
      </div>
    </div>
  );
};

export default FileUpload;