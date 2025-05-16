import { defineCollection, z, reference } from "astro:content";
import { listTableRecords } from "../lib/api/nocodb";
import {
  paysData,
  electionsData,
  resultatsElectionsData,
  defisData,
  organismesElectorauxData,
  organisationsData,
} from "./fields";

// Fonction utilitaire pour générer un slug à partir d’une chaîne
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Type slug avec Zod
const slugSchema = z.string().regex(/^[a-z0-9-]+$/, "Slug invalide");

// Collection 'pays'
const pays = defineCollection({
  loader: async () => {
    const paysTableId = "mskbiq35er4l19l";
    const fields = paysData;
    const params = {
      limit: "55",
      where: "(nom_pays,notnull)",
      sort: "nom_pays",
    };

    const paysRecords = await listTableRecords(paysTableId, fields, params);
    return paysRecords.map((record) => ({
      id: record["Id"].toString(),
      code: record["code"],
      name: record["nom_pays"],
      langue: record["langues_officielles"] || "",
      population: parseInt(record["population"]) || 0,
      politicalSystem: record["système_politique"] || "",
      modele: record["modèle_gestion_élections"] || "",
      region: record["Zone geographique"] || "",
      vote: {
        presidentialVote: record["Présidentiel - Régime de vote"] || "",
        presidentialResults:
          record[
            "Organe de proclamation des resultats definitifs Présidentiel"
          ] || "",
        legislativeVote: record["Legislative - Régime de vote"] || "",
        legislativeResults:
          record["Organe proclamation resultats definitifs Législative"] || "",
        validationBody: record["Organe de validation des candidatures"] || "",
        legislativeValidationBody:
          record["Organe validation candidatures législatives"] || "",
        disputesManagementBody:
          record["Organe de gestion des contentieux électoraux"] || "",
        provisionalResultsBody:
          record["Organe de proclamation des résultats provisoires"] || "",
      },
      lastElection: {
        type: Math.random() < 0.5 ? "Présidentielle" : "Législative",
        year: Math.floor(Math.random() * 1000) + 1025,
        turnout: Math.random() * (60 - 30) + 30,
        nextElectionYear: Math.floor(Math.random() * 1000) + 2025,
      },
      demographics: {
        gender: {
          male: parseFloat(record["hommes"]) || 0,
          female: parseFloat(record["femmes"]) || 0,
        },
        genderRatio: {
          male: parseFloat(record["électeurs_hommes"]) || 0,
          female: parseFloat(record["électeurs_femmes"]) || 0,
        },
        voterRegistration: {
          registered: parseInt(record["nombre_électeurs"]) || 0,
          population: parseInt(record["population"]) || 0,
        },
      },
      ressources: [],
    }));
  },
  schema: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    langue: z.string(),
    population: z.number(),
    ressources: z.array(reference("ressources")).optional(),
    politicalSystem: z.string().optional(),
    modele: z.string().optional(),
    region: z.string().optional(),
    vote: z.object({
      presidentialVote: z.string(),
      presidentialResults: z.string(),
      legislativeVote: z.string(),
      legislativeResults: z.string(),
      validationBody: z.string(),
      legislativeValidationBody: z.string(),
      disputesManagementBody: z.string(),
      provisionalResultsBody: z.string(),
    }),
    lastElection: z.object({
      type: z.string(),
      year: z.number(),
      turnout: z.number(),
      nextElectionYear: z.number(),
    }),
    demographics: z.object({
      gender: z.object({
        male: z.number(),
        female: z.number(),
      }),
      genderRatio: z.object({
        male: z.number(),
        female: z.number(),
      }),
      voterRegistration: z.object({
        registered: z.number(),
        population: z.number(),
      }),
    }),
  }),
});

// Collection 'ressources'
const ressources = defineCollection({
  loader: async () => {
    const tableId = "m1s9f82k61alcst";
    const params = {
      where: "(type_donnée,notnull)",
      limit: "1000",
      sort: "année",
    };
    const records = await listTableRecords(tableId, params);
    return records.map((record) => ({
      id: record["Id"].toString(),
      title: record.titre || "",
      type: record["type_donnée"] || "",
      year: record["année"] != null ? Number(record["année"]) : 0,
      description: record["description"] || "",
      Pays_id: record.Pays_id ? record.Pays_id.toString() : "",
      fichier: record["fichier"] || "",
    }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    type: z.string(),
    year: z.number(),
    description: z.string(),
    Pays_id: z.string(),
    fichier: z.string(),
  }),
});

// Collection 'elections'
const elections = defineCollection({
  loader: async () => {
    const tableId = "mufcewiwnu6czob";
    const fields = electionsData;
    const params = {
      where: "(type_élection,notnull)",
      sort: "date_élection",
      limit: "1000",
    };
    const records = await listTableRecords(tableId, fields, params);
    return records.map((record) => ({
      id: record["Id"].toString(),
      statut: record["statut"] || "",
      dateElection: record["date_élection"] || "",
      typeElection: record["type_élection"] || "",
      region: record["zone"] || "",
      nomPays: record["nom_pays"] || "",
      code_pays: record["code_pays"] || "",
      Pays_id: record["Pays_id"] ? record["Pays_id"].toString() : "",
      resultats: [],
    }));
  },
  schema: z.object({
    id: z.string(),
    dateElection: z.string(),
    statut: z.string(),
    typeElection: z.string(),
    nomPays: z.string(),
    region: z.string(),
    code_pays: z.string(),
    Pays_id: z.string(),
    resultats: z.array(reference("Résultats Élections")).optional(),
  }),
});

// Collection 'resultatsElections'
const resultatsElections = defineCollection({
  loader: async () => {
    const tableId = "mm158oifoa20mjd";
    const fields = resultatsElectionsData;
    const params = {
      where: "(résultats,notnull)",
      limit: "1000",
    };
    const records = await listTableRecords(tableId, fields, params);
    return records.map((record) => ({
      id: record["Id"].toString(),
      resultats: record["résultats"] || "",
      nomPays: record["nom_pays"] || "",
      participation: parseInt(record["participation"]) || 0,
      electeur: parseInt(record["nombre_électeurs"]) || 0,
      source_résultats: record["source_résultats"] || "",
      Elections_id: record["Elections_id"]
        ? record["Elections_id"].toString()
        : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    resultats: z.string(),
    participation: z.number(),
    nomPays: z.string(),
    electeur: z.number(),
    source_résultats: z.string(),
    Elections_id: z.string(),
  }),
});

// Collection 'defisElections'
const defisElections = defineCollection({
  loader: async () => {
    const tableId = "mv1dqchljj7zoic";
    const fields = defisData;
    const params = {
      where: "(libellé defis,notnull)",
    };
    const records = await listTableRecords(tableId, fields, params);
    return records.map((record) => ({
      id: record["Id"].toString(),
      libelleDefis: record["libellé defis"] || "",
      typeDefi: record["type_défi"] || "",
      nomPays: record["nom_pays"] || "",
      sourceDefi: record["source_defi"] || "",
      ResultatsElections: record["Résultats elections"] || "",
      resultats: record["Résultats Élections_id"]
        ? record["Résultats Élections_id"].toString()
        : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    libelleDefis: z.string(),
    typeDefi: z.string(),
    nomPays: z.string(),
    sourceDefi: z.string(),
    ResultatsElections: z.string(),
    resultats: z.string(),
  }),
});

// Collection 'organismesElectoraux'
const organismesElectoraux = defineCollection({
  loader: async () => {
    const tableId = "mdw3p2nr069jqzi";
    const fields = organismesElectorauxData;
    const params = {
      where: "(nom,notnull)",
    };
    const records = await listTableRecords(tableId, fields, params);
    return records.map((record) => ({
      id: record["Id"].toString(),
      nom: record["nom"] || "",
      ville: record["ville"] || "",
      anneeDeCreation: record["annee de creation"] || 0,
      siteweb: record["siteweb"] || "",
      telephone: record["telephone"] || "",
      email: record["email"] || "",
      Pays_id: record["Pays_id"] ? record["Pays_id"].toString() : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    nom: z.string(),
    ville: z.string(),
    anneeDeCreation: z.number(),
    siteweb: z.string(),
    telephone: z.string(),
    email: z.string(),
    Pays_id: z.string(),
  }),
});

const organisations = defineCollection({
  loader: async () => {
    const tableId = "momxlikiol1qiwn";
    const fields = organisationsData;
    const params = {
      where: "(Statut,eq,Vérifié)",
      limit: "1000",
    };
    const records = await listTableRecords(tableId, fields, params);
    return records.map((record) => ({
      id: record["Id"].toString(),
      nom: record["nom"] || "",
      statut: record["Statut"] || "",
      typeOrganisation: record["Type d’organisation -  institutions"] || "",
      nombreDePaysCouverts: record["nombre de pays couverts"] || "",
      ville: record["ville"] || "",
      anneeDeCreation: record["annee de creation"] || 0,
      zonesCouverts: record["zones couvertes"] || "",
      domainesExpertise: record["domaines d'expertise"] || "",
      mobilisationsObservateurs: record["mobilisation observateurs"] || "",
      siteweb: record["siteweb"] || "",
      telephone: record["telephone"] || "",
      email: record["email"] || "",
      pays: record["nom_pays (from Pays)"]
        ? record["nom_pays (from Pays)"].toString()
        : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    nom: z.string(),
    statut: z.string(),
    typeOrganisation: z.string(),
    nombreDePaysCouverts: z.string(),
    ville: z.string(),
    anneeDeCreation: z.number(),
    zonesCouverts: z.string(),
    domainesExpertise: z.string(),
    mobilisationsObservateurs: z.string(),
    siteweb: z.string(),
    telephone: z.string(),
    email: z.string(),
    pays: z.string(),
  }),
});

export const collections = {
  pays,
  ressources,
  organisations,
  organismesElectoraux,
  defisElections,
  resultatsElections,
  elections,
};
