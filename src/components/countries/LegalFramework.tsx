import React, { useState } from 'react';
import { FaFileAlt, FaLink, FaCalendarAlt, FaTools, FaMapMarkerAlt, FaBuilding, FaEnvelope, FaPhone, FaUsers, FaGlobe } from 'react-icons/fa';

    interface LegalDocument {
      title: string;
      type: string;
      year: number;
      url?: string;
      description: string;
    }

interface LegalFrameworkProps {
  documents: LegalDocument[];
  organisations: Array<{
    nom: string;
    statut: string;
    typeOrganisation: string;
    nombreDePaysCouverts: string;
    ville: string;
    anneeDeCreation: number;
    zonesCouverts: string;
    domainesExpertise: string;
    mobilisationsObservateurs: string;
    siteweb: string;
    telephone: string;
    email: string;
    pays: string;
  }>;
      timeline: Array<{
        year: number;
        event: string;
        type: 'constitution' | 'election-law' | 'amendment'
      }>;
    }

    const LegalFramework: React.FC<LegalFrameworkProps> = ({   documents, timeline, organisations }) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'timeline' | 'organisations'>('documents');
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const renderTimelineIcon = (type: string) => {
    switch (type) {
      case 'constitution':
        return <FaFileAlt className="text-blue-500" />;
      case 'election-law':
        return <FaLink className="text-green-500" />;
      case 'amendment':
        return <FaCalendarAlt className="text-red-500" />;
      default:
        return null;
    }
  };

  // Ouvre le pop-up
  const openPopup = (org: any) => {
    setSelectedOrg(org);
  };

  // Ferme le pop-up
  const closePopup = () => {
    setSelectedOrg(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex mb-6 border-b">
        <button
          className={`
            px-4 py-2 mr-2 
            ${activeTab === 'documents' ? 'border-b-2 border-africa-secondary bg-farafina-blue/10 text-africa-secondary' : 'text-gray-600 '}
          `}
          onClick={() => setActiveTab('documents')}
        >
          Données système électoral
        </button>
        <button
          className={`
            px-4 py-2 mr-2 
            ${activeTab === 'organisations' ? 'border-b-2  border-africa-secondary bg-farafina-blue/10 text-africa-secondary' : 'text-gray-600'}
          `}
          onClick={() => setActiveTab('organisations')}
        >
          Acteurs clés ({organisations.length})
        </button>
      </div>

      {activeTab === 'documents' && (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="border text-farafina-blue rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center mb-2">
                <FaFileAlt className="mr-2 text-africa-accent" />
                {doc.url ? (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="font-semibold text-farafina-blue">{doc.title}</h3>
                  </a>
                ) : (
                  <h3 className="font-semibold text-farafina-blue">{doc.title}</h3>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {doc.type} - {doc.year}
                </span>
                {doc.url && (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-africa-secondary hover:underline">
                    Consulter
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="relative pl-6 border-l-2 border-gray-200">
          {timeline.map((item, index) => (
            <div key={index} className="mb-4 pl-4 relative">
              <div className="absolute left-[-23px] top-1 rounded-full p-2 bg-white border-2 border-gray-200">
                {renderTimelineIcon(item.type)}
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-africa-primary">
                  {item.year} - {item.event}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'organisations' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 p-4">
          {organisations.slice(0, 8).map((org, index) => (
            <div
              key={org.id || index}
              className="relative rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => openPopup(org)}
            >
              {/* En-tête visible */}
              <div className="flex items-center space-x-3">
                <FaBuilding className="text-farafina-blue text-xl" />
                <h3 className="truncate text-lg font-semibold text-farafina-blue">{org.nom}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pop-up */}
      {selectedOrg && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-farafina-accent hover:text-black transition-colors"
              onClick={closePopup}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-black text-center mb-5">{selectedOrg.nom}</h3>
            <div className="space-y-2 text-black">
              <p>
                <FaMapMarkerAlt className="inline-block mr-2" />
                <strong>Localisation:</strong> {selectedOrg.ville} - {selectedOrg.pays}
              </p>
              <p>
                <FaGlobe className="inline-block mr-2" />
                <strong>Zone couvert:</strong> {selectedOrg.zonesCouverts}
              </p>
              <p>
                <FaBuilding className="inline-block mr-2" />
                <strong>Type d'organisation:</strong> {selectedOrg.typeOrganisation}
              </p>
              <p>
                <FaCalendarAlt className="inline-block mr-2" />
                <strong>Année de Création:</strong> {selectedOrg.anneeDeCreation}{' '}
                <span>({new Date().getFullYear() - selectedOrg.anneeDeCreation} année d'expertise)</span>
              </p>
              <p>
                <FaTools className="inline-block mr-2" />
                <strong>Domaines d'Expertise:</strong>{' '}
                {selectedOrg.domainesExpertise.split(',').map((domaine: string) => domaine.trim()).join(' | ')}
              </p>
              <p>
                <FaUsers className="inline-block mr-2" />
                <strong>Mobilisations d'Observateurs:</strong> {selectedOrg.mobilisationsObservateurs}
              </p>
              <p>
                <FaLink className="inline-block mr-2" />
                <strong>Site web:</strong>{' '}
                <a
                  href={selectedOrg.siteweb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  {selectedOrg.siteweb}
                </a>
              </p>
              <p>
                <FaPhone className="inline-block mr-2" />
                <strong>Téléphone:</strong>{' '}
                <a
                  href={`tel:${selectedOrg.telephone.replace(/[^+0-9]/g, '')}`}
                  className="text-black hover:underline"
                >
                  {selectedOrg.telephone}
                </a>
              </p>
              <p>
                <FaEnvelope className="inline-block mr-2" />
                <strong>Email:</strong>{' '}
                <a href={`mailto:${selectedOrg.email}`} className="text-black hover:underline">
                  {selectedOrg.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

    export default LegalFramework;
