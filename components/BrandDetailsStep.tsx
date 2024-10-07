import React from 'react';
import FormField from '@/components/FormField';
import BusinessDescriptionField from '@/components/BusinessDescriptionField';
import FileUpload from '@/components/FileUpload';
import LogoUpload from '@/components/LogoUpload';
import { BrandFormState } from '@/contexts/BrandFormContext';

interface BrandDetailsStepProps {
  formState: BrandFormState;
  updateFormState: <K extends keyof BrandFormState>(field: K, value: BrandFormState[K]) => void;
  errors: Record<string, string>;
}

const BrandDetailsStep: React.FC<BrandDetailsStepProps> = ({
  formState,
  updateFormState,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Brand Details</h3>
      <FormField
        label="Brand Name"
        id="brandName"
        value={formState.brandName}
        onChange={(value) => updateFormState('brandName', value)}
        error={errors.brandName}
      />
      <BusinessDescriptionField
        value={formState.businessDescription}
        onChange={(value) => updateFormState('businessDescription', value)}
        error={errors.businessDescription}
      />
      <FileUpload
        onFileUpload={(file) => updateFormState('businessDetailsFile', file)}
      />
      <LogoUpload
        onLogoUpload={(file) => updateFormState('logoFile', file)}
        onGenerateLogoChange={(value) => updateFormState('generateLogo', value)}
      />
    </div>
  );
};

export default BrandDetailsStep;