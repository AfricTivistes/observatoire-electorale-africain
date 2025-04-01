import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { FaSpinner } from 'react-icons/fa';

// Use local GeoJSON file
const geoUrl = "/africa.json";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface AfricaMapProps {
  selectedCountry?: string;
  onCountryClick?: (countryCode: string) => void;
}

const AfricaMap: React.FC<AfricaMapProps> = ({ 
  selectedCountry,
  onCountryClick 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapData, setMapData] = useState<any>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const fetchMapData = useCallback(async () => {
    try {
      console.log(`Attempting to fetch map data (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      const response = await fetch(geoUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Verify GeoJSON structure
      if (!data?.type || !data?.features?.length) {
        throw new Error('Invalid or empty GeoJSON data');
      }
      
      console.log(`Map data loaded successfully with ${data.features.length} features`);
      setMapData(data);
      setLoading(false);
      setError(null);
      setRetryCount(0);
    } catch (err) {
      console.error('Map data loading error:', err);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY * (retryCount + 1)}ms...`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, RETRY_DELAY * (retryCount + 1));
      } else {
        setError('Failed to load map data. Please try again later.');
        setLoading(false);
      }
    }
  }, [retryCount]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        setError(null);
        setRetryCount(0);
        fetchMapData();
      });

      window.addEventListener('offline', () => {
        setError('Connection lost. Waiting for connection to restore...');
      });

      return () => {
        window.removeEventListener('online', () => {});
        window.removeEventListener('offline', () => {});
      };
    }
  }, [fetchMapData]);

  useEffect(() => {
    fetchMapData();
    return () => {
      setMapData(null);
      setTooltipContent("");
    };
  }, [fetchMapData]);

  const mapStyles = useMemo(() => ({
    default: {
      fill: "#E5E7EB",
      stroke: "#9CA3AF",
      strokeWidth: 0.5,
      outline: "none",
      transition: "all 250ms",
    },
    hover: {
      fill: "#93C5FD",
      stroke: "#2563EB",
      strokeWidth: 1,
      outline: "none",
      cursor: "pointer",
      transition: "all 250ms",
    },
    pressed: {
      fill: "#2563EB",
      stroke: "#1D4ED8",
      strokeWidth: 1,
      outline: "none",
      transition: "all 250ms",
    },
    selected: {
      fill: "#2563EB",
      stroke: "#9CA3AF",
      strokeWidth: 0.5,
      outline: "none",
      transition: "all 250ms",
    },
    selectedHover: {
      fill: "#3B82F6",
      stroke: "#2563EB",
      strokeWidth: 1,
      outline: "none",
      cursor: "pointer",
      transition: "all 250ms",
    }
  }), []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[400px] bg-gray-50 rounded-lg">
        <FaSpinner className="animate-spin text-4xl text-africa-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-[400px] bg-gray-50 rounded-lg">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] bg-gray-50 rounded-lg overflow-hidden">
      {tooltipContent && (
        <div 
          className="absolute z-10 bg-white px-3 py-1 rounded-md shadow-md text-sm"
          style={{
            left: "50%",
            top: "10px",
            transform: "translateX(-50%)"
          }}
        >
          {tooltipContent}
        </div>
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [20, 5],
          rotate: [0, 0, 0]
        }}
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ZoomableGroup>
          <Geographies geography={mapData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountry === geo.properties.ISO_A2;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.NAME);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      if (onCountryClick) {
                        onCountryClick(geo.properties.ISO_A2);
                      }
                    }}
                    style={{
                      default: isSelected ? mapStyles.selected : mapStyles.default,
                      hover: isSelected ? mapStyles.selectedHover : mapStyles.hover,
                      pressed: mapStyles.pressed,
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default AfricaMap;