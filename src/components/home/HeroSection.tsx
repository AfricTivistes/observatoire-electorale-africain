import type React from "react"
import { FaArrowRight, FaChartBar, FaGlobeAfrica, FaUsers } from "react-icons/fa"

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Carte de l'Afrique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80"></div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-farafina-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 top-40 w-80 h-80 bg-farafina-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute right-1/4 bottom-10 w-64 h-64 bg-farafina-accent/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-farafina-primary/10 rounded-full text-farafina-primary font-medium mb-4">
                Observatoire des Élections en Afrique
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farafina-dark leading-tight">
                Transparence et Intégrité <span className="text-farafina-primary">Électorale</span>
              </h1>
            </div>

            <p className="text-lg text-gray-700 max-w-xl">
              Une plateforme collaborative pour renforcer la transparence, l'intégrité et la participation démocratique
              à travers le continent africain.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/elections" className="btn-primary group">
                Explorer les Élections
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/about" className="btn-secondary">
                En savoir plus
              </a>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-farafina-primary">54</div>
                <div className="text-sm text-gray-600">Pays</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-farafina-primary">120+</div>
                <div className="text-sm text-gray-600">Élections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-farafina-primary">250+</div>
                <div className="text-sm text-gray-600">Organisations</div>
              </div>
            </div>
          </div>

          {/* 3D Illustration */}
          <div className="relative">
            <div className="relative z-10 flex justify-center">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl transform hover:rotate-1 transition-transform duration-500">
                <img
                  src="/images/hero-illustration.svg"
                  alt="Illustration de données électorales"
                  className="max-w-full h-auto"
                />

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 bg-white p-3 rounded-lg shadow-lg animate-float">
                  <FaChartBar className="text-farafina-primary text-2xl" />
                </div>
                <div className="absolute bottom-20 left-0 bg-white p-3 rounded-lg shadow-lg animate-float-delay">
                  <FaGlobeAfrica className="text-farafina-blue text-2xl" />
                </div>
                <div className="absolute top-1/4 right-0 bg-white p-3 rounded-lg shadow-lg animate-float-long">
                  <FaUsers className="text-farafina-secondary text-2xl" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-farafina-primary/10 rounded-full"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-farafina-secondary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

