import React from "react";
import { FaVoteYea, FaCalendarAlt } from "react-icons/fa";

interface Election {
  data: {
    nomPays: string;
    dateElection: string;
    typeElection: string;
    code_pays: string;
  };
}

interface ElectionSectionProps {
  title: string;
  icon: "calendar" | "vote";
  elections: Election[];
  colorClass: string;
}

const ElectionSection: React.FC<ElectionSectionProps> = ({
  title,
  icon,
  elections,
  colorClass,
}) => {
  const today = new Date();
  const getIcon = () => {
    switch (icon) {
      case "calendar":
        return <FaCalendarAlt className="text-farafina-primary mr-3" />;
      case "vote":
        return <FaVoteYea className="text-farafina-blue mr-3" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-farafina-dark mb-6 flex items-center">
        {getIcon()}
        {title}
      </h2>
      <div className="space-y-4 grid grid-cols-2 gap-4">
        {elections.map((election) => {
          const electionDate = new Date(election.data.dateElection);
          const isUpcoming = electionDate >= today;

          return (
            <a
              key={election.data.code_pays + electionDate.toISOString()}
              href={`/countries/${election.data.code_pays.toLowerCase()}`}
              className={`block bg-white rounded-lg shadow-sm p-6 border-l-4 ${colorClass} hover:bg-gray-100 transition duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://flagcdn.com/w160/${election.data.code_pays.toLowerCase()}.webp`}
                    alt={`Drapeau ${election.data.nomPays}`}
                    className="w-8 h-6"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-farafina-dark">
                      {election.data.nomPays}
                    </h3>
                    <p
                      className={`text-lg font-medium ${isUpcoming ? "text-farafina-primary" : "text-farafina-blue"}`}
                    >
                      {election.data.typeElection}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-medium ${isUpcoming ? "text-farafina-primary" : "text-farafina-blue"}`}
                  >
                    {isUpcoming
                      ? electionDate.getFullYear()
                      : electionDate.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ElectionSection;
