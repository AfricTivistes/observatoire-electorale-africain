import React from 'react';
import { 
  FaGlobe as Globe, 
  FaBalanceScale as Balance, 
  FaUsers as Users, 
  FaChartLine as ChartLine,
  FaMapMarkerAlt as MapMarker,
  FaEnvelope as Envelope,
  FaPhone as Phone,
  FaSearch as Search,
  FaCalendar as Calendar,
  FaTimes as Close,
  FaFilter as Filter
} from 'react-icons/fa';

type IconName = 
  | 'globe' 
  | 'balance' 
  | 'users' 
  | 'chart' 
  | 'map' 
  | 'email' 
  | 'phone'
  | 'search'
  | 'calendar'
  | 'close'
  | 'filter';

interface IconProps {
  name: IconName;
  className?: string;
}

const iconMap = {
  globe: Globe,
  balance: Balance,
  users: Users,
  chart: ChartLine,
  map: MapMarker,
  email: Envelope,
  phone: Phone,
  search: Search,
  calendar: Calendar,
  close: Close,
  filter: Filter
};

const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} />;
};

export default Icon;
