import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/africa.json";

interface AfricaMapProps {
  selectedCountry: string; // ID du pays sélectionné
}

const AfricaMap: React.FC<AfricaMapProps> = ({ selectedCountry }) => {
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
              const isSenegal = geo.properties.code === selectedCountry;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSenegal ? "#e74c3c" : "#ccc"} // Couleur du Sénégal
                  stroke={isSenegal ? "#c0392b" : "#333"} // Bordure du Sénégal
                  style={{
                    default: {
                      outline: "none",
                      filter: isSenegal
                        ? "drop-shadow(0 0 3px rgba(231, 76, 60, 0.7))"
                        : "none",
                    },
                    hover: {
                      fill: isSenegal ? "#c0392b" : "#aaa",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#2980b9",
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
