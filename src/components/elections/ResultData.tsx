import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";

interface Candidat {
  nom: string;
  parti: string;
  score: number;
  elu: boolean;
}

interface Rapport {
  titre: string;
  url: string;
}

interface Election {
  data: {
    id: string;
    nomPays: string;
    typeElection: string;
    dateElection: string;
    statut: string;
  };
}

interface Resultat {
  data: {
    Elections_id: string;
    participation: number;
    electeur: number;
    conteste: boolean;
    resultats?: string;
    source_url: string;
    source_résultats: string;
    defis?: string;
    candidats?: Candidat[];
    rapports?: Rapport[];
  };
}

interface ResultDataProps {
  election: Election;
  resultat: Resultat | undefined;
  formatNumber: (num: number) => string;
}

const ResultData: React.FC<ResultDataProps> = ({
  election,
  resultat,
  formatNumber,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-farafina-secondary text-white px-6 py-3 flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {election.data.nomPays} - {election.data.typeElection} (
          {new Date(election.data.dateElection).getFullYear()})
        </h3>
        <div className="flex space-x-2">
          <button
            className="p-2 bg-white/20 rounded hover:bg-white/30 transition-colors"
            title="Télécharger les résultats"
          >
            <FaDownload className="text-white" />
          </button>
          {resultat && (
            <a
              href={resultat.data.source_url}
              className="p-2 bg-white/20 rounded hover:bg-white/30 transition-colors"
              title="Voir les détails"
            >
              <FaExternalLinkAlt className="text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Informations générales */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="block text-sm text-gray-500">Date</span>
            <span className="font-medium">
              {new Date(election.data.dateElection).toLocaleDateString(
                "fr-FR",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Participation</span>
            <span className="font-medium">
              {resultat
                ? `${((resultat.data.participation / resultat.data.electeur) * 100).toFixed(2)}%`
                : "N/A"}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="block text-sm text-gray-500">Statut</span>
            <span
              className={`font-medium ${resultat?.data.conteste ? "text-farafina-accent" : "text-green-600"}`}
            >
              {resultat?.data.conteste
                ? "Résultats contestés"
                : "Résultats validés"}
            </span>
          </div>
        </div>

        {/* Résultats */}
        {resultat && (
          <div className="space-y-4">
            <h4 className="font-semibold text-farafina-dark mb-4">
              Résultats de l'élection
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Participation</span>
                  <div className="font-medium text-xl">
                    {formatNumber(resultat.data.participation)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">
                    Nombre d'électeurs
                  </span>
                  <div className="font-medium text-xl">
                    {formatNumber(resultat.data.electeur)}
                  </div>
                </div>
              </div>
              {resultat.data.resultats && (
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    Résultats détaillés
                  </span>
                  <div className="font-medium whitespace-pre-wrap">
                    {resultat.data.resultats}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <span className="text-sm text-gray-500">
                  Source des résultats
                </span>
                <div className="font-medium">
                  <a
                    href={resultat.data.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resultat.data.source_résultats}
                  </a>
                </div>
              </div>
            </div>

            {resultat.data.defis && (
              <div className="mt-4">
                <span className="text-sm text-gray-500">Défis Électoraux</span>
                <div className="font-medium">{resultat.data.defis}</div>
              </div>
            )}
          </div>
        )}

        {/* Résultats des candidats */}
        {resultat?.data.candidats && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-farafina-dark mb-4">
              Résultats par candidat
            </h4>
            {resultat.data.candidats.map((candidat, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4">
                    <span className="font-semibold text-farafina-dark">
                      {candidat.nom}
                      {candidat.elu && (
                        <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Élu
                        </span>
                      )}
                    </span>
                    <div className="text-sm text-gray-500">
                      {candidat.parti}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${candidat.score}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            candidat.elu
                              ? "bg-farafina-primary"
                              : "bg-farafina-secondary/70"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/4 text-right">
                    <span
                      className={`text-lg font-bold ${candidat.elu ? "text-farafina-primary" : "text-gray-700"}`}
                    >
                      {candidat.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rapports d'observation */}
        {resultat?.data.rapports && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-farafina-dark mb-4">
              Rapports d'observation
            </h4>
            <div className="flex flex-wrap gap-3">
              {resultat.data.rapports.map((rapport, index) => (
                <a
                  key={index}
                  href={rapport.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="mr-2">{rapport.titre}</span>
                  <FaDownload className="text-gray-600" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultData;
