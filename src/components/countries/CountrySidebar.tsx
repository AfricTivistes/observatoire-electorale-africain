import React, { useState } from 'react';
import { 
  FaFilter, 
  FaGlobeAfrica,
  FaBalanceScale 
} from 'react-icons/fa';

interface Region {
  name: string;
  count: number;
  key: string;
}

interface PoliticalSystem {
  name: string;
  count: number;
}

interface ActiveFilters {
  regions: string[];
  politicalSystems: string[];
}

interface CountrySidebarProps {
  regions: Region[];
  politicalSystems: PoliticalSystem[];
  activeFilters: ActiveFilters;
  onFilterChange: (filterType: 'regions' | 'politicalSystems', key: string, isChecked: boolean) => void;
  onResetFilters: () => void;
}

const CountrySidebar: React.FC<CountrySidebarProps> = ({
  regions,
  politicalSystems,
  activeFilters,
  onFilterChange,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveFiltersCount = () => {
    return activeFilters.regions.length + activeFilters.politicalSystems.length;
  };

  const regionsFilterSection = {
    title: 'Régions',
    icon: FaGlobeAfrica,
    type: 'regions' as 'regions' | 'politicalSystems',
    items: regions.map(region => ({
      label: region.name,
      count: region.count,
      key: region.key
    }))
  };

  const politicalSystemsFilterSection = {
    title: 'Système Électoral',
    icon: FaBalanceScale,
    type: 'politicalSystems' as 'regions' | 'politicalSystems',
    items: politicalSystems.map(system => ({
      label: system.name,
      count: system.count,
      key: system.name
    }))
  };

  // Combine dynamic sections
  const filterSections = [
    regionsFilterSection,
    politicalSystemsFilterSection
  ];

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-africa-primary text-white rounded-full p-4 shadow-lg hover:bg-africa-secondary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle filters"
      >
        <FaFilter className="w-6 h-6" />
        {getActiveFiltersCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-africa-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {getActiveFiltersCount()}
          </span>
        )}
      </button>

      <div className={`
        fixed lg:relative inset-0 z-40
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        lg:block ${isOpen ? 'block' : 'hidden'}
        bg-white/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none
      `}>
        <div className="h-full lg:h-auto overflow-y-auto lg:overflow-visible">
          <div className="container-narrow mx-auto lg:mx-0 p-4 lg:p-6">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:sticky lg:top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FaFilter className="mr-2 text-africa-secondary" />
                  <h2 className="text-xl font-bold text-africa-dark">Filtres</h2>
                </div>
                {/* Close button for mobile */}
                <button
                  className="lg:hidden text-africa-gray-600 hover:text-africa-dark transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>

              <div className="stack-lg">
                {filterSections.map(section => (
                  <div key={section.title} className="space-y-4">
                    <div className="flex items-center">
                      <section.icon className="mr-2 text-africa-accent" />
                      <h3 className="font-semibold text-africa-dark">
                        {section.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {section.items.map(item => (
                        <label 
                          key={item.key}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-africa-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={activeFilters[section.type]?.includes(item.key) || false}
                              onChange={(e) => onFilterChange(section.type, item.key, e.target.checked)}
                            />
                            <span className="ml-2 text-africa-dark">{item.label}</span>
                          </div>
                          <span className="text-sm text-africa-gray-600">({item.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-africa-gray-200">
                <button
                  className="w-full bg-africa-primary text-white py-2 rounded-lg hover:bg-africa-secondary transition-colors"
                  onClick={onResetFilters}
                >
                  Réinitialiser les Filtres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountrySidebar;
