import { defineCollection, z, reference } from "astro:content";
import { listTableRecords } from "../lib/api/nocodb";
import {
  paysData,
  electionsData,
  resultatsElectionsData,
  defisData,
  organismesElectorauxData,
  organisationsData,
  ressourcesData,
} from "./fields";

/* ---------------------------
   Utilitaires généraux
   --------------------------- */

// Génère un slug simple
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const slugSchema = z.string().regex(/^[a-z0-9-]+$/, "Slug invalide");

// Récupère toutes les pages d'une table en gérant la pagination (pageSize par défaut 100)
async function fetchAllRecords(
  tableId: string,
  fields: any,
  params: Record<string, any> = {},
  pageSize = 100
) {
  let offset = 0;
  let all: any[] = [];

  // forcer limit et offset numériques, mais conserver d'autres params
  const baseParams = { ...params };

  while (true) {
    const p = {
      ...baseParams,
      limit: pageSize,
      offset,
    };

    const res = await listTableRecords(tableId, fields, p);

    // gérer formes possibles de réponse : array ou { data: [...] }
    const page = Array.isArray(res) ? res : res?.data ?? [];

    if (!Array.isArray(page)) break;

    all = all.concat(page);

    if (page.length < pageSize) break;

    offset += pageSize;
  }

  return all;
}

const toNumber = (v: any, fallback = 0) => {
  if (v == null || v === "") return fallback;
  const n = Number(String(v).replace(/\s+/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : fallback;
};

const toString = (v: any, fallback = "") =>
  v == null ? fallback : String(v);

/* ---------------------------
   Collections
   --------------------------- */

const pays = defineCollection({
  loader: async () => {
    const paysTableId = "mskbiq35er4l19l";
    const fields = paysData;

    const params = {
      where: `(Statut,eq,Publier)~and(nom_pays,notnull)`,
      sort: "nom_pays",
      // pas de limit : on pagine via fetchAllRecords
    };

    const records = await fetchAllRecords(paysTableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      code: toString(r["code"], ""),
      name: toString(r["nom_pays"], ""),
      heure_modif: toString(r["heure modif"], ""),
      langue: toString(r["langues_officielles"], ""),
      population: toNumber(r["population"], 0),
      politicalSystem: toString(r["système_politique"], ""),
      modele: toString(r["modèle_gestion_élections"], ""),
      region: toString(r["Zone geographique"], ""),
      vote: {
        presidentialVote: toString(r["Présidentiel - Régime de vote"], ""),
        presidentialscrutinMode: toString(
          r["Presidentiel - Mode de scrutin"],
          ""
        ),
        presidentialResults: toString(
          r["Organe de proclamation des resultats definitifs Présidentiel"],
          ""
        ),
        legislativeVote: toString(r["Legislative - Régime de vote"], ""),
        legislativeScrutinMode: toString(
          r["Legislative - Mode de scrutin"],
          ""
        ),
        legislativeResults: toString(
          r["Organe proclamation resultats definitifs Législative"],
          ""
        ),
        validationBody: toString(r["Organe de validation des candidatures"], ""),
        legislativeValidationBody: toString(
          r["Organe validation candidatures législatives"],
          ""
        ),
        disputesManagementBody: toString(
          r["Organe de gestion des contentieux électoraux"],
          ""
        ),
        provisionalResultsBody: toString(
          r["Organe de proclamation des résultats provisoires"],
          ""
        ),
      },
      // Si tu as de vraies données, remplace cette partie
      lastElection: {
        type: toString(r["dernier_type_élection"], "Inconnu"),
        year: toNumber(r["dernier_année"], 0),
        turnout: toNumber(r["taux_participation"], 0),
        nextElectionYear: toNumber(r["prochaine_année"], 0),
      },
      demographics: {
        gender: {
          male: toNumber(r["hommes"], 0),
          female: toNumber(r["femmes"], 0),
        },
        genderRatio: {
          male: toNumber(r["électeurs_hommes"], 0),
          female: toNumber(r["électeurs_femmes"], 0),
        },
        voterRegistration: {
          registered: toNumber(r["nombre_électeurs"], 0),
          population: toNumber(r["population"], 0),
        },
      },
      ressources: [], // rempli ensuite si tu veux établir des relations
    }));
  },
  schema: z.object({
    id: z.string(),
    code: z.string(),
    heure_modif: z.string(),
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
      presidentialscrutinMode: z.string(),
      legislativeVote: z.string(),
      legislativeResults: z.string(),
      legislativeScrutinMode: z.string(),
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

const ressources = defineCollection({
  loader: async () => {
    const tableId = "m1s9f82k61alcst";
    const fields = ressourcesData;

    const params = {
      where: "(type_donnée,notnull)",
      sort: "année",
    };

    const records = await fetchAllRecords(tableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      title: toString(r["titre"], ""),
      code: toString(r["code"], ""),
      type: toString(r["type_donnée"], ""),
      year: r["année"] != null ? toNumber(r["année"], 0) : 0,
      description: toString(r["description"], ""),
      Pays_id: r["Pays_id"] ? toString(r["Pays_id"], "") : "",
      fichier: toString(r["fichier"], ""),
      slug: (() => {
        const t = toString(r["titre"], "");
        return t ? generateSlug(t) : toString(r["code"], generateSlug(t));
      })(),
    }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    code: z.string(),
    type: z.string(),
    year: z.number(),
    description: z.string(),
    Pays_id: z.string(),
    fichier: z.string(),
    slug: slugSchema.optional(),
  }),
});

const elections = defineCollection({
  loader: async () => {
    const tableId = "mufcewiwnu6czob";
    const fields = electionsData;

    const params = {
      where: "(type_élection,notnull)",
      sort: "date_élection",
    };

    const records = await fetchAllRecords(tableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      statut: toString(r["statut"], ""),
      dateElection: toString(r["date_élection"], ""),
      typeElection: toString(r["type_élection"], ""),
      region: toString(r["zone"], ""),
      nomPays: toString(r["nom_pays"], ""),
      code_pays: toString(r["code_pays"], ""),
      Pays_id: r["Pays_id"] ? toString(r["Pays_id"], "") : "",
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

const resultatsElections = defineCollection({
  loader: async () => {
    const tableId = "mm158oifoa20mjd";
    const fields = resultatsElectionsData;
    const params = { where: "(résultats,notnull)" };

    const records = await fetchAllRecords(tableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      resultats: toString(r["résultats"], ""),
      nomPays: toString(r["nom_pays"], ""),
      typeStatut: Array.isArray(r["type_statut"])
        ? r["type_statut"].map((s: any) => toString(s, ""))
        : [],
      dateStatut: Array.isArray(r["date_statut"])
        ? r["date_statut"].map((s: any) => toString(s, ""))
        : [],
      participation: toNumber(r["participation"], 0),
      electeur: toNumber(r["nombre_électeurs"], 0),
      source_résultats: toString(r["source_résultats"], ""),
      Elections_id: r["Elections_id"] ? toString(r["Elections_id"], "") : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    resultats: z.string(),
    participation: z.number(),
    nomPays: z.string(),
    typeStatut: z.array(z.string()),
    dateStatut: z.array(z.string()),
    electeur: z.number(),
    source_résultats: z.string(),
    Elections_id: z.string(),
  }),
});

const defisElections = defineCollection({
  loader: async () => {
    const tableId = "mv1dqchljj7zoic";
    const fields = defisData;
    const params = { where: "(libellé defis,notnull)" };

    const records = await fetchAllRecords(tableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      libelleDefis: toString(r["libellé defis"], ""),
      typeDefi: toString(r["type_défi"], ""),
      code_pays: toString(r["code_pays"], ""),
      nomPays: toString(r["nom_pays"], ""),
      zone: toString(r["zone"], ""),
      sourceDefi: toString(r["source_defi"], ""),
      ResultatsElections: toString(r["Résultats elections"], ""),
      resultats: r["Résultats Élections_id"]
        ? toString(r["Résultats Élections_id"], "")
        : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    libelleDefis: z.string(),
    typeDefi: z.string(),
    zone: z.string(),
    code_pays: z.string(),
    nomPays: z.string(),
    sourceDefi: z.string(),
    ResultatsElections: z.string(),
    resultats: z.string(),
  }),
});

const organismesElectoraux = defineCollection({
  loader: async () => {
    const tableId = "mdw3p2nr069jqzi";
    const fields = organismesElectorauxData;
    const params = { where: "(nom,notnull)" };

    const records = await fetchAllRecords(tableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      nom: toString(r["nom"], ""),
      ville: toString(r["ville"], ""),
      anneeDeCreation: toNumber(r["annee de creation"], 0),
      siteweb: toString(r["siteweb"], ""),
      telephone: toString(r["telephone"], ""),
      email: toString(r["email"], ""),
      Pays_id: r["Pays_id"] ? toString(r["Pays_id"], "") : "",
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
    const params = { where: "(Statut,eq,Vérifié)" };

    const records = await fetchAllRecords(tableId, fields, params, 100);

    return records.map((r) => ({
      id: toString(r["Id"], ""),
      nom: toString(r["nom"], ""),
      zone: Array.isArray(r["Zone"])
        ? r["Zone"].map((z: any) => toString(z, "")).filter(Boolean)
        : toString(r["Zone"], ""),
      statut: toString(r["Statut"], ""),
      typeOrganisation: toString(r["Type d’organisation -  institutions"], ""),
      nombreDePaysCouverts: toString(r["nombre de pays couverts"], ""),
      ville: toString(r["ville"], ""),
      anneeDeCreation: toNumber(r["annee de creation"], 0),
      zonesCouverts: toString(r["zones couvertes"], ""),
      domainesExpertise: toString(r["domaines d'expertise"], ""),
      mobilisationsObservateurs: toString(r["mobilisation observateurs"], ""),
      siteweb: toString(r["siteweb"], ""),
      telephone: toString(r["telephone"], ""),
      email: toString(r["email"], ""),
      pays: r["nom_pays (from Pays)"]
        ? toString(r["nom_pays (from Pays)"], "")
        : "",
    }));
  },
  schema: z.object({
    id: z.string(),
    nom: z.string(),
    zone: z
      .union([
        z.string(),
        z.array(z.string().nullable()).transform((arr) => arr.filter(Boolean)),
      ])
      .optional(),
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

/* ---------------------------
   Export des collections
   --------------------------- */
export const collections = {
  pays,
  ressources,
  organisations,
  organismesElectoraux,
  defisElections,
  resultatsElections,
  elections,
};
