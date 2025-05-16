import React, { useState, useEffect } from 'react';
import CountrySidebar from './CountrySidebar';
import CountryList from '../CountryList';

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

interface Country {
  code: string;
  name: string;
  population: number;
  lastElection: {
    type: string | undefined;
    date: string | undefined;
    turnout: number | undefined;
    year: number | undefined;
  };
  politicalSystem: string | undefined;
  demographics: {
    voterRegistration: {
      population: number;
      registered: number;
    };
  };
  region?: string;
}

interface CountryFilterWrapperProps {
  countries: Country[];
  regions: Region[];
  politicalSystems: PoliticalSystem[];
}

const CountryFilterWrapper: React.FC<CountryFilterWrapperProps> = ({
  countries,
  regions,
  politicalSystems,
}) => {
  const [activeFilters, setActiveFilters] = useState<{
    regions: string[];
    politicalSystems: string[];
  }>({ regions: [], politicalSystems: [] });
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  // Initial filtering and filter changes
  useEffect(() => {
    let updatedFilteredCountries = countries;

    // Apply Region Filter
    if (activeFilters.regions.length > 0) {
      updatedFilteredCountries = updatedFilteredCountries.filter((country) => {
        return activeFilters.regions.some(filterKey => country.region === filterKey);
      });
    }

    // Apply Political System Filter
    if (activeFilters.politicalSystems.length > 0) {
      updatedFilteredCountries = updatedFilteredCountries.filter((country) => {
         return country.politicalSystem !== undefined && activeFilters.politicalSystems.some(filterKey => country.politicalSystem === filterKey);
      });
    }

    setFilteredCountries(updatedFilteredCountries);
  }, [countries, activeFilters]);

  const handleFilterChange = (filterType: 'regions' | 'politicalSystems', key: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      if (isChecked) {
        if (!updatedFilters[filterType].includes(key)) {
          updatedFilters[filterType].push(key);
        }
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(itemKey => itemKey !== key);
      }
      return updatedFilters;
    });
  };

  const handleResetFilters = () => {
    setActiveFilters({ regions: [], politicalSystems: [] });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
        <CountrySidebar 
          regions={regions} 
          politicalSystems={politicalSystems} 
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>
      <div className="lg:w-3/4">
        <CountryList countries={filteredCountries} />
      </div>
    </div>
  );
};

export default CountryFilterWrapper;
