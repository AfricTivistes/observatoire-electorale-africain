import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Challenge {
  country: string;
  type: string;
  description: string;
  status: string;
}

interface ElectionChallengesWidgetProps {
  challenges: Challenge[];
}

const ElectionChallengesWidget: React.FC<ElectionChallengesWidgetProps> = ({ challenges }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critique': return 'bg-red-100 text-red-800';
      case 'en cours': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <FaExclamationTriangle className="mr-3 text-3xl text-red-500" />
        <h2 className="text-2xl font-bold text-africa-primary">
          Défis Électoraux
        </h2>
      </div>
      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div key={index} className="border-l-4 border-red-200 pl-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-africa-primary">{challenge.country}</h3>
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(challenge.status)}`}>
                {challenge.status}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-1">{challenge.type}</p>
            <p className="text-sm text-gray-500 mt-1">{challenge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionChallengesWidget;