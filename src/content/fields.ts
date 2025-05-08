export const paysData = [
  "Id",
  "nom_pays",
  "code",
  "population",
  "hommes",
  "femmes",
  "langues_officielles",
  "nombre_électeurs",
  "électeurs_hommes",
  "électeurs_femmes",
  "modèle_gestion_élections",
  "système_politique",
  "modèle_gestion_élections",
  "Organe de validation des candidatures",
  "Organe validation candidatures législatives",
  "Régime de vote presidentiel",
  "Régime de vote legislative",
  "Organe de proclamation des résultats provisoires",
  "Organe de gestion des contentieux électoraux",
  "Organe de proclamation des resultats definitifs Présidentiel",
  "Organe proclamation resultats definitifs Législative",
  "Organes Gestion Electoraux",
  "Elections",
  "Zone geographique",
  "Ressources",
  "Organisations",
];

export const electionsData = [
  "Id",
  "statut",
  "date_élection",
  "type_élection",
  "nom_pays",
  "code_pays",
  "Pays_id",
  "Résultats Élections",
  ];
  
export const resultatsElectionsData = [
      "Id",
      "résultats",
      "participation",
      "source_résultats",
      "Défis Electorals",
      "Elections_id",
    ];

export const defisData = [
      "Id",
      "libellé defis",
      "type_défi",
      "source_defi",
      "Résultats Élections_id",
    ];

export const organismesElectorauxData = [
      "Id",
      "nom",
      "ville",
      "annee de creation",
      "siteweb",
      "telephone",
      "email",
      "Pays_id",
    ];

export const organisationsData = [
      "Id",
      "nom",
      "zones couvertes",
      "Statut",
      "Type d’organisation -  institutions",
      "nombre de pays couverts",
      "ville",
      "annee de creation",
      "zones couvertes",
      "domaines d'expertise",
      "mobilisation observateurs",
      "annee de creation",
      "siteweb",
      "telephone",
      "email",
      "nom_pays (from Pays)",
    ];