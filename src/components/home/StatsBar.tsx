import type React from "react"
import { FaVoteYea, FaUsers, FaGlobeAfrica, FaCalendarAlt } from "react-icons/fa"

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-farafina-primary shadow-md">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-white/80 text-sm">{label}</div>
    </div>
  </div>
)

const StatsBar: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-farafina-primary via-farafina-secondary to-farafina-primary py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem icon={<FaGlobeAfrica className="w-6 h-6" />} value="54" label="Pays Africains" />
          <StatItem icon={<FaVoteYea className="w-6 h-6" />} value="120+" label="Élections Observées" />
          <StatItem icon={<FaUsers className="w-6 h-6" />} value="250+" label="Organisations Partenaires" />
          <StatItem icon={<FaCalendarAlt className="w-6 h-6" />} value="15+" label="Élections à Venir en 2024" />
        </div>
      </div>
    </section>
  )
}

export default StatsBar

