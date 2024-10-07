import React, { useState, useEffect } from 'react';
import { useBrandForm } from '@/contexts/BrandFormContext';
import ToneSelector from '@/components/ToneSelector';
import ArchetypesWheel from '@/components/ArchetypesWheel';
import BrandDetailsStep from '@/components/BrandDetailsStep';
import ProgressBar from '@/components/ProgressBar';

interface BrandFormProps {
  onSubmit: () => void;
}

export default function BrandForm({ onSubmit }: BrandFormProps) {
  const { formState, updateFormState, updateToneOfVoice } = useBrandForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  useEffect(() => {
    console.log('Current step:', currentStep);
    console.log('Form state:', formState);
  }, [currentStep, formState]);

  const validateBrandDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.brandName) newErrors.brandName = 'Brand name is required';
    if (!formState.businessDescription) newErrors.businessDescription = 'Business description is required';
    return newErrors;
  };

  const validateToneOfVoice = () => {
    const newErrors: Record<string, string> = {};
    const { Humor, Formality, Attitude, Energy } = formState.toneOfVoice;
    if (!Humor || !Formality || !Attitude || !Energy) {
      newErrors.toneOfVoice = 'Please select a tone for each dimension';
    }
    return newErrors;
  };

  const validateArchetypes = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.primaryArchetype) newErrors.primaryArchetype = 'Primary archetype is required';
    return newErrors;
  };

  const validateStep = (step: number) => {
    let newErrors: Record<string, string> = {};
    switch (step) {
      case 1:
        newErrors = validateBrandDetails();
        break;
      case 2:
        newErrors = validateToneOfVoice();
        break;
      case 3:
        newErrors = validateArchetypes();
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log('Attempting to move to next step');
    setAttemptedNext(true);
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      setAttemptedNext(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setAttemptedNext(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    console.log('Form submitted');
    setIsSubmitting(true);
    setAttemptedNext(true);
    if (validateStep(currentStep)) {
      if (currentStep === totalSteps) {
        onSubmit();
      } else {
        handleNext();
      }
    }
    setIsSubmitting(false);
  };

  const handleToneChange = (dimension: keyof typeof formState.toneOfVoice, value: string) => {
    console.log(`Tone changed: ${dimension} - ${value}`);
    updateToneOfVoice(dimension, value);
    // Ensure we don't automatically progress or submit
    setAttemptedNext(false);
  };

  const renderNavigationButtons = () => (
    <div className="mt-8 flex justify-between">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handlePrevious}
          className="px-4 py-2 border border-black rounded-md hover:bg-gray-100"
        >
          Previous
        </button>
      )}
      <button
        type="button" // Changed from 'submit' to 'button'
        onClick={handleSubmit}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        disabled={isSubmitting}
      >
        {currentStep < totalSteps ? 'Next' : 'Generate Brand Identity'}
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto"> {/* Changed from 'form' to 'div' */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <BrandDetailsStep
          formState={formState}
          updateFormState={updateFormState}
          errors={attemptedNext ? errors : {}}
        />
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <ToneSelector
            selectedTones={formState.toneOfVoice}
            onToneChange={handleToneChange}
          />
          {attemptedNext && errors.toneOfVoice && (
            <p className="text-red-500 text-sm mt-1">{errors.toneOfVoice}</p>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <ArchetypesWheel
            primaryArchetype={formState.primaryArchetype}
            secondaryArchetype={formState.secondaryArchetype}
            onPrimaryArchetypeChange={(value) => updateFormState('primaryArchetype', value)}
            onSecondaryArchetypeChange={(value) => updateFormState('secondaryArchetype', value)}
          />
          {attemptedNext && errors.primaryArchetype && (
            <p className="text-red-500 text-sm mt-1">{errors.primaryArchetype}</p>
          )}
        </div>
      )}

      {renderNavigationButtons()}
    </div>
  );
}