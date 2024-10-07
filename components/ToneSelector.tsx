import React from 'react';

interface ToneOfVoice {
  Humor: string;
  Formality: string;
  Attitude: string;
  Energy: string;
}

const toneOptions = [
  { 
    dimension: 'Humor', 
    options: ['Funny', 'Witty', 'Neutral', 'Serious', 'Dry'],
    emojis: ['😄', '😐']
  },
  { 
    dimension: 'Formality', 
    options: ['Casual', 'Friendly', 'Neutral', 'Professional', 'Formal'],
    emojis: ['👕', '🎩']
  },
  { 
    dimension: 'Attitude', 
    options: ['Irreverent', 'Edgy', 'Neutral', 'Frank', 'Respectful'],
    emojis: ['😏', '🤝']
  },
  { 
    dimension: 'Energy', 
    options: ['Enthusiastic', 'Upbeat', 'Neutral', 'Conservative', 'Matter-of-fact'],
    emojis: ['⭐', '📊']
  },
];

interface ToneSelectorProps {
  selectedTones: ToneOfVoice;
  onToneChange: (dimension: keyof ToneOfVoice, value: string) => void;
  error?: string;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTones, onToneChange, error }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Tone of Voice Dimensions</h3>
      {toneOptions.map(({ dimension, options, emojis }) => (
        <div key={dimension} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl" role="img" aria-label={`${dimension} start`}>
              {emojis[0]}
            </span>
            <div className="flex-1 mx-4 flex flex-wrap justify-center">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => onToneChange(dimension as keyof ToneOfVoice, option)}
                  className={`px-3 py-1 m-1 text-sm rounded-full ${
                    selectedTones[dimension as keyof ToneOfVoice] === option
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-black'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="text-2xl" role="img" aria-label={`${dimension} end`}>
              {emojis[1]}
            </span>
          </div>
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ToneSelector;