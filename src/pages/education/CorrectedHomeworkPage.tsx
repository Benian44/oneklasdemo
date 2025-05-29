import React, { useState } from 'react';
import CorrectedHomework from '../../components/homework/CorrectedHomework';

const levels = [
  '6ème',
  '5ème',
  '4ème',
  '3ème',
  '2nde',
  '1ère',
  'Terminale'
];

const CorrectedHomeworkPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Devoirs Corrigés</h1>
      
      <div className="mb-8">
        <label htmlFor="level-select" className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner un niveau
        </label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="block w-full max-w-xs rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <CorrectedHomework level={selectedLevel} />
    </div>
  );
};

export default CorrectedHomeworkPage; 