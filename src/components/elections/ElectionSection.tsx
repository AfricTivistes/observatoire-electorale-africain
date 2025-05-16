import React from 'react';
import { FaVoteYea, FaCalendarAlt } from 'react-icons/fa';

interface Election {
  id: string;
  date_élection: string;
  type_élection: string;
  nom_pays: string;
  statut: string;
  code_pays: string;
}

interface ElectionSectionProps {
  title: string;
  status: string;
  icon: 'calendar' | 'vote';
  elections: Election[];
  colorClass: string;
}

const ElectionSection: React.FC<ElectionSectionProps> = ({ title, status, icon, elections, colorClass }) => {
  const getIcon = () => {
    switch (icon) {
      case 'calendar':
        return <FaCalendarAlt className="text-farafina-primary mr-3" />;
      case 'vote':
        return <FaVoteYea className="text-farafina-secondary mr-3" />;
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-farafina-dark mb-6 flex items-center">
        {getIcon()}
        {title}
      </h2>
      <div className="space-y-4">
        {elections
          .filter(election => election.statut === status)
          .map(election => (
            <div key={election.id} className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${colorClass}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={`/images/flags/${election.data.code_pays.toLowerCase()}.svg`}
                    alt={`Drapeau ${election.data.nomPays}`}
                    className="w-8 h-6"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-farafina-dark">{election.data.nomPays}</h3>
                    <p className="text-farafina-secondary">{election.data.typeElection}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-medium ${status === "À venir" ? "text-farafina-primary" : "text-farafina-secondary"}`}>
                    {new Date(election.data.dateElection).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ElectionSection;