import React, { useState, lazy, Suspense } from 'react';
import { BrandFormProvider, useBrandForm } from '@/contexts/BrandFormContext';
import BrandForm from '@/components/BrandForm';
import ErrorBoundary from '@/components/ErrorBoundary';

const ResultDisplay = lazy(() => import('./ResultDisplay'));
const PDFButton = lazy(() => import('./PDFButton'));

function BrandIdentityGeneratorContent() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { updateFormState } = useBrandForm();

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  const handleGoBack = () => {
    setIsFormSubmitted(false);
  };

  const handleStartOver = () => {
    setIsFormSubmitted(false);
    // Reset form state
    updateFormState('brandName', '');
    updateFormState('businessDescription', '');
    updateFormState('businessDetailsFile', null);
    updateFormState('logoFile', null);
    updateFormState('generateLogo', false);
    updateFormState('toneOfVoice', {
      Humor: '',
      Formality: '',
      Attitude: '',
      Energy: '',
    });
    updateFormState('primaryArchetype', '');
    updateFormState('secondaryArchetype', '');
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Brand Identity Generator</h1>
      {!isFormSubmitted ? (
        <BrandForm onSubmit={handleFormSubmit} />
      ) : (
        <Suspense fallback={<div>Loading results...</div>}>
          <ResultDisplay onGoBack={handleGoBack} onStartOver={handleStartOver} />
          <PDFButton />
        </Suspense>
      )}
    </div>
  );
}

export default function BrandIdentityGenerator() {
  return (
    <ErrorBoundary>
      <BrandFormProvider>
        <BrandIdentityGeneratorContent />
      </BrandFormProvider>
    </ErrorBoundary>
  );
}