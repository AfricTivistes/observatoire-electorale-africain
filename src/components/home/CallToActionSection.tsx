import type React from "react"
import { FaUsers, FaChartBar, FaGlobeAfrica, FaFileAlt } from "react-icons/fa"

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-farafina-primary to-farafina-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Participez à la Promotion de la Démocratie en Afrique
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Rejoignez notre réseau d'observateurs, partagez vos données et contribuez à renforcer la transparence
              électorale à travers le continent.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                  <FaUsers className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Devenir Observateur</h3>
                  <p className="text-white/80 text-sm">Rejoignez notre réseau d'observateurs électoraux</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                  <FaChartBar className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Partager des Données</h3>
                  <p className="text-white/80 text-sm">Contribuez avec vos données et analyses</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                  <FaGlobeAfrica className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Sensibilisation</h3>
                  <p className="text-white/80 text-sm">Participez aux campagnes de sensibilisation</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 mt-1">
                  <FaFileAlt className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Recherche</h3>
                  <p className="text-white/80 text-sm">Contribuez à nos projets de recherche</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/participate"
                className="px-6 py-3 bg-white text-farafina-primary font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                Rejoindre le Réseau
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Nous Contacter
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/participation-illustration.svg"
              alt="Participation citoyenne"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection

