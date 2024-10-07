import React from 'react';

interface ArchetypesWheelProps {
  primaryArchetype: string;
  secondaryArchetype: string;
  onPrimaryArchetypeChange: (archetype: string) => void;
  onSecondaryArchetypeChange: (archetype: string) => void;
}

const archetypes = [
  'The Hero',
  'The Magician',
  'The Outlaw',
  'The Sage',
  'The Explorer',
  'The Innocent',
  'The Creator',
  'The Ruler',
  'The Caregiver',
  'The Everyman',
  'The Jester',
  'The Lover',
];

const ArchetypesWheel: React.FC<ArchetypesWheelProps> = ({
  primaryArchetype,
  secondaryArchetype,
  onPrimaryArchetypeChange,
  onSecondaryArchetypeChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Brand Archetypes</h3>
      <svg viewBox="0 0 200 200" className="w-full max-w-md mx-auto">
        {archetypes.map((archetype, index) => {
          const angle = (index / archetypes.length) * 2 * Math.PI;
          const x = 100 + 80 * Math.cos(angle);
          const y = 100 + 80 * Math.sin(angle);

          return (
            <g key={archetype}>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill={primaryArchetype === archetype ? 'black' : 'white'}
                stroke="black"
                strokeWidth="2"
                onClick={() => onPrimaryArchetypeChange(archetype)}
                className="cursor-pointer"
              />
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fontSize="8"
                className="select-none"
              >
                {archetype}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="space-y-2">
        <div>
          <label htmlFor="primaryArchetype" className="block text-sm font-medium">
            Primary Archetype
          </label>
          <select
            id="primaryArchetype"
            value={primaryArchetype}
            onChange={(e) => onPrimaryArchetypeChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select primary archetype</option>
            {archetypes.map((archetype) => (
              <option key={archetype} value={archetype}>
                {archetype}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="secondaryArchetype" className="block text-sm font-medium">
            Secondary Archetype (Optional)
          </label>
          <select
            id="secondaryArchetype"
            value={secondaryArchetype}
            onChange={(e) => onSecondaryArchetypeChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select secondary archetype</option>
            {archetypes.map((archetype) => (
              <option key={archetype} value={archetype}>
                {archetype}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArchetypesWheel;