
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

interface Election {
  data: {
    nomPays: string;
    dateElection: string;
    typeElection: string;
    code_pays: string;
  };
}

interface YearTimelineProps {
  elections: Election[];
}

const YearTimeline: React.FC<YearTimelineProps> = ({ elections }) => {
  const currentYear = new Date().getFullYear();
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const electionsByMonth = months.map(month => {
    const monthElections = elections.filter(election => {
      const electionDate = new Date(election.data.dateElection);
      return electionDate.getMonth() === months.indexOf(month) &&
             electionDate.getFullYear() === currentYear;
    });
    return { month, elections: monthElections };
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-farafina-primary">
        <FaCalendarAlt className="mr-3" />
        Timeline Électorale {currentYear}
      </h2>
      
      <div className="space-y-4">
        {electionsByMonth.map((monthData, index) => (
          <div key={index} className="relative">
            <div className="flex items-start">
              <div className="min-w-[120px] font-medium text-gray-600">
                {monthData.month}
              </div>
              
              <div className="flex-grow">
                {monthData.elections.length > 0 ? (
                  <div className="space-y-3">
                    {monthData.elections.map((election, idx) => (
                      <div key={idx} className="bg-farafina-primary/5 rounded-lg p-4 border-l-4 border-farafina-primary">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={`https://flagcdn.com/32x24/${election.data.code_pays.toLowerCase()}.png`}
                              alt={`Drapeau ${election.data.nomPays}`}
                              className="w-8 h-6"
                            />
                            <div>
                              <h3 className="font-semibold text-farafina-dark">
                                {election.data.nomPays}
                              </h3>
                              <p className="text-sm text-farafina-primary">
                                {election.data.typeElection}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(election.data.dateElection).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-12 flex items-center">
                    <span className="text-gray-400 text-sm">Aucune élection prévue</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearTimeline;
