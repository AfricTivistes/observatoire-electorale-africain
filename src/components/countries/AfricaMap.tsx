import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/africa.json";

interface AfricaMapProps {
  selectedCountry?: string; // ID du pays sélectionné
  onCountryClick?: (countryCode: string) => void;
}

const AfricaMap: React.FC<AfricaMapProps> = ({ selectedCountry, onCountryClick }) => {
  return (
    <div className="relative w-full h-[400px] bg-gray-50 rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 250, center: [20, 5] }} // Zoom Afrique
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.properties.code;
              const isSelected = countryCode === selectedCountry;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onCountryClick && onCountryClick(countryCode)}
                  fill={isSelected ? "#6EC770" : "#ccc"} 
                  stroke={isSelected ? "#5ab35c" : "#333"}
                  style={{
                    default: {
                      outline: "none",
                      filter: isSelected
                        ? "drop-shadow(0 0 3px rgba(110, 199, 112, 0.7))"
                        : "none",
                    },
                    hover: {
                      fill: isSelected ? "#5ab35c" : "#aaa",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#2D83F5",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default AfricaMap;
