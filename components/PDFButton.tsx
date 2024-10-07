import React from 'react';
import { FileDown } from 'lucide-react';

const PDFButton: React.FC = () => {
  const handleGeneratePDF = () => {
    console.log('Generating PDF...');
    // TODO: Implement actual PDF generation logic
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="fixed bottom-8 right-8 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center shadow-lg"
    >
      <FileDown className="w-5 h-5 mr-2" />
      Generate PDF
    </button>
  );
};

export default PDFButton;