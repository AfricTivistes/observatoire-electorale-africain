import React, { useState } from 'react';
import { 
  FaFilter, 
  FaGlobeAfrica, 
  FaClipboardList, 
  FaCalendarAlt,
  FaSortAlphaDown,
  FaSortNumericDown
} from 'react-icons/fa';

const expertiseOptions = [
  'Observation Électorale',
  'Transparence',
  'Formation Civique',
  'Monitoring Électoral',
  'Analyse Politique',
  'Éducation Civique'
];

const regionOptions = [
  'Afrique du Nord',
  'Afrique de l\'Ouest',
  'Afrique Centrale',
  'Afrique de l\'Est',
  'Afrique Australe'
];

const sortOptions = [
  { 
    label: 'Alphabétique', 
    value: 'alphabetic',
    icon: FaSortAlphaDown
  },
  { 
    label: 'Date de Création', 
    value: 'date',
    icon: FaSortNumericDown
  }
];

interface CSOFilterProps {
  onFilterChange: (filters: {
    expertise: string[];
    regions: string[];
    yearRange: [number, number];
    sortBy: string;
  }) => void;
}

const CSOFilter: React.FC<CSOFilterProps> = ({ onFilterChange }) => {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([
    2010, 
    new Date().getFullYear()
  ]);
  const [sortBy, setSortBy] = useState('alphabetic');
  const [isOpen, setIsOpen] = useState(false);

  const updateFilters = () => {
    onFilterChange({
      expertise: selectedExpertise,
      regions: selectedRegions,
      yearRange,
      sortBy
    });
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const resetFilters = () => {
    setSelectedExpertise([]);
    setSelectedRegions([]);
    setYearRange([2010, new Date().getFullYear()]);
    setSortBy('alphabetic');
    onFilterChange({
      expertise: [],
      regions: [],
      yearRange: [2010, new Date().getFullYear()],
      sortBy: 'alphabetic'
    });
  };

  const getActiveFiltersCount = () => {
    return selectedExpertise.length + 
           selectedRegions.length + 
           (sortBy !== 'alphabetic' ? 1 : 0);
  };

  return (
    <>
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
                  <h2 className="text-xl font-bold text-africa-primary">Filtres OSC</h2>
                </div>
                {/* Close button for mobile */}
                <button
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>

              <div className="stack-lg">
                {/* Expertise Filter */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaClipboardList className="mr-2 text-africa-accent" />
                    <h3 className="font-semibold text-africa-primary">
                      Domaines d'Expertise
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {expertiseOptions.map(exp => (
                      <label 
                        key={exp}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedExpertise.includes(exp)}
                          onChange={() => {
                            setSelectedExpertise(prev => 
                              prev.includes(exp) 
                                ? prev.filter(e => e !== exp)
                                : [...prev, exp]
                            );
                          }}
                        />
                        <span className="ml-2 text-gray-700">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region Filter */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaGlobeAfrica className="mr-2 text-africa-accent" />
                    <h3 className="font-semibold text-africa-primary">Régions</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {regionOptions.map(region => (
                      <label 
                        key={region}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedRegions.includes(region)}
                          onChange={() => {
                            setSelectedRegions(prev => 
                              prev.includes(region) 
                                ? prev.filter(r => r !== region)
                                : [...prev, region]
                            );
                          }}
                        />
                        <span className="ml-2 text-gray-700">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Year Range Filter */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-africa-accent" />
                    <h3 className="font-semibold text-africa-primary">
                      Période d'Intervention
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-auto">
                      <label className="block text-sm text-gray-600 mb-1">De</label>
                      <input
                        type="number"
                        min="2000"
                        max={new Date().getFullYear()}
                        value={yearRange[0]}
                        onChange={(e) => setYearRange([
                          Number(e.target.value),
                          yearRange[1]
                        ])}
                        className="w-full sm:w-24 px-3 py-2 border rounded-md focus:ring-2 focus:ring-africa-accent focus:border-transparent"
                      />
                    </div>
                    <div className="hidden sm:block">-</div>
                    <div className="w-full sm:w-auto">
                      <label className="block text-sm text-gray-600 mb-1">À</label>
                      <input
                        type="number"
                        min="2000"
                        max={new Date().getFullYear()}
                        value={yearRange[1]}
                        onChange={(e) => setYearRange([
                          yearRange[0],
                          Number(e.target.value)
                        ])}
                        className="w-full sm:w-24 px-3 py-2 border rounded-md focus:ring-2 focus:ring-africa-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Sorting */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaSortAlphaDown className="mr-2 text-africa-accent" />
                    <h3 className="font-semibold text-africa-primary">Trier Par</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {sortOptions.map(option => (
                      <label 
                        key={option.value}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio"
                          checked={sortBy === option.value}
                          onChange={() => setSortBy(option.value)}
                        />
                        <option.icon className="ml-2 mr-2 text-gray-600" />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={updateFilters}
                  className="btn-primary flex-grow"
                >
                  Appliquer les Filtres
                </button>
                <button
                  onClick={resetFilters}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 flex-grow"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CSOFilter;
