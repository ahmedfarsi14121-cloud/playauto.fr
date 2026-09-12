document.addEventListener("DOMContentLoaded", () => {
  const brandSelect = document.getElementById("brand-select");
  const modelSelect = document.getElementById("model-select");
  const yearSelect = document.getElementById("year-select");
  const submitBtn = document.getElementById("submit-btn");
  const formHint = document.getElementById("form-hint");
  const form = document.getElementById("vehicle-form");
  const brandGrid = document.getElementById("brand-grid");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function resetSelect(select, placeholder) {
    select.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.disabled = true;
    opt.selected = true;
    opt.textContent = placeholder;
    select.appendChild(opt);
  }

  function fillBrands() {
    resetSelect(brandSelect, "Choisissez une marque");
    Object.keys(VEHICLES_DB)
      .sort((a, b) => a.localeCompare(b))
      .forEach((brand) => {
        const opt = document.createElement("option");
        opt.value = brand;
        opt.textContent = brand;
        brandSelect.appendChild(opt);
      });
  }

  function fillModels(brand) {
    resetSelect(modelSelect, "Choisissez un modèle");
    modelSelect.disabled = true;
    resetSelect(yearSelect, "Choisissez d'abord un modèle");
    yearSelect.disabled = true;
    submitBtn.disabled = true;

    const models = VEHICLES_DB[brand];
    if (!models) return;

    models
      .slice()
      .sort((a, b) => a.model.localeCompare(b.model))
      .forEach(({ model }) => {
        const opt = document.createElement("option");
        opt.value = model;
        opt.textContent = model;
        modelSelect.appendChild(opt);
      });

    modelSelect.disabled = false;
  }

  function fillYears(brand, model) {
    resetSelect(yearSelect, "Choisissez une année");
    yearSelect.disabled = true;
    submitBtn.disabled = true;

    const entry = (VEHICLES_DB[brand] || []).find((m) => m.model === model);
    if (!entry) return;

    for (let y = entry.to; y >= entry.from; y--) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    }

    yearSelect.disabled = false;
  }

  function renderBrandGrid() {
    if (!brandGrid) return;
    brandGrid.innerHTML = "";
    POPULAR_BRANDS.forEach((brand) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "brand-card";
      card.textContent = brand;
      card.addEventListener("click", () => {
        brandSelect.value = brand;
        brandSelect.dispatchEvent(new Event("change"));
        document.getElementById("vehicle-form").scrollIntoView({ behavior: "smooth", block: "center" });
      });
      brandGrid.appendChild(card);
    });
  }

  brandSelect.addEventListener("change", () => {
    fillModels(brandSelect.value);
    formHint.textContent = "";
  });

  modelSelect.addEventListener("change", () => {
    fillYears(brandSelect.value, modelSelect.value);
    formHint.textContent = "";
  });

  yearSelect.addEventListener("change", () => {
    submitBtn.disabled = !yearSelect.value;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;

    if (!brand || !model || !year) {
      formHint.textContent = "Merci de compléter les 3 champs.";
      return;
    }

    const params = new URLSearchParams({ brand, model, year });
    window.location.href = `resultats.html?${params.toString()}`;
  });

  fillBrands();
  renderBrandGrid();
});
