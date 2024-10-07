import React from 'react';

interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Color Palette</h3>
      <div className="flex space-x-4">
        {colors.map((color, index) => (
          <div key={index} className="text-center">
            <div
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <p className="mt-1 text-sm">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;