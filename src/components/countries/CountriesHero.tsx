import type React from "react"
import { FaGlobeAfrica, FaSearch } from "react-icons/fa"

const CountriesHero: React.FC = () => {
  return (
    <section className="pt-28 pb-12 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-farafina-primary/10 rounded-full mb-4">
            <FaGlobeAfrica className="text-farafina-primary text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-farafina-dark mb-4">Profils des Pays Africains</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explorez les systèmes électoraux, les cadres juridiques et les données démographiques des pays africains.
          </p>

          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher un pays..."
              className="w-full py-4 pl-12 pr-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-farafina-primary focus:border-transparent shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountriesHero;

