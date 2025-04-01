import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaSpinner } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DemographicChartProps {
  demographics: {
    ageGroups: {
      group: string;
      percentage: number;
    }[];
    gender: {
      male: number;
      female: number;
    };
    voterRegistration: {
      registered: number;
      eligible: number;
    };
  };
}

const DemographicChart: React.FC<DemographicChartProps> = ({ demographics }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      // Verify data structure
      if (!demographics?.ageGroups || !demographics?.gender || !demographics?.voterRegistration) {
        throw new Error('Invalid demographic data structure');
      }
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load demographic data');
      setIsLoading(false);
    }
  }, [demographics]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-africa-primary" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  // Data validation
  if (!demographics?.ageGroups?.length || 
      !demographics?.gender?.male || 
      !demographics?.voterRegistration?.registered) {
    return (
      <div className="text-gray-600 text-center p-4">
        Données démographiques non disponibles
      </div>
    );
  }

  const ageData = {
    labels: demographics.ageGroups.map(group => group.group),
    datasets: [
      {
        label: 'Distribution par Âge',
        data: demographics.ageGroups.map(group => group.percentage),
        backgroundColor: [
          'rgba(52, 152, 219, 0.6)',
          'rgba(46, 204, 113, 0.6)',
          'rgba(155, 89, 182, 0.6)',
          'rgba(231, 76, 60, 0.6)'
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(155, 89, 182, 1)',
          'rgba(231, 76, 60, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const genderData = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        data: [demographics.gender.male, demographics.gender.female],
        backgroundColor: [
          'rgba(52, 152, 219, 0.6)',
          'rgba(231, 76, 60, 0.6)',
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(231, 76, 60, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const voterData = {
    labels: ['Inscrits', 'Éligibles'],
    datasets: [
      {
        label: 'Nombre d\'électeurs',
        data: [
          demographics.voterRegistration.registered,
          demographics.voterRegistration.eligible
        ],
        backgroundColor: [
          'rgba(46, 204, 113, 0.6)',
          'rgba(52, 152, 219, 0.6)',
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(52, 152, 219, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        padding: 10
      }
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Distribution par Âge */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-center text-africa-primary">
          Distribution par Âge
        </h3>
        <div className="h-64">
          <Bar data={ageData} options={chartOptions} />
        </div>
      </div>

      {/* Répartition par Genre */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-center text-africa-primary">
          Répartition par Genre
        </h3>
        <div className="h-64">
          <Doughnut data={genderData} options={chartOptions} />
        </div>
      </div>

      {/* Inscription Électorale */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-center text-africa-primary">
          Inscription Électorale
        </h3>
        <div className="h-64">
          <Bar data={voterData} options={chartOptions} />
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          Taux d'inscription: {((demographics.voterRegistration.registered / demographics.voterRegistration.eligible) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default DemographicChart;