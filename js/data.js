/**
 * Base de données véhicules : marques -> modèles -> plage d'années.
 * Couverture volontairement large des marques commercialisées en Europe.
 * Plages d'années au niveau "nom commercial" (plusieurs générations regroupées) :
 * à affiner génération par génération quand la compatibilité des autoradios
 * en dépendra (2 DIN vs 1 DIN, connecteur, taille d'écran d'origine...).
 * A terme, ces données pourront venir d'une API / base de données de fitment.
 *
 * Champ `carplayFrom` (optionnel) : année à partir de laquelle le modèle a
 * proposé CarPlay/Android Auto filaire de série sur son écran d'origine.
 *   - nombre  -> compatible à partir de cette année (estimation best-effort,
 *                à confirmer modèle par modèle avant mise en avant commerciale)
 *   - null    -> jamais proposé de série sur ce modèle
 *   - absent  -> compatibilité non vérifiée (traité comme "à vérifier")
 * Renseigné uniquement pour les marques les plus demandées pour l'instant.
 */
const VEHICLES_DB = {
  "Abarth": [
    { model: "500", from: 2008, to: 2024 },
    { model: "595", from: 2013, to: 2024 },
    { model: "124 Spider", from: 2016, to: 2019 },
    { model: "500e", from: 2023, to: 2026 }
  ],
  "Alfa Romeo": [
    { model: "147", from: 2000, to: 2010 },
    { model: "156", from: 1997, to: 2005 },
    { model: "159", from: 2005, to: 2011 },
    { model: "MiTo", from: 2008, to: 2018 },
    { model: "Giulietta", from: 2010, to: 2020 },
    { model: "Giulia", from: 2015, to: 2026 },
    { model: "Stelvio", from: 2017, to: 2026 },
    { model: "Tonale", from: 2022, to: 2026 },
    { model: "4C", from: 2013, to: 2020 }
  ],
  "Alpine": [
    { model: "A110", from: 2017, to: 2026 }
  ],
  "Audi": [
    { model: "A1", from: 2010, to: 2026, carplayFrom: 2019 },
    { model: "A2", from: 1999, to: 2005, carplayFrom: null },
    { model: "A3", from: 1996, to: 2026, carplayFrom: 2017 },
    { model: "A4", from: 1994, to: 2026, carplayFrom: 2016 },
    { model: "A5", from: 2007, to: 2026, carplayFrom: 2016 },
    { model: "A6", from: 1994, to: 2026, carplayFrom: 2018 },
    { model: "A7", from: 2010, to: 2026, carplayFrom: 2018 },
    { model: "A8", from: 1994, to: 2026, carplayFrom: 2017 },
    { model: "Q2", from: 2016, to: 2026, carplayFrom: 2018 },
    { model: "Q3", from: 2011, to: 2026, carplayFrom: 2019 },
    { model: "Q4 e-tron", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Q5", from: 2008, to: 2026, carplayFrom: 2017 },
    { model: "Q7", from: 2005, to: 2026, carplayFrom: 2016 },
    { model: "Q8", from: 2018, to: 2026, carplayFrom: 2018 },
    { model: "TT", from: 1998, to: 2023, carplayFrom: 2018 },
    { model: "e-tron", from: 2018, to: 2023, carplayFrom: 2018 },
    { model: "e-tron GT", from: 2021, to: 2026, carplayFrom: 2021 }
  ],
  "BMW": [
    { model: "Série 1", from: 2004, to: 2026, carplayFrom: 2019 },
    { model: "Série 2", from: 2014, to: 2026, carplayFrom: 2019 },
    { model: "Série 3", from: 1998, to: 2026, carplayFrom: 2019 },
    { model: "Série 4", from: 2013, to: 2026, carplayFrom: 2019 },
    { model: "Série 5", from: 2003, to: 2026, carplayFrom: 2019 },
    { model: "Série 6", from: 2003, to: 2018, carplayFrom: 2019 },
    { model: "Série 7", from: 2001, to: 2026, carplayFrom: 2019 },
    { model: "Série 8", from: 2018, to: 2026, carplayFrom: 2019 },
    { model: "X1", from: 2009, to: 2026, carplayFrom: 2019 },
    { model: "X2", from: 2017, to: 2026, carplayFrom: 2019 },
    { model: "X3", from: 2003, to: 2026, carplayFrom: 2019 },
    { model: "X4", from: 2014, to: 2026, carplayFrom: 2019 },
    { model: "X5", from: 1999, to: 2026, carplayFrom: 2019 },
    { model: "X6", from: 2008, to: 2026, carplayFrom: 2019 },
    { model: "X7", from: 2018, to: 2026, carplayFrom: 2019 },
    { model: "Z4", from: 2002, to: 2026, carplayFrom: 2019 },
    { model: "i3", from: 2013, to: 2022, carplayFrom: 2019 },
    { model: "i4", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "iX", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "iX1", from: 2022, to: 2026, carplayFrom: 2022 },
    { model: "iX3", from: 2020, to: 2026, carplayFrom: 2020 }
  ],
  "BYD": [
    { model: "Atto 3", from: 2022, to: 2026 },
    { model: "Dolphin", from: 2023, to: 2026 },
    { model: "Seal", from: 2023, to: 2026 },
    { model: "Seal U", from: 2023, to: 2026 },
    { model: "Han", from: 2023, to: 2026 },
    { model: "Tang", from: 2023, to: 2026 }
  ],
  "Chevrolet": [
    { model: "Matiz", from: 1998, to: 2015 },
    { model: "Aveo", from: 2002, to: 2015 },
    { model: "Spark", from: 2009, to: 2015 },
    { model: "Cruze", from: 2009, to: 2015 },
    { model: "Orlando", from: 2011, to: 2018 },
    { model: "Captiva", from: 2006, to: 2018 }
  ],
  "Chrysler": [
    { model: "300C", from: 2004, to: 2012 },
    { model: "PT Cruiser", from: 2000, to: 2010 },
    { model: "Voyager / Grand Voyager", from: 1988, to: 2016 }
  ],
  "Citroën": [
    { model: "C1", from: 2005, to: 2022, carplayFrom: null },
    { model: "C2", from: 2003, to: 2009, carplayFrom: null },
    { model: "C3", from: 2002, to: 2026, carplayFrom: 2017 },
    { model: "C3 Aircross", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "C3 Picasso", from: 2009, to: 2017, carplayFrom: null },
    { model: "C4", from: 2004, to: 2026, carplayFrom: 2018 },
    { model: "C4 Cactus", from: 2014, to: 2021, carplayFrom: 2018 },
    { model: "C4 Picasso", from: 2006, to: 2021, carplayFrom: 2018 },
    { model: "C4 SpaceTourer", from: 2013, to: 2021, carplayFrom: 2018 },
    { model: "C4 X", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "C5", from: 2000, to: 2017, carplayFrom: null },
    { model: "C5 Aircross", from: 2018, to: 2026, carplayFrom: 2018 },
    { model: "C5 X", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "C6", from: 2005, to: 2012, carplayFrom: null },
    { model: "C8", from: 2002, to: 2014, carplayFrom: null },
    { model: "C-Elysée", from: 2012, to: 2026 },
    { model: "Berlingo", from: 1996, to: 2026, carplayFrom: 2018 },
    { model: "Jumpy", from: 1994, to: 2026 },
    { model: "Jumper", from: 1994, to: 2026 },
    { model: "Nemo", from: 2007, to: 2015, carplayFrom: null }
  ],
  "Cupra": [
    { model: "Leon", from: 2020, to: 2026 },
    { model: "Formentor", from: 2020, to: 2026 },
    { model: "Ateca", from: 2018, to: 2026 },
    { model: "Born", from: 2021, to: 2026 },
    { model: "Tavascan", from: 2024, to: 2026 }
  ],
  "Dacia": [
    { model: "Logan", from: 2004, to: 2026 },
    { model: "Sandero", from: 2007, to: 2026 },
    { model: "Duster", from: 2010, to: 2026 },
    { model: "Lodgy", from: 2012, to: 2022 },
    { model: "Dokker", from: 2012, to: 2021 },
    { model: "Spring", from: 2021, to: 2026 },
    { model: "Jogger", from: 2021, to: 2026 },
    { model: "Bigster", from: 2024, to: 2026 }
  ],
  "DS": [
    { model: "DS3", from: 2015, to: 2026 },
    { model: "DS4", from: 2011, to: 2026 },
    { model: "DS5", from: 2011, to: 2018 },
    { model: "DS7", from: 2017, to: 2026 },
    { model: "DS9", from: 2021, to: 2026 }
  ],
  "Fiat": [
    { model: "Panda", from: 1980, to: 2026 },
    { model: "Punto", from: 1993, to: 2018 },
    { model: "500", from: 2007, to: 2026 },
    { model: "500X", from: 2014, to: 2026 },
    { model: "500L", from: 2012, to: 2020 },
    { model: "Tipo", from: 2015, to: 2026 },
    { model: "Bravo", from: 2007, to: 2014 },
    { model: "Doblo", from: 2000, to: 2022 },
    { model: "Ducato", from: 1981, to: 2026 },
    { model: "Talento", from: 2016, to: 2021 },
    { model: "Qubo", from: 2008, to: 2021 },
    { model: "Freemont", from: 2011, to: 2016 }
  ],
  "Ford": [
    { model: "Ka", from: 1996, to: 2016, carplayFrom: null },
    { model: "Fiesta", from: 1995, to: 2023, carplayFrom: 2017 },
    { model: "Focus", from: 1998, to: 2025, carplayFrom: 2018 },
    { model: "Mondeo", from: 1993, to: 2022, carplayFrom: 2017 },
    { model: "Puma", from: 2019, to: 2026, carplayFrom: 2019 },
    { model: "Kuga", from: 2008, to: 2026, carplayFrom: 2017 },
    { model: "EcoSport", from: 2013, to: 2021, carplayFrom: 2018 },
    { model: "Edge", from: 2015, to: 2019, carplayFrom: 2018 },
    { model: "S-Max", from: 2006, to: 2023, carplayFrom: 2019 },
    { model: "Galaxy", from: 1995, to: 2023, carplayFrom: 2019 },
    { model: "C-Max", from: 2003, to: 2019, carplayFrom: 2017 },
    { model: "B-Max", from: 2012, to: 2017, carplayFrom: null },
    { model: "Transit", from: 1965, to: 2026, carplayFrom: 2019 },
    { model: "Transit Connect", from: 2002, to: 2026, carplayFrom: 2019 },
    { model: "Transit Custom", from: 2012, to: 2026, carplayFrom: 2019 },
    { model: "Ranger", from: 1998, to: 2026, carplayFrom: 2019 },
    { model: "Mustang Mach-E", from: 2020, to: 2026, carplayFrom: 2020 }
  ],
  "Genesis": [
    { model: "G70", from: 2021, to: 2026 },
    { model: "G80", from: 2021, to: 2026 },
    { model: "GV70", from: 2021, to: 2026 },
    { model: "GV80", from: 2021, to: 2026 }
  ],
  "Honda": [
    { model: "Jazz", from: 2001, to: 2026 },
    { model: "Civic", from: 1995, to: 2026 },
    { model: "CR-V", from: 1995, to: 2026 },
    { model: "HR-V", from: 1998, to: 2026 },
    { model: "e", from: 2019, to: 2024 },
    { model: "Accord", from: 1976, to: 2015 }
  ],
  "Hyundai": [
    { model: "i10", from: 2007, to: 2026 },
    { model: "i20", from: 2008, to: 2026 },
    { model: "i30", from: 2007, to: 2026 },
    { model: "i40", from: 2011, to: 2019 },
    { model: "ix20", from: 2010, to: 2019 },
    { model: "ix35", from: 2009, to: 2015 },
    { model: "Tucson", from: 2004, to: 2026 },
    { model: "Santa Fe", from: 2000, to: 2026 },
    { model: "Kona", from: 2017, to: 2026 },
    { model: "Bayon", from: 2021, to: 2026 },
    { model: "Getz", from: 2002, to: 2011 },
    { model: "Ioniq", from: 2016, to: 2022 },
    { model: "Ioniq 5", from: 2021, to: 2026 },
    { model: "Ioniq 6", from: 2022, to: 2026 }
  ],
  "Jaguar": [
    { model: "X-Type", from: 2001, to: 2009 },
    { model: "S-Type", from: 1998, to: 2008 },
    { model: "XE", from: 2015, to: 2024 },
    { model: "XF", from: 2007, to: 2026 },
    { model: "XJ", from: 2003, to: 2019 },
    { model: "F-Type", from: 2013, to: 2024 },
    { model: "F-Pace", from: 2016, to: 2026 },
    { model: "E-Pace", from: 2017, to: 2026 },
    { model: "I-Pace", from: 2018, to: 2026 }
  ],
  "Jeep": [
    { model: "Renegade", from: 2014, to: 2026 },
    { model: "Compass", from: 2006, to: 2026 },
    { model: "Cherokee", from: 2013, to: 2023 },
    { model: "Grand Cherokee", from: 2010, to: 2026 },
    { model: "Wrangler", from: 2007, to: 2026 },
    { model: "Avenger", from: 2022, to: 2026 }
  ],
  "Kia": [
    { model: "Picanto", from: 2004, to: 2026 },
    { model: "Rio", from: 2000, to: 2026 },
    { model: "Ceed", from: 2006, to: 2026 },
    { model: "Venga", from: 2009, to: 2019 },
    { model: "Soul", from: 2008, to: 2026 },
    { model: "Sportage", from: 1993, to: 2026 },
    { model: "Sorento", from: 2002, to: 2026 },
    { model: "Niro", from: 2016, to: 2026 },
    { model: "Stonic", from: 2017, to: 2026 },
    { model: "XCeed", from: 2019, to: 2026 },
    { model: "EV6", from: 2021, to: 2026 },
    { model: "Carens", from: 1999, to: 2022 },
    { model: "Optima", from: 2000, to: 2020 }
  ],
  "Lancia": [
    { model: "Ypsilon", from: 2003, to: 2026 },
    { model: "Delta", from: 2008, to: 2014 },
    { model: "Musa", from: 2004, to: 2012 },
    { model: "Thesis", from: 2002, to: 2009 }
  ],
  "Land Rover": [
    { model: "Defender", from: 1983, to: 2026 },
    { model: "Discovery", from: 1989, to: 2026 },
    { model: "Discovery Sport", from: 2014, to: 2026 },
    { model: "Freelander", from: 1997, to: 2014 },
    { model: "Range Rover", from: 2002, to: 2026 },
    { model: "Range Rover Sport", from: 2005, to: 2026 },
    { model: "Range Rover Evoque", from: 2011, to: 2026 },
    { model: "Range Rover Velar", from: 2017, to: 2026 }
  ],
  "Lexus": [
    { model: "CT", from: 2010, to: 2022 },
    { model: "IS", from: 1999, to: 2026 },
    { model: "ES", from: 2018, to: 2026 },
    { model: "RX", from: 1998, to: 2026 },
    { model: "NX", from: 2014, to: 2026 },
    { model: "UX", from: 2018, to: 2026 },
    { model: "LC", from: 2017, to: 2026 },
    { model: "LS", from: 1989, to: 2026 }
  ],
  "Maserati": [
    { model: "Quattroporte", from: 2003, to: 2026 },
    { model: "Ghibli", from: 2013, to: 2026 },
    { model: "Levante", from: 2016, to: 2026 },
    { model: "Grecale", from: 2022, to: 2026 }
  ],
  "Mazda": [
    { model: "2", from: 2002, to: 2026 },
    { model: "3", from: 2003, to: 2026 },
    { model: "5", from: 2005, to: 2018 },
    { model: "6", from: 2002, to: 2026 },
    { model: "CX-3", from: 2015, to: 2021 },
    { model: "CX-30", from: 2019, to: 2026 },
    { model: "CX-5", from: 2012, to: 2026 },
    { model: "CX-60", from: 2022, to: 2026 },
    { model: "MX-5", from: 1989, to: 2026 },
    { model: "MX-30", from: 2020, to: 2026 },
    { model: "RX-8", from: 2003, to: 2012 }
  ],
  "Mercedes-Benz": [
    { model: "Classe A", from: 1997, to: 2026, carplayFrom: 2018 },
    { model: "Classe B", from: 2005, to: 2025, carplayFrom: 2015 },
    { model: "Classe C", from: 1993, to: 2026, carplayFrom: 2018 },
    { model: "Classe E", from: 1993, to: 2026, carplayFrom: 2016 },
    { model: "Classe S", from: 2005, to: 2026, carplayFrom: 2017 },
    { model: "CLA", from: 2013, to: 2026, carplayFrom: 2019 },
    { model: "CLS", from: 2004, to: 2023, carplayFrom: 2017 },
    { model: "GLA", from: 2013, to: 2026, carplayFrom: 2017 },
    { model: "GLB", from: 2019, to: 2026, carplayFrom: 2019 },
    { model: "GLC", from: 2015, to: 2026, carplayFrom: 2016 },
    { model: "GLE", from: 2015, to: 2026, carplayFrom: 2018 },
    { model: "GLK", from: 2008, to: 2015, carplayFrom: null },
    { model: "GLS", from: 2016, to: 2026, carplayFrom: 2019 },
    { model: "Classe V", from: 2014, to: 2026, carplayFrom: 2017 },
    { model: "Vito", from: 1996, to: 2026, carplayFrom: 2017 },
    { model: "Sprinter", from: 1995, to: 2026, carplayFrom: 2018 },
    { model: "Citan", from: 2012, to: 2026 },
    { model: "SLK / SLC", from: 1996, to: 2020, carplayFrom: 2017 }
  ],
  "MG": [
    { model: "MG3", from: 2013, to: 2026 },
    { model: "ZS", from: 2017, to: 2026 },
    { model: "HS", from: 2019, to: 2026 },
    { model: "MG4", from: 2022, to: 2026 },
    { model: "MG5", from: 2020, to: 2026 },
    { model: "Cyberster", from: 2024, to: 2026 }
  ],
  "Mini": [
    { model: "One / Cooper", from: 2001, to: 2026 },
    { model: "Clubman", from: 2007, to: 2024 },
    { model: "Countryman", from: 2010, to: 2026 },
    { model: "Cabrio", from: 2004, to: 2026 },
    { model: "Paceman", from: 2012, to: 2016 }
  ],
  "Mitsubishi": [
    { model: "Space Star", from: 1998, to: 2024 },
    { model: "Colt", from: 1992, to: 2012 },
    { model: "Lancer", from: 1973, to: 2016 },
    { model: "ASX", from: 2010, to: 2023 },
    { model: "Eclipse Cross", from: 2017, to: 2026 },
    { model: "Outlander", from: 2001, to: 2026 },
    { model: "L200", from: 1978, to: 2019 }
  ],
  "Nissan": [
    { model: "Micra", from: 1982, to: 2026 },
    { model: "Note", from: 2005, to: 2020 },
    { model: "Juke", from: 2010, to: 2026 },
    { model: "Qashqai", from: 2006, to: 2026 },
    { model: "X-Trail", from: 2001, to: 2026 },
    { model: "Leaf", from: 2010, to: 2026 },
    { model: "Navara", from: 1997, to: 2026 },
    { model: "Primastar / NV300", from: 2001, to: 2026 },
    { model: "Interstar / NV400", from: 2002, to: 2026 },
    { model: "370Z", from: 2009, to: 2020 },
    { model: "GT-R", from: 2007, to: 2026 },
    { model: "Ariya", from: 2022, to: 2026 },
    { model: "Townstar", from: 2021, to: 2026 }
  ],
  "Opel": [
    { model: "Corsa", from: 1993, to: 2026, carplayFrom: 2016 },
    { model: "Astra", from: 1991, to: 2026, carplayFrom: 2016 },
    { model: "Insignia", from: 2008, to: 2022, carplayFrom: 2017 },
    { model: "Meriva", from: 2003, to: 2017, carplayFrom: null },
    { model: "Zafira", from: 1999, to: 2019, carplayFrom: 2016 },
    { model: "Mokka", from: 2012, to: 2026, carplayFrom: 2016 },
    { model: "Crossland", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "Grandland", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "Combo", from: 1994, to: 2026, carplayFrom: 2018 },
    { model: "Vivaro", from: 1996, to: 2026, carplayFrom: 2019 },
    { model: "Movano", from: 1998, to: 2026 },
    { model: "Adam", from: 2013, to: 2019, carplayFrom: 2016 },
    { model: "Karl", from: 2015, to: 2019, carplayFrom: 2016 },
    { model: "Agila", from: 2000, to: 2014, carplayFrom: null },
    { model: "Antara", from: 2006, to: 2015, carplayFrom: null },
    { model: "Signum", from: 2003, to: 2008, carplayFrom: null },
    { model: "Vectra", from: 1995, to: 2008, carplayFrom: null },
    { model: "Tigra", from: 1994, to: 2009, carplayFrom: null }
  ],
  "Peugeot": [
    { model: "106", from: 1991, to: 2003, carplayFrom: null },
    { model: "107", from: 2005, to: 2014, carplayFrom: null },
    { model: "108", from: 2014, to: 2021, carplayFrom: null },
    { model: "206", from: 1998, to: 2012, carplayFrom: null },
    { model: "207", from: 2006, to: 2014, carplayFrom: null },
    { model: "208", from: 2012, to: 2026, carplayFrom: 2017 },
    { model: "2008", from: 2013, to: 2026, carplayFrom: 2017 },
    { model: "301", from: 2012, to: 2026, carplayFrom: null },
    { model: "307", from: 2001, to: 2008, carplayFrom: null },
    { model: "308", from: 2007, to: 2026, carplayFrom: 2017 },
    { model: "3008", from: 2009, to: 2026, carplayFrom: 2016 },
    { model: "407", from: 2004, to: 2011, carplayFrom: null },
    { model: "408", from: 2010, to: 2026, carplayFrom: 2018 },
    { model: "5008", from: 2009, to: 2026, carplayFrom: 2017 },
    { model: "508", from: 2010, to: 2026, carplayFrom: 2018 },
    { model: "Partner", from: 1996, to: 2026, carplayFrom: 2018 },
    { model: "Rifter", from: 2018, to: 2026, carplayFrom: 2018 },
    { model: "Expert", from: 1995, to: 2026, carplayFrom: 2018 },
    { model: "Traveller", from: 2016, to: 2026, carplayFrom: 2018 },
    { model: "RCZ", from: 2010, to: 2015, carplayFrom: null }
  ],
  "Porsche": [
    { model: "911", from: 1997, to: 2026 },
    { model: "Boxster / Cayman", from: 1996, to: 2026 },
    { model: "Cayenne", from: 2002, to: 2026 },
    { model: "Macan", from: 2014, to: 2026 },
    { model: "Panamera", from: 2009, to: 2026 },
    { model: "Taycan", from: 2019, to: 2026 }
  ],
  "Renault": [
    { model: "Twingo", from: 1993, to: 2026, carplayFrom: null },
    { model: "Clio", from: 1990, to: 2026, carplayFrom: 2019 },
    { model: "Captur", from: 2013, to: 2026, carplayFrom: 2019 },
    { model: "Mégane", from: 1995, to: 2026, carplayFrom: 2020 },
    { model: "Scénic", from: 1996, to: 2026, carplayFrom: 2020 },
    { model: "Kadjar", from: 2015, to: 2022, carplayFrom: 2019 },
    { model: "Austral", from: 2022, to: 2026, carplayFrom: 2022 },
    { model: "Talisman", from: 2015, to: 2022, carplayFrom: 2020 },
    { model: "Laguna", from: 1994, to: 2015, carplayFrom: null },
    { model: "Espace", from: 1984, to: 2026, carplayFrom: 2020 },
    { model: "Kangoo", from: 1997, to: 2026, carplayFrom: 2021 },
    { model: "Trafic", from: 1980, to: 2026, carplayFrom: 2021 },
    { model: "Master", from: 1980, to: 2026 },
    { model: "Zoe", from: 2012, to: 2024, carplayFrom: 2019 },
    { model: "Arkana", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Symbioz", from: 2023, to: 2026, carplayFrom: 2023 },
    { model: "Koleos", from: 2008, to: 2026, carplayFrom: 2019 },
    { model: "Fluence", from: 2009, to: 2016, carplayFrom: null },
    { model: "Modus", from: 2004, to: 2012, carplayFrom: null }
  ],
  "Saab": [
    { model: "9-3", from: 1998, to: 2012 },
    { model: "9-5", from: 1997, to: 2012 }
  ],
  "Seat": [
    { model: "Ibiza", from: 1984, to: 2026 },
    { model: "Leon", from: 1999, to: 2026 },
    { model: "Arona", from: 2017, to: 2026 },
    { model: "Ateca", from: 2016, to: 2026 },
    { model: "Tarraco", from: 2018, to: 2026 },
    { model: "Alhambra", from: 1996, to: 2020 },
    { model: "Mii", from: 2011, to: 2019 },
    { model: "Toledo", from: 1991, to: 2019 },
    { model: "Cordoba", from: 1993, to: 2009 }
  ],
  "Skoda": [
    { model: "Citigo", from: 2011, to: 2020 },
    { model: "Fabia", from: 1999, to: 2026 },
    { model: "Rapid", from: 2012, to: 2019 },
    { model: "Scala", from: 2019, to: 2026 },
    { model: "Octavia", from: 1996, to: 2026 },
    { model: "Kamiq", from: 2019, to: 2026 },
    { model: "Karoq", from: 2017, to: 2026 },
    { model: "Yeti", from: 2009, to: 2017 },
    { model: "Kodiaq", from: 2016, to: 2026 },
    { model: "Superb", from: 2001, to: 2026 },
    { model: "Roomster", from: 2006, to: 2015 },
    { model: "Enyaq", from: 2020, to: 2026 }
  ],
  "Smart": [
    { model: "Fortwo", from: 1998, to: 2026 },
    { model: "Forfour", from: 2004, to: 2026 },
    { model: "Roadster", from: 2003, to: 2005 }
  ],
  "SsangYong": [
    { model: "Tivoli", from: 2015, to: 2026 },
    { model: "Korando", from: 2010, to: 2026 },
    { model: "Rexton", from: 2001, to: 2026 },
    { model: "Musso", from: 2018, to: 2026 },
    { model: "Torres", from: 2022, to: 2026 }
  ],
  "Subaru": [
    { model: "Impreza", from: 1992, to: 2026 },
    { model: "Forester", from: 1997, to: 2026 },
    { model: "XV / Crosstrek", from: 2011, to: 2026 },
    { model: "Outback", from: 1994, to: 2026 },
    { model: "Legacy", from: 1989, to: 2021 },
    { model: "Levorg", from: 2015, to: 2026 },
    { model: "BRZ", from: 2012, to: 2026 }
  ],
  "Suzuki": [
    { model: "Swift", from: 1983, to: 2026 },
    { model: "Ignis", from: 2000, to: 2026 },
    { model: "Baleno", from: 2015, to: 2019 },
    { model: "Vitara", from: 1988, to: 2026 },
    { model: "S-Cross", from: 2013, to: 2026 },
    { model: "Jimny", from: 1998, to: 2026 },
    { model: "Celerio", from: 2014, to: 2020 },
    { model: "Splash", from: 2008, to: 2015 },
    { model: "SX4", from: 2006, to: 2014 }
  ],
  "Tesla": [
    { model: "Model S", from: 2012, to: 2026 },
    { model: "Model 3", from: 2017, to: 2026 },
    { model: "Model X", from: 2015, to: 2026 },
    { model: "Model Y", from: 2020, to: 2026 }
  ],
  "Toyota": [
    { model: "Aygo", from: 2005, to: 2022, carplayFrom: null },
    { model: "Aygo X", from: 2022, to: 2026, carplayFrom: 2022 },
    { model: "Yaris", from: 1999, to: 2026, carplayFrom: 2020 },
    { model: "Yaris Cross", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Corolla", from: 2001, to: 2026, carplayFrom: 2019 },
    { model: "Auris", from: 2006, to: 2018, carplayFrom: null },
    { model: "C-HR", from: 2016, to: 2026, carplayFrom: 2019 },
    { model: "RAV4", from: 1994, to: 2026, carplayFrom: 2019 },
    { model: "Prius", from: 1997, to: 2026, carplayFrom: 2019 },
    { model: "Avensis", from: 1997, to: 2018, carplayFrom: null },
    { model: "Camry", from: 2018, to: 2026, carplayFrom: 2019 },
    { model: "Land Cruiser", from: 2002, to: 2026, carplayFrom: 2021 },
    { model: "Hilux", from: 2005, to: 2026, carplayFrom: 2020 },
    { model: "Verso", from: 2004, to: 2018, carplayFrom: null },
    { model: "ProAce", from: 2016, to: 2026, carplayFrom: 2020 },
    { model: "bZ4X", from: 2022, to: 2026, carplayFrom: 2022 }
  ],
  "Volkswagen": [
    { model: "up!", from: 2011, to: 2023, carplayFrom: 2016 },
    { model: "Polo", from: 2001, to: 2026, carplayFrom: 2018 },
    { model: "Golf", from: 1997, to: 2026, carplayFrom: 2017 },
    { model: "Passat", from: 1996, to: 2026, carplayFrom: 2015 },
    { model: "Arteon", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "Scirocco", from: 2008, to: 2017, carplayFrom: null },
    { model: "Beetle", from: 1998, to: 2019, carplayFrom: 2016 },
    { model: "CC", from: 2008, to: 2017, carplayFrom: null },
    { model: "Tiguan", from: 2007, to: 2026, carplayFrom: 2016 },
    { model: "Touran", from: 2003, to: 2023, carplayFrom: 2016 },
    { model: "Touareg", from: 2002, to: 2026, carplayFrom: 2018 },
    { model: "T-Roc", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "T-Cross", from: 2019, to: 2026, carplayFrom: 2019 },
    { model: "Taigo", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Sharan", from: 1995, to: 2022, carplayFrom: 2015 },
    { model: "Caddy", from: 2004, to: 2026, carplayFrom: 2020 },
    { model: "Transporter / Multivan", from: 2003, to: 2026, carplayFrom: 2020 },
    { model: "Amarok", from: 2010, to: 2026, carplayFrom: 2023 },
    { model: "ID.3", from: 2020, to: 2026, carplayFrom: 2020 },
    { model: "ID.4", from: 2020, to: 2026, carplayFrom: 2020 },
    { model: "ID.5", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "ID.7", from: 2023, to: 2026, carplayFrom: 2023 }
  ],
  "Volvo": [
    { model: "S40", from: 1995, to: 2012 },
    { model: "S60", from: 2000, to: 2026 },
    { model: "S80", from: 1998, to: 2016 },
    { model: "S90", from: 2016, to: 2026 },
    { model: "V40", from: 1995, to: 2019 },
    { model: "V50", from: 2004, to: 2012 },
    { model: "V60", from: 2010, to: 2026 },
    { model: "V70", from: 1996, to: 2016 },
    { model: "V90", from: 2016, to: 2026 },
    { model: "XC40", from: 2017, to: 2026 },
    { model: "XC60", from: 2008, to: 2026 },
    { model: "XC70", from: 1997, to: 2016 },
    { model: "XC90", from: 2002, to: 2026 },
    { model: "C30", from: 2006, to: 2013 },
    { model: "C40", from: 2021, to: 2026 },
    { model: "EX30", from: 2023, to: 2026 }
  ]
};

const POPULAR_BRANDS = [
  "Volkswagen", "Peugeot", "Renault", "Citroën", "Opel",
  "Ford", "Toyota", "BMW", "Mercedes-Benz", "Audi"
];
