import type React from "react"
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa"

interface Election {
  id: string
  country: string
  type: string
  date: string
  status: string
  flagCode: string
}

const upcomingElections: Election[] = [
  {
    id: "dz-2024",
    country: "Algérie",
    type: "Présidentielle",
    date: "2024-04-15",
    status: "À venir",
    flagCode: "dz",
  },
  {
    id: "ma-2024",
    country: "Maroc",
    type: "Législative",
    date: "2024-09-20",
    status: "En préparation",
    flagCode: "ma",
  },
  {
    id: "ke-2024",
    country: "Kenya",
    type: "Locales",
    date: "2024-08-05",
    status: "Planification",
    flagCode: "ke",
  },
]

const UpcomingElectionsSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center text-farafina-primary font-medium mb-2">
              <FaCalendarAlt className="mr-2" />
              <span>Calendrier Électoral</span>
            </div>
            <h2 className="text-3xl font-bold text-farafina-dark">Prochaines Élections</h2>
          </div>
          <a
            href="/elections"
            className="inline-flex items-center text-farafina-primary font-medium mt-4 md:mt-0 hover:text-farafina-primary/80 transition-colors"
          >
            Voir toutes les élections
            <FaArrowRight className="ml-2 text-sm" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingElections.map((election) => (
            <div
              key={election.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-5px] overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://flagcdn.com/48x36/${election.flagCode}.png`}
                    alt={`Drapeau ${election.country}`}
                    className="w-8 h-6 mr-3"
                  />
                  <h3 className="text-xl font-semibold text-farafina-dark">{election.country}</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{election.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{formatDate(election.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <span className="px-2 py-1 bg-farafina-primary/10 text-farafina-primary text-sm rounded-full">
                      {election.status}
                    </span>
                  </div>
                </div>

                <a
                  href={`/elections/${election.id}`}
                  className="block w-full py-2 text-center border border-farafina-primary text-farafina-primary rounded-lg hover:bg-farafina-primary hover:text-white transition-colors"
                >
                  Détails
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingElectionsSection

