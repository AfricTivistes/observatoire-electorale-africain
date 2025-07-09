import React, { useState } from 'react';
import Icon from './Icon';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterSection {
  title: string;
  name: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  sections: FilterSection[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  sections,
  onFilterChange 
}) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (sectionName: string, value: string) => {
    const newFilters = { ...filters };
    
    if (!newFilters[sectionName]) {
      newFilters[sectionName] = [];
    }

    if (newFilters[sectionName].includes(value)) {
      newFilters[sectionName] = newFilters[sectionName].filter(v => v !== value);
    } else {
      newFilters[sectionName] = [...newFilters[sectionName], value];
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        id="filter-sidebar"
        className={`
          fixed lg:relative inset-y-0 left-0 z-40 w-full lg:w-auto
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
          bg-white lg:bg-transparent
          lg:block
          ${isOpen ? 'block' : 'hidden'}
        `}
      >
        <div className="h-full overflow-y-auto lg:overflow-visible bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-africa-primary" id="filter-heading">
              Filtres
            </h2>
            <button
              onClick={resetFilters}
              className="text-sm text-africa-secondary hover:text-africa-secondary/80 focus:outline-none focus:ring-2 focus:ring-africa-accent rounded-md px-2 py-1"
              aria-label="Réinitialiser les filtres"
            >
              Réinitialiser
            </button>
          </div>

          {sections.map(section => (
            <div key={section.name} className="mb-6">
              <h3 className="font-semibold mb-3 text-africa-primary">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.options.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center group p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters[section.name]?.includes(option.value) || false}
                      onChange={() => handleFilterChange(section.name, option.value)}
                      className="form-checkbox"
                      aria-label={`Filter by ${option.label}`}
                    />
                    <span className="ml-2 text-gray-700 group-hover:text-africa-primary transition-colors">
                      {option.label}
                    </span>
                    {option.count !== undefined && (
                      <span className="ml-auto text-sm text-gray-500">
                        ({option.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
