import React from 'react';
import { FaVoteYea, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

interface ElectionEvent {
  date: string;
  type: string;
  status: 'completed' | 'upcoming' | 'ongoing';
  turnout?: number;
  description?: string;
}

interface ElectionTimelineProps {
  events: ElectionEvent[];
  countryName: string;
}

const ElectionTimeline: React.FC<ElectionTimelineProps> = ({ events, countryName }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'upcoming':
        return <FaClock className="text-blue-500" />;
      case 'ongoing':
        return <FaVoteYea className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'upcoming':
        return 'bg-blue-50 border-blue-200';
      case 'ongoing':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-africa-primary flex items-center">
        <FaCalendarAlt className="mr-3" />
        Chronologie Électorale - {countryName}
      </h2>

      <div className="space-y-6">
        {sortedEvents.map((event, index) => (
          <div 
            key={index}
            className={`relative border-l-4 pl-6 pb-6 ${getStatusClass(event.status)}`}
          >
            <div className="absolute -left-3 top-0 w-6 h-6 bg-white rounded-full border-4 border-africa-primary flex items-center justify-center">
              {getStatusIcon(event.status)}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-africa-primary">
                    {event.type}
                  </h3>
                  <p className="text-gray-600">{event.date}</p>
                </div>
                {event.status === 'completed' && event.turnout && (
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Participation</span>
                    <p className="font-semibold text-africa-secondary">
                      {event.turnout}%
                    </p>
                  </div>
                )}
              </div>
              {event.description && (
                <p className="mt-2 text-gray-700">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionTimeline;
