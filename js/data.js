/**
 * Base de données véhicules : marques -> modèles -> plage d'années.
 * A terme, ces données pourront venir d'une API / base de données.
 */
const VEHICLES_DB = {
  "Peugeot": [
    { model: "108", from: 2014, to: 2021 },
    { model: "208", from: 2012, to: 2025 },
    { model: "2008", from: 2013, to: 2025 },
    { model: "308", from: 2013, to: 2025 },
    { model: "3008", from: 2016, to: 2025 },
    { model: "5008", from: 2017, to: 2025 },
    { model: "508", from: 2010, to: 2025 },
    { model: "Partner", from: 2008, to: 2025 }
  ],
  "Renault": [
    { model: "Clio", from: 2012, to: 2025 },
    { model: "Captur", from: 2013, to: 2025 },
    { model: "Mégane", from: 2008, to: 2025 },
    { model: "Scénic", from: 2009, to: 2025 },
    { model: "Kadjar", from: 2015, to: 2022 },
    { model: "Austral", from: 2022, to: 2025 },
    { model: "Twingo", from: 2007, to: 2025 },
    { model: "Talisman", from: 2015, to: 2022 }
  ],
  "Citroën": [
    { model: "C3", from: 2009, to: 2025 },
    { model: "C4", from: 2010, to: 2025 },
    { model: "C4 Picasso", from: 2013, to: 2020 },
    { model: "C5 Aircross", from: 2018, to: 2025 },
    { model: "Berlingo", from: 2008, to: 2025 },
    { model: "DS3", from: 2010, to: 2019 }
  ],
  "Volkswagen": [
    { model: "Polo", from: 2009, to: 2025 },
    { model: "Golf", from: 2008, to: 2025 },
    { model: "Passat", from: 2010, to: 2025 },
    { model: "Tiguan", from: 2007, to: 2025 },
    { model: "T-Roc", from: 2017, to: 2025 },
    { model: "Touran", from: 2010, to: 2023 },
    { model: "Caddy", from: 2010, to: 2025 }
  ],
  "Toyota": [
    { model: "Yaris", from: 2011, to: 2025 },
    { model: "Corolla", from: 2013, to: 2025 },
    { model: "C-HR", from: 2016, to: 2025 },
    { model: "RAV4", from: 2013, to: 2025 },
    { model: "Aygo", from: 2014, to: 2022 }
  ],
  "Dacia": [
    { model: "Sandero", from: 2012, to: 2025 },
    { model: "Duster", from: 2010, to: 2025 },
    { model: "Logan", from: 2012, to: 2025 },
    { model: "Jogger", from: 2021, to: 2025 },
    { model: "Spring", from: 2021, to: 2025 }
  ],
  "BMW": [
    { model: "Série 1", from: 2011, to: 2025 },
    { model: "Série 2", from: 2014, to: 2025 },
    { model: "Série 3", from: 2012, to: 2025 },
    { model: "Série 5", from: 2010, to: 2025 },
    { model: "X1", from: 2015, to: 2025 },
    { model: "X3", from: 2010, to: 2025 }
  ],
  "Audi": [
    { model: "A1", from: 2010, to: 2025 },
    { model: "A3", from: 2012, to: 2025 },
    { model: "A4", from: 2007, to: 2025 },
    { model: "Q3", from: 2011, to: 2025 },
    { model: "Q5", from: 2008, to: 2025 }
  ],
  "Mercedes-Benz": [
    { model: "Classe A", from: 2012, to: 2025 },
    { model: "Classe B", from: 2011, to: 2025 },
    { model: "Classe C", from: 2007, to: 2025 },
    { model: "GLA", from: 2014, to: 2025 },
    { model: "Vito", from: 2014, to: 2025 }
  ],
  "Ford": [
    { model: "Fiesta", from: 2008, to: 2023 },
    { model: "Focus", from: 2011, to: 2025 },
    { model: "Kuga", from: 2013, to: 2025 },
    { model: "Puma", from: 2019, to: 2025 },
    { model: "Transit", from: 2014, to: 2025 }
  ],
  "Nissan": [
    { model: "Micra", from: 2010, to: 2023 },
    { model: "Juke", from: 2010, to: 2025 },
    { model: "Qashqai", from: 2007, to: 2025 },
    { model: "X-Trail", from: 2014, to: 2025 }
  ],
  "Opel": [
    { model: "Corsa", from: 2006, to: 2025 },
    { model: "Astra", from: 2009, to: 2025 },
    { model: "Crossland", from: 2017, to: 2025 },
    { model: "Grandland", from: 2017, to: 2025 }
  ],
  "Fiat": [
    { model: "500", from: 2007, to: 2025 },
    { model: "Panda", from: 2012, to: 2025 },
    { model: "Tipo", from: 2015, to: 2025 },
    { model: "500X", from: 2014, to: 2025 }
  ],
  "Seat": [
    { model: "Ibiza", from: 2008, to: 2025 },
    { model: "Leon", from: 2012, to: 2025 },
    { model: "Arona", from: 2017, to: 2025 },
    { model: "Ateca", from: 2016, to: 2025 }
  ],
  "Skoda": [
    { model: "Fabia", from: 2007, to: 2025 },
    { model: "Octavia", from: 2012, to: 2025 },
    { model: "Kamiq", from: 2019, to: 2025 },
    { model: "Karoq", from: 2017, to: 2025 }
  ],
  "Hyundai": [
    { model: "i10", from: 2013, to: 2025 },
    { model: "i20", from: 2014, to: 2025 },
    { model: "Tucson", from: 2015, to: 2025 },
    { model: "Kona", from: 2017, to: 2025 }
  ],
  "Kia": [
    { model: "Picanto", from: 2011, to: 2025 },
    { model: "Rio", from: 2011, to: 2025 },
    { model: "Sportage", from: 2010, to: 2025 },
    { model: "Niro", from: 2016, to: 2025 }
  ]
};

const POPULAR_BRANDS = [
  "Peugeot", "Renault", "Citroën", "Volkswagen", "Dacia", "Toyota"
];
