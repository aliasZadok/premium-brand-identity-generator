import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToneOfVoice {
  Humor: string;
  Formality: string;
  Attitude: string;
  Energy: string;
}

export interface BrandFormState {
  brandName: string;
  businessDescription: string;
  businessDetailsFile: File | null;
  logoFile: File | null;
  generateLogo: boolean;
  toneOfVoice: ToneOfVoice;
  primaryArchetype: string;
  secondaryArchetype: string;
}

export interface BrandFormContextType {
  formState: BrandFormState;
  updateFormState: <K extends keyof BrandFormState>(field: K, value: BrandFormState[K]) => void;
  updateToneOfVoice: (dimension: keyof ToneOfVoice, value: string) => void;
}

const BrandFormContext = createContext<BrandFormContextType | undefined>(undefined);

export const useBrandForm = () => {
  const context = useContext(BrandFormContext);
  if (!context) {
    throw new Error('useBrandForm must be used within a BrandFormProvider');
  }
  return context;
};

export const BrandFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<BrandFormState>({
    brandName: '',
    businessDescription: '',
    businessDetailsFile: null,
    logoFile: null,
    generateLogo: false,
    toneOfVoice: {
      Humor: '',
      Formality: '',
      Attitude: '',
      Energy: '',
    },
    primaryArchetype: '',
    secondaryArchetype: '',
  });

  const updateFormState = <K extends keyof BrandFormState>(field: K, value: BrandFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const updateToneOfVoice = (dimension: keyof ToneOfVoice, value: string) => {
    setFormState((prev) => ({
      ...prev,
      toneOfVoice: {
        ...prev.toneOfVoice,
        [dimension]: value,
      },
    }));
  };

  return (
    <BrandFormContext.Provider value={{ formState, updateFormState, updateToneOfVoice }}>
      {children}
    </BrandFormContext.Provider>
  );
};