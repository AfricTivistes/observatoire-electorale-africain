import React from "react";
import { FaVoteYea, FaCalendarAlt } from "react-icons/fa";

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
  icon: "calendar" | "vote";
  elections: Election[];
  colorClass: string;
  filters?: {
    year?: string;
    type?: string;
    region?: string;
  };
}

const ElectionSection: React.FC<ElectionSectionProps> = ({
  title,
  status,
  icon,
  elections,
  colorClass,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "calendar":
        return <FaCalendarAlt className="text-farafina-blue mr-3" />;
      case "vote":
        return <FaVoteYea className="text-farafina-primary mr-3" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-farafina-blue mb-6 flex items-center">
        {getIcon()}
        {title}
      </h2>
      <div className="space-y-4">
        {elections.map((election, index) => (
          <div
            key={`${election.data.code_pays}-${election.data.dateElection}-${index}`}
            className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${colorClass}`}
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
                    <a
                      href={`/countries/${election.data.code_pays.toLowerCase()}`}
                    >
                      {election.data.nomPays}
                    </a>
                  </h3>
                  <p
                    className={`text-lg font-medium ${status === "À venir" ? "text-farafina-blue" : "text-farafina-primary"}`}
                  >
                    {election.data.typeElection}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-medium ${status === "À venir" ? "text-farafina-blue" : "text-farafina-primary"}`}
                >
                  {status === "À venir"
                    ? new Date(election.data.dateElection).getFullYear()
                    : new Date(election.data.dateElection).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
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
