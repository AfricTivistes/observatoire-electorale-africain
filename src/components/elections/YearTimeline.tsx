
import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";

interface Election {
  data: {
    nomPays: string;
    dateElection: string;
    typeElection: string;
    code_pays: string;
    region: string;
  };
}

interface YearTimelineProps {
  elections: Election[];
  filters?: {
    year?: string;
    type?: string;
    region?: string;
  };
}

const YearTimeline: React.FC<YearTimelineProps> = ({ elections, filters }) => {
  const [filteredElections, setFilteredElections] = useState(elections);
  const currentYear = new Date().getFullYear();
  
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  useEffect(() => {
    let filtered = [...elections];
    
    if (filters) {
      if (filters.year) {
        filtered = filtered.filter(election => 
          new Date(election.data.dateElection).getFullYear().toString() === filters.year
        );
      }
      if (filters.type) {
        filtered = filtered.filter(election => 
          election.data.typeElection === filters.type
        );
      }
      if (filters.region) {
        filtered = filtered.filter(election => 
          election.data.region === filters.region
        );
      }
    }
    
    setFilteredElections(filtered);
  }, [elections, filters]);

  const electionsByMonth = months.map(month => {
    const monthElections = filteredElections.filter(election => {
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
        Calendrier Électorale {currentYear}
      </h2>

      <div className="space-y-4">
        {electionsByMonth
          .filter(monthData => monthData.elections.length > 0)
          .map((monthData, index) => (
            <div key={index} className="relative">
              <div className="flex items-start">
                <div className="min-w-[120px] font-medium text-gray-600">
                  {monthData.month}
                </div>

                <div className="flex-grow">
                  <div className="space-y-3">
                    {monthData.elections.map((election, idx) => (
                      <div
                        key={`${election.data.code_pays}-${idx}`}
                        className="bg-farafina-primary/5 rounded-lg p-4 border-l-4 border-farafina-primary"
                      >
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
                            {new Date(election.data.dateElection).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default YearTimeline;
