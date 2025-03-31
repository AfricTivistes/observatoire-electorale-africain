import type React from "react"
import { FaChartBar, FaGlobeAfrica, FaUsers, FaFileAlt } from "react-icons/fa"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
    <div className="w-14 h-14 rounded-lg bg-farafina-primary/10 flex items-center justify-center mb-4">
      <div className="text-farafina-primary text-2xl">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-3 text-farafina-dark">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-farafina-dark mb-4">Renforcer la Démocratie à travers l'Afrique</h2>
          <p className="text-gray-600 text-lg">
            Notre plateforme offre des outils et des ressources pour promouvoir des élections transparentes et
            inclusives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaGlobeAfrica />}
            title="Cartographie Électorale"
            description="Visualisez les élections passées, présentes et futures à travers le continent africain."
          />
          <FeatureCard
            icon={<FaChartBar />}
            title="Analyse des Données"
            description="Accédez à des analyses détaillées des tendances électorales et des statistiques démographiques."
          />
          <FeatureCard
            icon={<FaUsers />}
            title="Réseau d'Observateurs"
            description="Connectez-vous avec des organisations d'observation électorale à travers l'Afrique."
          />
          <FeatureCard
            icon={<FaFileAlt />}
            title="Ressources Juridiques"
            description="Consultez les cadres juridiques électoraux et les meilleures pratiques internationales."
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

