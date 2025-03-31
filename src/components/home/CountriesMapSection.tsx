"use client"

import React from "react"
import { FaGlobeAfrica, FaArrowRight } from "react-icons/fa"
import AfricaMap from "../countries/AfricaMap"

const CountriesMapSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<string | undefined>(undefined)

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(countryCode)
    // In a real implementation, you might redirect to the country page
    // window.location.href = `/countries/${countryCode.toLowerCase()}`;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-farafina-blue/5 to-farafina-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center text-farafina-primary font-medium mb-2">
              <FaGlobeAfrica className="mr-2" />
              <span>Profils des Pays</span>
            </div>
            <h2 className="text-3xl font-bold text-farafina-dark mb-6">
              Explorer les Systèmes Électoraux à travers l'Afrique
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez les spécificités des systèmes électoraux de chaque pays africain, leurs cadres juridiques, leurs
              défis démocratiques et leurs avancées en matière de transparence électorale.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-farafina-primary/10 flex items-center justify-center mr-4 mt-1">
                  <span className="text-farafina-primary font-semibold">01</span>
                </div>
                <div>
                  <h3 className="font-semibold text-farafina-dark mb-1">Cadres Juridiques</h3>
                  <p className="text-gray-600">Consultez les constitutions et lois électorales de chaque pays</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-farafina-primary/10 flex items-center justify-center mr-4 mt-1">
                  <span className="text-farafina-primary font-semibold">02</span>
                </div>
                <div>
                  <h3 className="font-semibold text-farafina-dark mb-1">Données Démographiques</h3>
                  <p className="text-gray-600">Accédez aux statistiques sur les électeurs et la participation</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-farafina-primary/10 flex items-center justify-center mr-4 mt-1">
                  <span className="text-farafina-primary font-semibold">03</span>
                </div>
                <div>
                  <h3 className="font-semibold text-farafina-dark mb-1">Historique Électoral</h3>
                  <p className="text-gray-600">Explorez l'historique des élections et leurs résultats</p>
                </div>
              </div>
            </div>

            <a
              href="/countries"
              className="inline-flex items-center text-farafina-primary font-medium hover:text-farafina-primary/80 transition-colors"
            >
              Explorer tous les pays
              <FaArrowRight className="ml-2 text-sm" />
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <AfricaMap selectedCountry={selectedCountry} onCountryClick={handleCountryClick} />

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">Cliquez sur un pays pour explorer ses données électorales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountriesMapSection

