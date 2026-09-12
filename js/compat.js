/**
 * Détermine si un véhicule peut recevoir CarPlay/Android Auto sur son écran
 * d'origine (via un boîtier sans fil) en fonction du champ `carplayFrom`
 * de VEHICLES_DB.
 *
 * Retourne { status: "yes" | "no" | "unknown", since?: number }
 */
function getFactoryCarplayCompatibility(brand, model, year) {
  const entry = (VEHICLES_DB[brand] || []).find((m) => m.model === model);
  if (!entry) return { status: "unknown" };

  if (entry.carplayFrom === null) {
    return { status: "no" };
  }

  if (typeof entry.carplayFrom !== "number") {
    return { status: "unknown" };
  }

  if (year >= entry.carplayFrom) {
    return { status: "yes", since: entry.carplayFrom };
  }

  return { status: "no", since: entry.carplayFrom };
}
