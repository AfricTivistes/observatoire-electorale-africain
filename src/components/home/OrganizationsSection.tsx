import type React from "react"
import { FaUsers, FaArrowRight } from "react-icons/fa"

interface Organization {
  id: string
  name: string
  country: string
  expertise: string[]
  logo?: string
}

const organizations: Organization[] = [
  {
    id: "obs-dz-001",
    name: "Observatoire National des Élections (ONEC)",
    country: "Algérie",
    expertise: ["Observation Électorale", "Transparence", "Formation Civique"],
    logo: "/images/organizations/onec-logo.svg",
  },
  {
    id: "obs-ma-001",
    name: "Centre Marocain pour l'Observation Électorale",
    country: "Maroc",
    expertise: ["Monitoring Électoral", "Analyse Politique", "Éducation Civique"],
    logo: "/images/organizations/cmoe-logo.svg",
  },
  {
    id: "obs-ke-001",
    name: "Kenya Election Watch",
    country: "Kenya",
    expertise: ["Observation Électorale", "Droits Civiques", "Médias"],
    logo: "/images/organizations/kew-logo.svg",
  },
]

const OrganizationsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center text-farafina-primary font-medium mb-2">
              <FaUsers className="mr-2" />
              <span>Réseau d'Observateurs</span>
            </div>
            <h2 className="text-3xl font-bold text-farafina-dark">Organisations Partenaires</h2>
          </div>
          <a
            href="/organizations"
            className="inline-flex items-center text-farafina-primary font-medium mt-4 md:mt-0 hover:text-farafina-primary/80 transition-colors"
          >
            Voir toutes les organisations
            <FaArrowRight className="ml-2 text-sm" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-5px] overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-farafina-primary/10 rounded-lg flex items-center justify-center mr-4">
                    {org.logo ? (
                      <img src={org.logo || "/placeholder.svg"} alt={`Logo ${org.name}`} className="w-8 h-8" />
                    ) : (
                      <FaUsers className="text-farafina-primary text-xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-farafina-dark">{org.name}</h3>
                    <p className="text-sm text-gray-600">{org.country}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm text-gray-600 mb-2">Domaines d'expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {org.expertise.map((exp, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-farafina-primary/10 text-farafina-primary text-xs rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`/organizations/${org.id}`}
                  className="block w-full py-2 text-center border border-farafina-primary text-farafina-primary rounded-lg hover:bg-farafina-primary hover:text-white transition-colors"
                >
                  Voir le profil
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrganizationsSection

