/**
 * Photo du tableau de bord : cherche une image fournie pour ce véhicule
 * avant d'afficher le placeholder, dans cet ordre :
 *   1. Le champ `image` de la phase sélectionnée (ou du modèle si celui-ci
 *      n'a pas de phases), quand VEHICLES_DB en définit un — PROVISOIRE :
 *      utilisé actuellement pour tester l'affichage avec des liens externes
 *      temporaires, à remplacer par de vraies photos hébergées sur le site.
 *   2. La convention de nommage locale dans images/dashboards/ :
 *      "{marque}-{modele}-{annee}.jpg" (photo précise pour cette année),
 *      puis "{marque}-{modele}.jpg" (photo générique pour le modèle). Il
 *      suffit de déposer un fichier respectant ce nommage — ou de renseigner
 *      le champ `image` — pour qu'il apparaisse automatiquement.
 */
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadDashboardPhoto(brand, model, year, phase) {
  const imgEl = document.getElementById("dashboard-photo-img");
  const placeholderEl = document.getElementById("dashboard-photo-placeholder");
  const brandSlug = slugify(brand);
  const modelSlug = slugify(model);

  const entry = (VEHICLES_DB[brand] || []).find((m) => m.model === model);
  const explicitImage = (phase && phase.image) || (entry && !phase && entry.image);

  const candidates = explicitImage
    ? [explicitImage]
    : [
        `images/dashboards/${brandSlug}-${modelSlug}-${year}.jpg`,
        `images/dashboards/${brandSlug}-${modelSlug}.jpg`
      ];

  function tryCandidate(index) {
    if (index >= candidates.length) {
      imgEl.hidden = true;
      placeholderEl.hidden = false;
      return;
    }
    const probe = new Image();
    probe.onload = () => {
      imgEl.src = candidates[index];
      imgEl.hidden = false;
      placeholderEl.hidden = true;
    };
    probe.onerror = () => tryCandidate(index + 1);
    probe.src = candidates[index];
  }

  tryCandidate(0);
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const params = new URLSearchParams(window.location.search);
  const brand = params.get("brand");
  const model = params.get("model");
  const year = parseInt(params.get("year"), 10);

  const choiceSection = document.getElementById("choice-section");
  const productsSection = document.getElementById("products-section");
  const errorSection = document.getElementById("error-section");

  // Formulaire "Changer de véhicule" affiché en ligne sur cette page,
  // pré-rempli avec le véhicule courant (main.js gère les selects en cascade).
  const changeVehicleBtn = document.getElementById("change-vehicle-btn");
  const vehicleForm = document.getElementById("vehicle-form");

  changeVehicleBtn.addEventListener("click", () => {
    vehicleForm.hidden = !vehicleForm.hidden;
    changeVehicleBtn.textContent = vehicleForm.hidden ? "Changer de véhicule" : "Annuler";
  });

  if (brand && model && year) {
    const brandSelectEl = document.getElementById("brand-select");
    const modelSelectEl = document.getElementById("model-select");
    const yearSelectEl = document.getElementById("year-select");

    brandSelectEl.value = brand;
    brandSelectEl.dispatchEvent(new Event("change"));
    modelSelectEl.value = model;
    modelSelectEl.dispatchEvent(new Event("change"));
    yearSelectEl.value = String(year);
    yearSelectEl.dispatchEvent(new Event("change"));
  }

  if (!brand || !model || !year) {
    choiceSection.hidden = true;
    productsSection.hidden = true;
    errorSection.hidden = false;
    return;
  }

  const phase = findVehiclePhase(brand, model, year);
  const periodLabel = phase ? `${phase.from}-${phase.to} (${phase.label})` : String(year);

  document.getElementById("recap-vehicle").textContent = phase
    ? `${brand} ${model} — ${periodLabel}`
    : `${brand} ${model} (${year})`;
  loadDashboardPhoto(brand, model, year, phase);

  const compat = phase
    ? getFactoryCarplayCompatibility(brand, model, phase.from, phase.to)
    : getFactoryCarplayCompatibility(brand, model, year);

  const dongleCard = document.getElementById("choice-dongle");
  const compatBadge = document.getElementById("compat-badge");
  const compatNote = document.getElementById("compat-note");

  if (compat.status === "yes") {
    compatBadge.textContent = `✅ Compatible avec votre ${model}`;
    compatBadge.className = "compat-badge compat-yes";
  } else if (compat.status === "no") {
    compatBadge.textContent = "❌ Non compatible avec ce modèle";
    compatBadge.className = "compat-badge compat-no";
    dongleCard.classList.add("choice-card--disabled");
    dongleCard.disabled = true;
    compatNote.hidden = false;
    compatNote.className = "compat-note compat-note--no";
    compatNote.textContent = compat.since
      ? `L'Apple CarPlay / Android Auto de série n'existait pas encore sur le ${model} (${periodLabel}) — disponible à partir de ${compat.since} sur ce modèle. Le remplacement d'écran est la solution recommandée.`
      : `L'Apple CarPlay / Android Auto de série n'a jamais été proposé sur le ${model}. Le remplacement d'écran est la solution recommandée.`;
  } else if (compat.status === "partial") {
    compatBadge.textContent = "⚠️ Compatible en partie sur cette génération";
    compatBadge.className = "compat-badge compat-unknown";
    compatNote.hidden = false;
    compatNote.className = "compat-note compat-note--unknown";
    compatNote.textContent =
      `Sur cette génération (${periodLabel}), l'Apple CarPlay / Android Auto de série n'est apparu qu'à partir de ${compat.since} ` +
      `(restylage ou mise à jour en cours de génération). Vérifiez la date de première mise en circulation exacte de votre véhicule ` +
      `avant de commander un boîtier sans fil, ou optez directement pour le remplacement d'écran.`;
  } else {
    compatBadge.textContent = "⚠️ Compatibilité à vérifier";
    compatBadge.className = "compat-badge compat-unknown";
    compatNote.hidden = false;
    compatNote.className = "compat-note compat-note--unknown";
    compatNote.textContent =
      "Nous n'avons pas encore vérifié précisément la compatibilité CarPlay d'origine pour ce modèle. Avant de commander un boîtier sans fil, vérifiez dans les réglages de votre écran d'origine qu'Apple CarPlay ou Android Auto filaire est déjà présent — ou optez directement pour le remplacement d'écran, universellement compatible.";
  }

  let currentMode = null;
  let currentSort = "featured";

  function setActiveCard(mode) {
    document.querySelectorAll(".choice-card").forEach((card) => {
      card.classList.toggle("choice-card--active", card.dataset.mode === mode);
    });
    document.querySelectorAll(".toggle-btn").forEach((btn) => {
      btn.classList.toggle("toggle-btn--active", btn.dataset.mode === mode);
    });
  }

  function formatStars(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  function buildFeatureList(product) {
    return product.features.map((f) => `<li>${f}</li>`).join("");
  }

  function buildProductCard(product, ribbon) {
    const screenLine = product.screen ? `<span class="product-screen">${product.screen}</span>` : "";
    const ribbonHtml = ribbon ? `<span class="product-ribbon">${ribbon}</span>` : "";
    return `
      <article class="product-card ${ribbon ? "product-card--featured" : ""}">
        ${ribbonHtml}
        <div class="product-icon">${product.icon}</div>
        <h3 class="product-name">${product.name}</h3>
        ${screenLine}
        <div class="product-rating">
          <span class="stars">${formatStars(product.rating)}</span>
          <span class="rating-value">${product.rating.toFixed(1)} (${product.reviews} avis)</span>
        </div>
        <ul class="product-features">${buildFeatureList(product)}</ul>
        <div class="product-footer">
          <div class="product-meta">
            <span class="product-price">${product.price} €</span>
            <span class="product-delivery">🚚 Livraison ${product.deliveryDays} j</span>
          </div>
          <button type="button" class="btn-primary btn-sm" disabled title="Catalogue de démonstration — à connecter à votre inventaire réel">
            Voir l'offre
          </button>
        </div>
      </article>
    `;
  }

  function sortProducts(list, sort) {
    const sorted = list.slice();
    switch (sort) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "delivery":
        return sorted.sort((a, b) => a.deliveryDays - b.deliveryDays);
      default:
        return sorted;
    }
  }

  function renderPodium(list) {
    const cheapest = list.reduce((a, b) => (b.price < a.price ? b : a));
    const fastest = list.reduce((a, b) => (b.deliveryDays < a.deliveryDays ? b : a));
    const best = list.find((p) => p.recommended) || list.reduce((a, b) => (b.rating > a.rating ? b : a));

    const podium = document.getElementById("podium");
    podium.innerHTML = [
      buildProductCard(cheapest, "💰 Le moins cher"),
      buildProductCard(fastest, "⚡ Le plus rapide"),
      buildProductCard(best, "⭐ Le choix PlayAuto")
    ].join("");
  }

  function renderGrid(list, sort) {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = sortProducts(list, sort)
      .map((p) => buildProductCard(p, null))
      .join("");
  }

  function renderProducts(mode) {
    const list = PRODUCTS[mode];
    const title =
      mode === "dongle"
        ? "Boîtiers CarPlay / Android Auto sans fil"
        : "Autoradios & écrans CarPlay / Android Auto";
    document.getElementById("products-title").textContent = title;

    renderPodium(list);
    renderGrid(list, currentSort);
  }

  function selectMode(mode) {
    currentMode = mode;
    setActiveCard(mode);
    renderProducts(mode);
    productsSection.hidden = false;
    productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  dongleCard.addEventListener("click", () => {
    if (dongleCard.disabled) return;
    selectMode("dongle");
  });

  document.getElementById("choice-headunit").addEventListener("click", () => {
    selectMode("headunit");
  });

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.mode === "dongle" && dongleCard.disabled) return;
      selectMode(btn.dataset.mode);
    });
  });

  document.getElementById("sort-select").addEventListener("change", (e) => {
    currentSort = e.target.value;
    if (currentMode) renderGrid(PRODUCTS[currentMode], currentSort);
  });
});
