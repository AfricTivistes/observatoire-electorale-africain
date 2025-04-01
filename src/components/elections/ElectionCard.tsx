import React from 'react';


interface ElectionCardProps {
  election: {
    id: string;
    country: string;
    type: string;
    date: string;
    status: string;
    candidates?: number;
    observingOrgs?: number;
  };
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-africa-accent">
      <div className="flex flex-col space-y-3">
        {/* Country Header */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-africa-primary">{election.country}</span>
        </div>
        
        {/* Election Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Date Section */}
          <div>
            <span className="text-sm text-gray-600">Date</span>
            <div className="font-medium">{formatDate(election.date)}</div>
          </div>
          
          {/* Type Section */}
          <div>
            <span className="text-sm text-gray-600">Type</span>
            <div className="font-medium">{election.type}</div>
          </div>
          
          {/* Candidates Section */}
          <div>
            <span className="text-sm text-gray-600">Candidats</span>
            <div className="font-medium">{election.candidates}</div>
          </div>
          
          {/* Status Section */}
          <div>
            <span className="text-sm text-gray-600">Statut</span>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-medium">{election.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;