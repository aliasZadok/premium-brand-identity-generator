import React from 'react';

interface BusinessDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const BusinessDescriptionField: React.FC<BusinessDescriptionFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <label htmlFor="businessDescription" className="block text-sm font-medium">
        Describe your business and target audience
      </label>
      <div className="relative">
        <textarea
          id="businessDescription"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={2000}
          placeholder="e.g., We sell handmade jewellery to women aged 25-45 interested in fashion and sustainability."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={4}
        />
        <span className="absolute bottom-2 right-2 text-sm text-gray-500">
          {value.length}/2000
        </span>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default BusinessDescriptionField;