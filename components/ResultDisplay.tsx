import React from 'react';
import { useBrandForm } from '../contexts/BrandFormContext';
import ColorPalette from '@/components/ColorPalette';
import FontPairing from '@/components/FontPairing';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface ResultDisplayProps {
  onGoBack: () => void;
  onStartOver: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ onGoBack, onStartOver }) => {
  const { formState } = useBrandForm();

  // Placeholder data (replace with actual data from API later)
  const placeholderData = {
    brandPersona: 'Innovative and trustworthy',
    toneOfVoice: 'Professional with a friendly touch',
    colorPalette: ['#FF5733', '#33FF57', '#3357FF'],
    fontPairing: {
      headingFont: 'Montserrat',
      bodyFont: 'Open Sans',
    },
  };

  return (
    <>
      <div className="flex justify-between mb-8">
        <button
          onClick={onGoBack}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2 inline" />
          Go Back
        </button>
        <button
          onClick={onStartOver}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <RotateCcw className="w-4 h-4 mr-2 inline" />
          Start Over
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Your Brand Identity</h2>
        <div>
          <h3 className="text-xl font-semibold">Brand Information</h3>
          <p>
            <strong>Name:</strong> {formState.brandName}
          </p>
          <p>
            <strong>Business Description:</strong> {formState.businessDescription}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Brand Persona</h3>
          <p>{placeholderData.brandPersona}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Tone of Voice</h3>
          <p>{placeholderData.toneOfVoice}</p>
        </div>
        <ColorPalette colors={placeholderData.colorPalette} />
        <FontPairing fonts={placeholderData.fontPairing} />
      </div>
    </>
  );
};

export default ResultDisplay;