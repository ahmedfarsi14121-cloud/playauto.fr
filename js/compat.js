/**
 * Trouve la phase/génération (VEHICLES_DB[...].phases) correspondant à une
 * année donnée, si le modèle en définit. Retourne null si le modèle n'a pas
 * de découpage par phase ou si l'année ne correspond à aucune phase connue.
 *
 * Le formulaire envoie toujours l'année `from` de la phase choisie comme
 * valeur (voir main.js), donc on la cherche d'abord par égalité exacte.
 * Les bornes de deux phases consécutives se touchent (fin de génération =
 * début de la suivante) : un simple test d'intervalle inclusif des deux
 * côtés ferait remonter la mauvaise phase sur cette année commune.
 */
function findVehiclePhase(brand, model, year) {
  const entry = (VEHICLES_DB[brand] || []).find((m) => m.model === model);
  if (!entry || !entry.phases) return null;

  const exact = entry.phases.find((p) => p.from === year);
  if (exact) return exact;

  return entry.phases.find((p) => year >= p.from && year <= p.to) || null;
}

/**
 * Détermine si un véhicule peut recevoir CarPlay/Android Auto sur son écran
 * d'origine (via un boîtier sans fil), en fonction du champ `carplayFrom` de
 * VEHICLES_DB. `yearFrom`/`yearTo` définissent la période à vérifier : pour
 * une sélection par année unique, passez la même valeur deux fois ; pour une
 * phase/génération complète, passez ses bornes `from`/`to` (une génération
 * peut alors être "partiellement" compatible si le seuil carplayFrom tombe
 * au milieu, par ex. après un restylage).
 *
 * Retourne { status: "yes" | "no" | "partial" | "unknown", since?: number }
 */
function getFactoryCarplayCompatibility(brand, model, yearFrom, yearTo) {
  if (yearTo === undefined) yearTo = yearFrom;

  const entry = (VEHICLES_DB[brand] || []).find((m) => m.model === model);
  if (!entry) return { status: "unknown" };

  if (entry.carplayFrom === null) {
    return { status: "no" };
  }

  if (typeof entry.carplayFrom !== "number") {
    return { status: "unknown" };
  }

  if (entry.carplayFrom <= yearFrom) {
    return { status: "yes", since: entry.carplayFrom };
  }

  if (entry.carplayFrom > yearTo) {
    return { status: "no", since: entry.carplayFrom };
  }

  return { status: "partial", since: entry.carplayFrom };
}
