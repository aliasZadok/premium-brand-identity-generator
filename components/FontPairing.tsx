import React from 'react';

interface FontPairingProps {
  fonts: {
    headingFont: string;
    bodyFont: string;
  };
}

const FontPairing: React.FC<FontPairingProps> = ({ fonts }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Font Pairing</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Heading Font</p>
          <p className="text-2xl" style={{ fontFamily: fonts.headingFont }}>
            {fonts.headingFont}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Body Font</p>
          <p className="text-lg" style={{ fontFamily: fonts.bodyFont }}>
            {fonts.bodyFont}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FontPairing;