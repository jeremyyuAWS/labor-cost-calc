import React from 'react';

interface ScenarioCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ 
  title, 
  description, 
  onClick 
}) => {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ScenarioCard;