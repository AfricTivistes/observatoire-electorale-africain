import type React from "react"
import { FaUsers, FaGlobeAfrica, FaChartBar } from "react-icons/fa"

const AboutHero: React.FC = () => {
  return (
    <section className="pt-28 pb-20 bg-farafina-primary text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-farafina-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium mb-4">
                Notre Mission
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                À Propos de <span className="text-farafina-secondary">FarafinaWatch</span>
              </h1>
            </div>

            <p className="text-lg text-white/90 max-w-xl">
              FarafinaWatch est l'Observatoire des Élections en Afrique, une plateforme collaborative dédiée à la
              promotion de la transparence, l'intégrité et la participation démocratique à travers le continent
              africain.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                  <FaGlobeAfrica className="text-white text-xl" />
                </div>
                <div className="text-sm font-medium">54 Pays</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                  <FaChartBar className="text-white text-xl" />
                </div>
                <div className="text-sm font-medium">120+ Élections</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                  <FaUsers className="text-white text-xl" />
                </div>
                <div className="text-sm font-medium">250+ Organisations</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                <img
                  src="https://placeholder.pics/svg/400x300/eee/eee-eee"
                  alt="Illustration de l'Observatoire des Élections en Afrique"
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-farafina-secondary/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero;

