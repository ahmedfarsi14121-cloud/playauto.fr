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
 *
 * Champ `phases` (optionnel) : découpage du modèle par génération, à utiliser
 * dans le formulaire à la place d'une liste année par année quand le tableau
 * de bord / emplacement de l'autoradio ne change qu'au changement de
 * génération. Chaque phase : { label, from, to, image? }. Modèle sans
 * `phases` -> comportement inchangé (sélection année par année). Découpage
 * estimé à partir de la connaissance générale du marché, à vérifier avant
 * usage commercial (voir deliverables/playauto_vehicules_phases.xlsx).
 *
 * Champ `image` (optionnel, sur une phase ou directement sur un modèle sans
 * phases) : URL de la photo du tableau de bord à afficher sur la page
 * résultats. PROVISOIRE — plusieurs valeurs actuelles pointent vers des
 * liens externes temporaires (photos de presse tierces, parfois avec jeton
 * d'URL expirant) fournis pour tester l'affichage uniquement. À remplacer
 * par des photos hébergées sur le site (images/dashboards/, voir
 * loadDashboardPhoto dans results.js) dès qu'elles sont disponibles :
 * il suffira de retirer ce champ `image` pour retomber automatiquement
 * sur la convention de nommage locale.
 */
const VEHICLES_DB = {
  "Abarth": [
    { model: "500", from: 2008, to: 2024, image: "https://www.netcarshow.com/Fiat-500_Abarth-2009-1280-629baeab852dbc32eeb8c7ac826fd326f6.jpg" },
    { model: "595", from: 2013, to: 2024, image: "https://www.netcarshow.com/Fiat-595_Abarth-2017-1280-db1973b060932873a1ad3d3011aa84b0d8.jpg" },
    { model: "124 Spider", from: 2016, to: 2019, image: "https://www.netcarshow.com/Fiat-124_Spider_Abarth-2017-1280-6623f6987393d37576cc901ad193a0b6ca.jpg" },
    { model: "500e", from: 2023, to: 2026, image: "https://www.netcarshow.com/Fiat-500e_Abarth-2023-1280-59b341409e3b264f4b4396ef5146db2927.jpg?token=c0c2499e111776e5cf956e8abb2ca7d37cca984ccae79002f7b05ee" }
  ],
  "Alfa Romeo": [
    { model: "147", from: 2000, to: 2010, image: "https://www.netcarshow.com/Alfa_Romeo-147-2000-1280-0e630af1883a1cc7d234bb3672c4c2dd9e.jpg" },
    { model: "156", from: 1997, to: 2005, image: "https://www.netcarshow.com/Alfa_Romeo-156_2.4_JTD-2003-1280-b9625e0423959ce104caac53520a4e96ad.jpg?token=84d88b8b111772e5ce956e8abb2c33ef3d46b24ae01d90086eda10c" },
    { model: "159", from: 2005, to: 2011, image: "https://www.netcarshow.com/Alfa_Romeo-159-2005-1280-5b68ec988ec4b54c4daeb47d826538583b.jpg" },
    { model: "MiTo", from: 2008, to: 2018, image: "https://www.netcarshow.com/Alfa_Romeo-MiTo-2014-1280-9b27b2a5974183b80c3dc6723386a5b23e.jpg?token=7caa2840111778e5cd956e8abb2d845e234a05327994500269fa5a6" },
    { model: "Giulietta", from: 2010, to: 2020, image: "https://www.netcarshow.com/Alfa_Romeo-Giulietta-2011-1280-2f38a9132a2d37671f4c4717a841890916.jpg" },
    { model: "Giulia", from: 2015, to: 2026, image: "https://www.netcarshow.com/Alfa_Romeo-Giulia-2016-1280-17edd0da7f68fffb56221948b26e9a5e1e.jpg?token=e7637c7e111774e5cd956e8abb2ebb4e762616687aa1100054cd8dc" },
    { model: "Stelvio", from: 2017, to: 2026, image: "https://www.netcarshow.com/Alfa_Romeo-Stelvio-2018-1280-443fa3aba12954102dc35c689adbd71d5e.jpg?token=94c2a450111776e5cb956e8abb237bfd027ac9205dd078f821370e2" },
    { model: "Tonale", from: 2022, to: 2026, image: "https://www.netcarshow.com/Alfa_Romeo-Tonale-2023-1280-0223f1d64c80cb5a1323e0a9466e3d08cd.jpg?token=3cb787f5111774e5ce956e8abb270fb1296e41fa128170090006534" },
    { model: "4C", from: 2013, to: 2020, image: "https://www.netcarshow.com/Alfa_Romeo-4C-2014-1280-f6f84e68ad7d2ccb22d5bc4e850b71057a.jpg" }
  ],
  "Alpine": [
    { model: "A110", from: 2017, to: 2026, image: "https://www.netcarshow.com/Alpine-A110-2018-1280-685a69eeffbddbd6d8db2295636bbb301b.jpg?token=4481b09d111776e5cd956e8abb2d3503539eabfeb631100194291cf" }
  ],
  "Audi": [
    { model: "A1", from: 2010, to: 2026, carplayFrom: 2019, phases: [{ label: "avant GB", from: 2010, to: 2019, image: "https://www.netcarshow.com/Audi-A1-2011-1280-d2401496bf0982acca244d38f82e7db051.jpg" }, { label: "GB", from: 2019, to: 2026, image: "https://www.netcarshow.com/Audi-A1_Sportback-2019-1280-db112c2306d0bdc491e35a0ca56207771a.jpg?token=dc088adb111778e5cb956e8abb2d88c64c8a56281a45d00a590489d" }] },
    { model: "A2", from: 1999, to: 2005, carplayFrom: null, image: "https://www.netcarshow.com/Audi-A2-2000-1280-869d0c9f3a7ba046daddd11ca25567c22d.jpg" },
    { model: "A3", from: 1996, to: 2026, carplayFrom: 2017, phases: [{ label: "avant 8V", from: 1996, to: 2012, image: "https://www.netcarshow.com/Audi-A3_5-door-2000-1280-d8cdb1993bff6e70b5915a8f711c259036.jpg?token=d45eacd211177ce5cf956e8abb28a1f3d0ea0969f0df300134f019e" }, { label: "8V", from: 2012, to: 2020, image: "https://www.netcarshow.com/Audi-A3-2011-1280-f0769173f8c4df4c27dd24fa7084652b3d.jpg" }, { label: "8Y", from: 2020, to: 2026, image: "https://www.forum-audi.com/img/members/5/5-nouvelle-audi-a3-8y.jpg" }] },
    { model: "A4", from: 1994, to: 2026, carplayFrom: 2016, phases: [{ label: "avant B9", from: 1994, to: 2016, image: "https://www.netcarshow.com/Audi-A3_5-door-2000-1280-d8cdb1993bff6e70b5915a8f711c259036.jpg?token=d45eacd211177ce5cf956e8abb28a1f3d0ea0969f0df300134f019e" }, { label: "B9", from: 2016, to: 2023, image: "https://www.netcarshow.com/Audi-A3-2017-1280-47590a1a0265703874e36087f110f234d9.jpg" }, { label: "génération actuelle", from: 2023, to: 2026, image: "https://www.forum-audi.com/img/members/5/5-nouvelle-audi-a3-8y.jpg" }] },
    { model: "A5", from: 2007, to: 2026, carplayFrom: 2016, phases: [{ label: "8T", from: 2007, to: 2016 }, { label: "F5", from: 2016, to: 2026 }] },
    { model: "A6", from: 1994, to: 2026, carplayFrom: 2018, phases: [{ label: "avant C7", from: 1994, to: 2011 }, { label: "C7", from: 2011, to: 2018 }, { label: "C8", from: 2018, to: 2026 }] },
    { model: "A7", from: 2010, to: 2026, carplayFrom: 2018, phases: [{ label: "4G", from: 2010, to: 2018 }, { label: "4K / C8", from: 2018, to: 2026 }] },
    { model: "A8", from: 1994, to: 2026, carplayFrom: 2017, phases: [{ label: "avant D5", from: 1994, to: 2017 }, { label: "D5", from: 2017, to: 2026 }] },
    { model: "Q2", from: 2016, to: 2026, carplayFrom: 2018, phases: [{ label: "avant restylage 2020", from: 2016, to: 2020 }, { label: "après restylage 2020 (MMI tactile)", from: 2020, to: 2026 }] },
    { model: "Q3", from: 2011, to: 2026, carplayFrom: 2019, phases: [{ label: "avant F3", from: 2011, to: 2019, image: "https://www.netcarshow.com/Audi-Q3-2015-1280-4d346fe6da728331c0d41e357237ee7fb2.jpg" }, { label: "F3", from: 2019, to: 2026, image: "https://www.netcarshow.com/Audi-Q3-2019-1280-6a90167dd536378dbc4bd37c04f487636b.jpg?token=3459a7d0111772e5ca956e8abb241d8ad0eaaeb404c450000985f1d" }] },
    { model: "Q4 e-tron", from: 2021, to: 2026, carplayFrom: 2021, image: "https://www.netcarshow.com/Audi-Q4_e-tron-2022-1280-2d736b2b5c7b0473e5c3721598b49d2e35.jpg?token=3da440b311177ae5cd956e8abb293b39416adefb0e4d50096e666eb" },
    { model: "Q5", from: 2008, to: 2026, carplayFrom: 2017, phases: [{ label: "avant FY", from: 2008, to: 2017, image: "https://www.netcarshow.com/Audi-Q5-2009-1280-161a09cc2751df1fc524cc4ed46a140b95.jpg" }, { label: "FY", from: 2017, to: 2026, image: "https://www.netcarshow.com/Audi-Q5-2017-1280-b5fef4c0e51b0c54d051feefa7777fb3c4.jpg?token=963d6d09111778e5cc956e8abb2ffa1cfe265d85d0ead00b7d8cfa4" }] },
    { model: "Q7", from: 2005, to: 2026, carplayFrom: 2016, phases: [{ label: "4L", from: 2005, to: 2015 }, { label: "4M", from: 2015, to: 2026 }] },
    { model: "Q8", from: 2018, to: 2026, carplayFrom: 2018, phases: [{ label: "avant restylage 2023", from: 2018, to: 2023 }, { label: "après restylage 2023", from: 2023, to: 2026 }] },
    { model: "TT", from: 1998, to: 2023, carplayFrom: 2018, phases: [{ label: "avant 8S", from: 1998, to: 2014 }, { label: "8S", from: 2014, to: 2023 }] },
    { model: "e-tron", from: 2018, to: 2023, carplayFrom: 2018 },
    { model: "e-tron GT", from: 2021, to: 2026, carplayFrom: 2021 }
  ],
  "BMW": [
    { model: "Série 1", from: 2004, to: 2026, carplayFrom: 2019, phases: [{ label: "F20", from: 2011, to: 2019, image: "https://www.netcarshow.com/BMW-1-Series-2012-1280-810e7bb84ee8612e571cc0f03481740d96.jpg?token=257e93e611177ee5cb956e8abb2e1efcae52225c0f34500de3a8bda" }, { label: "F40", from: 2019, to: 2026, image: "https://www.netcarshow.com/BMW-1-Series-2020-1280-f8b3face8e5f322ccbbdbf7af50dd589e5.jpg?token=fa2a60f8111774e5cb956e8abb228dada34a51ba300dd00537a79bc" }] },
    { model: "Série 2", from: 2014, to: 2026, carplayFrom: 2019, phases: [{ label: "F22", from: 2014, to: 2021, image: "https://www.netcarshow.com/BMW-2-Series_Convertible-2015-1280-614d778afa582961afe14f8859e8e1f285.jpg?token=191af92411177ce5ce956e8abb20ab25e832be1c6ba95008c5f723c" }, { label: "génération actuelle", from: 2021, to: 2026, image: "https://www.netcarshow.com/BMW-2-Series_Gran_Coupe-2020-1280-01b9e6486b94314135ac145e75485ea56b.jpg?token=11cdbf9f111774e5cf956e8abb242c86d2aefbe437fa700075aa382" }] },
    { model: "Série 3", from: 1998, to: 2026, carplayFrom: 2019, phases: [{ label: "avant F30", from: 1998, to: 2012, image: "https://consumerguide.com/wp-content/uploads/2014/05/99602091990301.jpg" }, { label: "F30", from: 2012, to: 2019, image: "https://www.netcarshow.com/BMW-3-Series-2016-1280-16319affde37aa54e6247b2456c7a947ca.jpg?token=13aae5f9111778e5cc956e8abb2e7ff1b96ed5bd1c3dd00cc3d3ec4" }, { label: "G20", from: 2019, to: 2026, image: "https://www.netcarshow.com/BMW-3-Series-2019-1280-10d51c41c4cd5aedefc4776c73ee288e58.jpg?token=89cac6ac11177ce5cd956e8abb2480a8cfce785b5f56100aa54beea" }] },
    { model: "Série 4", from: 2013, to: 2026, carplayFrom: 2019, phases: [{ label: "F32", from: 2013, to: 2020, image: "https://www.netcarshow.com/BMW-4-Series_Coupe-2014-1280-28c8abc55ca3344424d10a1f54d0a4a02b.jpg?token=cbc666c711177ee5cc956e8abb281f6bb6caf6801365500e0aefc15" }, { label: "G22", from: 2020, to: 2026, image: "https://www.netcarshow.com/BMW-4-Series_Gran_Coupe-2022-1280-17d1ad427a87153c3c6edc04157a6fa2c4.jpg?token=facd8040111776e5cd956e8abb228206d9ca736bcd9e5001f766996" }] },
    { model: "Série 5", from: 2003, to: 2026, carplayFrom: 2019, phases: [{ label: "F10", from: 2010, to: 2017, image: "https://www.netcarshow.com/BMW-5-Series-2011-1280-661780101f3e138276fc68127b238f59d0.jpg?token=7a6365fa111778e5cf956e8abb200e440deead60c88510048ae4e73" }, { label: "G30", from: 2017, to: 2023, image: "https://www.netcarshow.com/BMW-5-Series-2017-1280-954129611c7657e1088a58a089996370e3.jpg?token=4a8e397511177ee5cf956e8abb2152f2aa029e7c9c72d00b2f392ae" }, { label: "G60", from: 2023, to: 2026, image: "https://www.netcarshow.com/BMW-5-Series-2021-1280-b6c93dd6f5f82a69113cedacf6a9546772.jpg?token=314cd2cb111778e5ce956e8abb29a433074e458ebdf670081351073" }] },
    { model: "Série 6", from: 2003, to: 2018, carplayFrom: 2019, phases: [{ label: "avant F12/F13", from: 2003, to: 2011 }, { label: "F12/F13", from: 2011, to: 2018, image: "https://www.netcarshow.com/BMW-6-Series_Convertible-2015-1280-8b1106b6ffee8aae3a0ad12b55e997f9ea.jpg?token=64550c3a11177ee5ce956e8abb2022ceb156e39eea8a900a70f8cbb" }] },
    { model: "Série 7", from: 2001, to: 2026, carplayFrom: 2019, phases: [{ label: "avant G11", from: 2001, to: 2015, image: "https://www.netcarshow.com/BMW-7-Series-2013-1280-d4acf496706c9b5c48877ed5e3ceb3fdfc.jpg" }, { label: "G11", from: 2015, to: 2022, image: "https://www.netcarshow.com/BMW-7-Series-2016-1280-e25f1a1c8b80c4cbf73a253fe3c787f647.jpg" }, { label: "G70", from: 2022, to: 2026, image: "https://www.netcarshow.com/BMW-7-Series-2023-1280-5b106866664d26723c1860c3e3030a0b20.jpg?token=a52254de111776e5cd956e8abb22fe530eb2fb345bbf1001ae5d3c1" }] },
    { model: "Série 8", from: 2018, to: 2026, carplayFrom: 2019, image: "https://www.netcarshow.com/BMW-8-Series_Coupe-2019-1280-ba178527e475e5bf422769bf1a73aefbbc.jpg?token=13e92e1411177ae5cd956e8abb26caf90602f9d6e854500fd976a5d" },
    { model: "X1", from: 2009, to: 2026, carplayFrom: 2019, phases: [{ label: "E84", from: 2009, to: 2015, image: "https://www.netcarshow.com/BMW-X1-2010-1280-963e5beeaccada2b2649e78448e077f076.jpg" }, { label: "F48", from: 2015, to: 2022, image: "https://www.netcarshow.com/BMW-X1-2016-1280-5cc18e3d61fc52a2c33864033900484038.jpg?token=0ed61a40111778e5cd956e8abb2636d823f6d7bd68d1900c667431d" }, { label: "U11", from: 2022, to: 2026, image: "https://www.netcarshow.com/BMW-X1-2023-1280-e876b76f0889e365b5d4d9d547903d0f5c.jpg?token=bd578a5811177ae5ca956e8abb267087f8aa2296e01390046965ada" }] },
    { model: "X2", from: 2017, to: 2026, carplayFrom: 2019, image: "https://www.netcarshow.com/BMW-X2-2019-1280-332cc179a56aca667233d8cab8438af19c.jpg?token=fc1fa8e1111776e5cc956e8abb2b3af88ade7fe2861bd00945a773b" },
    { model: "X3", from: 2003, to: 2026, carplayFrom: 2019, phases: [{ label: "avant F25", from: 2003, to: 2010, image: "https://www.netcarshow.com/BMW-X3-2011-1280-133cba8863347c47263bfe85ea887835a0.jpg?token=1cf46a7011177ee5cd956e8abb2e774d49c2d0b8ba2890064eacf93" }, { label: "F25", from: 2010, to: 2017, image: "https://www.netcarshow.com/BMW-X3-2015-1280-2758508ecb92c43b16dcc105e5be95f347.jpg?token=14bb5c5c111774e5cb956e8abb24db8000527b61930f10017e075ec" }, { label: "G01", from: 2017, to: 2024, image: "https://www.netcarshow.com/BMW-X3-2018-1280-1f46372a41faec759507db97743d889d18.jpg?token=5e3d161e111770e5cf956e8abb2379816c4ac0fae57d5003fc5b500" }, { label: "génération actuelle", from: 2024, to: 2026, image: "https://www.netcarshow.com/BMW-X3-2025-1280-46dc24baa5eb4162beb61161d6c04d3031.jpg?token=ee8f5575111774e5cb956e8abb272be5059aeaa8393070004719478" }] },
    { model: "X4", from: 2014, to: 2026, carplayFrom: 2019, phases: [{ label: "F26", from: 2014, to: 2018, image: "https://www.netcarshow.com/BMW-X4-2015-1280-c0aa2a1f3d1d5a9771934620279e79513a.jpg?token=af55eaac111772e5cf956e8abb2d3d0462f665236cbf900669982f0" }, { label: "G02", from: 2018, to: 2026, image: "https://www.netcarshow.com/BMW-X4-2019-1280-333606955ca2b6a34726de35c331a47056.jpg" }] },
    { model: "X5", from: 1999, to: 2026, carplayFrom: 2019, phases: [{ label: "avant F15", from: 1999, to: 2013, image: "https://www.netcarshow.com/BMW-X5_4.4i-2004-1280-052e3bcccfa2c010539ca44950d6912acc.jpg" }, { label: "F15", from: 2013, to: 2018, image: "https://www.netcarshow.com/BMW-X5-2014-1280-4dafba4a773df5584c5442648bdd03397a.jpg?token=72cc5c3a11177ee5ce956e8abb2235f20bbe13e0a4b8931dad38254" }, { label: "G05", from: 2018, to: 2026, image: "https://www.netcarshow.com/BMW-X5-2019-1280-a008b9d5e0fa1c2013c26d8a892b295b5f.jpg?token=6bde5c56111772e5cb956e8abb289bd91a2667564ff7d0050aafc9b" }] },
    { model: "X6", from: 2008, to: 2026, carplayFrom: 2019, phases: [{ label: "avant F16", from: 2008, to: 2014 }, { label: "F16", from: 2014, to: 2019 }, { label: "G06", from: 2019, to: 2026 }] },
    { model: "X7", from: 2018, to: 2026, carplayFrom: 2019 },
    { model: "Z4", from: 2002, to: 2026, carplayFrom: 2019, phases: [{ label: "avant G29", from: 2002, to: 2018 }, { label: "G29", from: 2018, to: 2026 }] },
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
    { model: "C1", from: 2005, to: 2022, carplayFrom: null, phases: [{ label: "génération 1", from: 2005, to: 2014 }, { label: "génération 2", from: 2014, to: 2022 }] },
    { model: "C2", from: 2003, to: 2009, carplayFrom: null },
    { model: "C3", from: 2002, to: 2026, carplayFrom: 2017, phases: [{ label: "avant 2016", from: 2002, to: 2016 }, { label: "génération 3", from: 2016, to: 2024 }, { label: "génération 4", from: 2024, to: 2026 }] },
    { model: "C3 Aircross", from: 2017, to: 2026, carplayFrom: 2017, phases: [{ label: "1ère génération", from: 2017, to: 2023 }, { label: "2ème génération", from: 2024, to: 2026 }] },
    { model: "C3 Picasso", from: 2009, to: 2017, carplayFrom: null },
    { model: "C4", from: 2004, to: 2026, carplayFrom: 2018, phases: [{ label: "génération 1", from: 2004, to: 2010 }, { label: "génération 2", from: 2010, to: 2018 }, { label: "nouveau C4 / ë-C4", from: 2020, to: 2026 }] },
    { model: "C4 Cactus", from: 2014, to: 2021, carplayFrom: 2018 },
    { model: "C4 Picasso", from: 2006, to: 2021, carplayFrom: 2018, phases: [{ label: "génération 1", from: 2006, to: 2013 }, { label: "génération 2 / SpaceTourer", from: 2013, to: 2021 }] },
    { model: "C4 SpaceTourer", from: 2013, to: 2021, carplayFrom: 2018 },
    { model: "C4 X", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "C5", from: 2000, to: 2017, carplayFrom: null, phases: [{ label: "génération 1", from: 2000, to: 2008 }, { label: "génération 2", from: 2008, to: 2017 }] },
    { model: "C5 Aircross", from: 2018, to: 2026, carplayFrom: 2018 },
    { model: "C5 X", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "C6", from: 2005, to: 2012, carplayFrom: null },
    { model: "C8", from: 2002, to: 2014, carplayFrom: null },
    { model: "C-Elysée", from: 2012, to: 2026 },
    { model: "Berlingo", from: 1996, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2008", from: 1996, to: 2008 }, { label: "génération 2", from: 2008, to: 2018 }, { label: "génération 3", from: 2018, to: 2026 }] },
    { model: "Jumpy", from: 1994, to: 2026, phases: [{ label: "avant 2016", from: 1994, to: 2016 }, { label: "génération actuelle", from: 2016, to: 2026 }] },
    { model: "Jumper", from: 1994, to: 2026, phases: [{ label: "avant 2014", from: 1994, to: 2014 }, { label: "après restylage 2014", from: 2014, to: 2026 }] },
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
    { model: "Logan", from: 2004, to: 2026, phases: [{ label: "génération 2", from: 2004, to: 2020 }, { label: "génération 3", from: 2020, to: 2026 }] },
    { model: "Sandero", from: 2007, to: 2026, phases: [{ label: "génération 2", from: 2012, to: 2020 }, { label: "génération 3", from: 2020, to: 2026 }] },
    { model: "Duster", from: 2010, to: 2026, phases: [{ label: "génération 1", from: 2010, to: 2017 }, { label: "génération 2", from: 2018, to: 2026 }] },
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
    { model: "Fiesta", from: 1995, to: 2023, carplayFrom: 2017, phases: [{ label: "avant Mk8", from: 1995, to: 2017 }, { label: "Mk8 (Sync 3)", from: 2017, to: 2023 }] },
    { model: "Focus", from: 1998, to: 2025, carplayFrom: 2018, phases: [{ label: "avant Mk3", from: 1998, to: 2011 }, { label: "Mk3", from: 2011, to: 2018 }, { label: "Mk4", from: 2018, to: 2025 }] },
    { model: "Mondeo", from: 1993, to: 2022, carplayFrom: 2017, phases: [{ label: "avant Mk4", from: 1993, to: 2007 }, { label: "Mk4", from: 2007, to: 2014 }, { label: "Mk5", from: 2014, to: 2022 }] },
    { model: "Puma", from: 2019, to: 2026, carplayFrom: 2019 },
    { model: "Kuga", from: 2008, to: 2026, carplayFrom: 2017, phases: [{ label: "génération 1", from: 2008, to: 2013 }, { label: "génération 2", from: 2013, to: 2020 }, { label: "génération 3", from: 2020, to: 2026 }] },
    { model: "EcoSport", from: 2013, to: 2021, carplayFrom: 2018 },
    { model: "Edge", from: 2015, to: 2019, carplayFrom: 2018 },
    { model: "S-Max", from: 2006, to: 2023, carplayFrom: 2019, phases: [{ label: "génération 1", from: 2006, to: 2015 }, { label: "génération 2", from: 2015, to: 2023 }] },
    { model: "Galaxy", from: 1995, to: 2023, carplayFrom: 2019, phases: [{ label: "avant 2006", from: 1995, to: 2006 }, { label: "génération 2", from: 2006, to: 2015 }, { label: "génération 3", from: 2015, to: 2023 }] },
    { model: "C-Max", from: 2003, to: 2019, carplayFrom: 2017 },
    { model: "B-Max", from: 2012, to: 2017, carplayFrom: null },
    { model: "Transit", from: 1965, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2014", from: 1965, to: 2014 }, { label: "génération actuelle", from: 2014, to: 2026 }] },
    { model: "Transit Connect", from: 2002, to: 2026, carplayFrom: 2019, phases: [{ label: "génération 1", from: 2002, to: 2013 }, { label: "génération 2", from: 2013, to: 2026 }] },
    { model: "Transit Custom", from: 2012, to: 2026, carplayFrom: 2019, phases: [{ label: "génération 1", from: 2012, to: 2023 }, { label: "génération 2", from: 2023, to: 2026 }] },
    { model: "Ranger", from: 1998, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2011", from: 1998, to: 2011 }, { label: "T6", from: 2011, to: 2022 }, { label: "génération actuelle", from: 2022, to: 2026 }] },
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
    { model: "i10", from: 2007, to: 2026, phases: [{ label: "avant 2013", from: 2007, to: 2013 }, { label: "génération 3", from: 2013, to: 2019 }, { label: "génération 4", from: 2019, to: 2026 }] },
    { model: "i20", from: 2008, to: 2026, phases: [{ label: "avant 2014", from: 2008, to: 2014 }, { label: "génération 2", from: 2014, to: 2020 }, { label: "génération 3", from: 2020, to: 2026 }] },
    { model: "i30", from: 2007, to: 2026, phases: [{ label: "avant 2017", from: 2007, to: 2017 }, { label: "génération 3", from: 2017, to: 2026 }] },
    { model: "i40", from: 2011, to: 2019 },
    { model: "ix20", from: 2010, to: 2019 },
    { model: "ix35", from: 2009, to: 2015 },
    { model: "Tucson", from: 2004, to: 2026, phases: [{ label: "avant 2015", from: 2004, to: 2015 }, { label: "génération 3", from: 2015, to: 2020 }, { label: "génération 4", from: 2020, to: 2026 }] },
    { model: "Santa Fe", from: 2000, to: 2026, phases: [{ label: "avant 2018", from: 2000, to: 2018 }, { label: "génération 4", from: 2018, to: 2024 }, { label: "génération 5", from: 2024, to: 2026 }] },
    { model: "Kona", from: 2017, to: 2026, phases: [{ label: "génération 1", from: 2017, to: 2023 }, { label: "génération 2", from: 2023, to: 2026 }] },
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
    { model: "Picanto", from: 2004, to: 2026, phases: [{ label: "avant 2017", from: 2004, to: 2017 }, { label: "génération 3", from: 2017, to: 2026 }] },
    { model: "Rio", from: 2000, to: 2026, phases: [{ label: "avant 2017", from: 2000, to: 2017 }, { label: "génération 4", from: 2017, to: 2026 }] },
    { model: "Ceed", from: 2006, to: 2026, phases: [{ label: "avant 2018", from: 2006, to: 2018 }, { label: "génération 3", from: 2018, to: 2026 }] },
    { model: "Venga", from: 2009, to: 2019 },
    { model: "Soul", from: 2008, to: 2026 },
    { model: "Sportage", from: 1993, to: 2026, phases: [{ label: "avant 2015", from: 1993, to: 2015 }, { label: "génération 4", from: 2015, to: 2021 }, { label: "génération 5", from: 2021, to: 2026 }] },
    { model: "Sorento", from: 2002, to: 2026, phases: [{ label: "avant 2020", from: 2002, to: 2020 }, { label: "génération 4", from: 2020, to: 2026 }] },
    { model: "Niro", from: 2016, to: 2026, phases: [{ label: "génération 1", from: 2016, to: 2022 }, { label: "génération 2", from: 2022, to: 2026 }] },
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
    { model: "Classe A", from: 1997, to: 2026, carplayFrom: 2018, phases: [{ label: "avant W176", from: 1997, to: 2012 }, { label: "W176", from: 2012, to: 2018 }, { label: "W177", from: 2018, to: 2026 }] },
    { model: "Classe B", from: 2005, to: 2025, carplayFrom: 2015, phases: [{ label: "W246", from: 2011, to: 2018 }, { label: "W247", from: 2018, to: 2025 }] },
    { model: "Classe C", from: 1993, to: 2026, carplayFrom: 2018, phases: [{ label: "avant W205", from: 1993, to: 2014 }, { label: "W205", from: 2014, to: 2021 }, { label: "W206", from: 2021, to: 2026 }] },
    { model: "Classe E", from: 1993, to: 2026, carplayFrom: 2016, phases: [{ label: "avant W213", from: 1993, to: 2016 }, { label: "W213", from: 2016, to: 2023 }, { label: "W214", from: 2023, to: 2026 }] },
    { model: "Classe S", from: 2005, to: 2026, carplayFrom: 2017, phases: [{ label: "avant W222", from: 2005, to: 2013 }, { label: "W222", from: 2013, to: 2020 }, { label: "W223", from: 2020, to: 2026 }] },
    { model: "CLA", from: 2013, to: 2026, carplayFrom: 2019, phases: [{ label: "C117", from: 2013, to: 2019 }, { label: "C118", from: 2019, to: 2026 }] },
    { model: "CLS", from: 2004, to: 2023, carplayFrom: 2017, phases: [{ label: "avant restylage 2018", from: 2004, to: 2018 }, { label: "génération actuelle", from: 2018, to: 2023 }] },
    { model: "GLA", from: 2013, to: 2026, carplayFrom: 2017, phases: [{ label: "X156", from: 2013, to: 2020 }, { label: "H247", from: 2020, to: 2026 }] },
    { model: "GLB", from: 2019, to: 2026, carplayFrom: 2019 },
    { model: "GLC", from: 2015, to: 2026, carplayFrom: 2016, phases: [{ label: "X253", from: 2015, to: 2022 }, { label: "X254", from: 2022, to: 2026 }] },
    { model: "GLE", from: 2015, to: 2026, carplayFrom: 2018, phases: [{ label: "W166 / ML", from: 2015, to: 2018 }, { label: "W167", from: 2018, to: 2026 }] },
    { model: "GLK", from: 2008, to: 2015, carplayFrom: null },
    { model: "GLS", from: 2016, to: 2026, carplayFrom: 2019, phases: [{ label: "X166", from: 2016, to: 2019 }, { label: "X167", from: 2019, to: 2026 }] },
    { model: "Classe V", from: 2014, to: 2026, carplayFrom: 2017, phases: [{ label: "avant MBUX", from: 2014, to: 2019 }, { label: "après MBUX 2019", from: 2019, to: 2026 }] },
    { model: "Vito", from: 1996, to: 2026, carplayFrom: 2017, phases: [{ label: "avant 2014", from: 1996, to: 2014 }, { label: "génération actuelle", from: 2014, to: 2026 }] },
    { model: "Sprinter", from: 1995, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2018", from: 1995, to: 2018 }, { label: "génération actuelle", from: 2018, to: 2026 }] },
    { model: "Citan", from: 2012, to: 2026, phases: [{ label: "génération 1", from: 2012, to: 2021 }, { label: "génération 2", from: 2021, to: 2026 }] },
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
    { model: "Micra", from: 1982, to: 2026, phases: [{ label: "avant K13", from: 1982, to: 2010 }, { label: "K13", from: 2010, to: 2017 }, { label: "K14", from: 2017, to: 2026 }] },
    { model: "Note", from: 2005, to: 2020 },
    { model: "Juke", from: 2010, to: 2026, phases: [{ label: "génération 1", from: 2010, to: 2019 }, { label: "génération 2", from: 2019, to: 2026 }] },
    { model: "Qashqai", from: 2006, to: 2026, phases: [{ label: "génération 1", from: 2006, to: 2013 }, { label: "génération 2", from: 2013, to: 2021 }, { label: "génération 3", from: 2021, to: 2026 }] },
    { model: "X-Trail", from: 2001, to: 2026, phases: [{ label: "avant 2013", from: 2001, to: 2013 }, { label: "génération 3", from: 2013, to: 2022 }, { label: "génération 4", from: 2022, to: 2026 }] },
    { model: "Leaf", from: 2010, to: 2026, phases: [{ label: "génération 1 (ZE0)", from: 2010, to: 2017 }, { label: "génération 2 (ZE1)", from: 2017, to: 2026 }] },
    { model: "Navara", from: 1997, to: 2026, phases: [{ label: "avant 2015", from: 1997, to: 2015 }, { label: "génération actuelle (D23)", from: 2015, to: 2026 }] },
    { model: "Primastar / NV300", from: 2001, to: 2026, phases: [{ label: "Primastar", from: 2001, to: 2014 }, { label: "NV300", from: 2014, to: 2026 }] },
    { model: "Interstar / NV400", from: 2002, to: 2026, phases: [{ label: "Interstar", from: 2002, to: 2010 }, { label: "NV400", from: 2010, to: 2026 }] },
    { model: "370Z", from: 2009, to: 2020 },
    { model: "GT-R", from: 2007, to: 2026 },
    { model: "Ariya", from: 2022, to: 2026 },
    { model: "Townstar", from: 2021, to: 2026 }
  ],
  "Opel": [
    { model: "Corsa", from: 1993, to: 2026, carplayFrom: 2016, phases: [{ label: "génération D", from: 2006, to: 2014 }, { label: "génération E", from: 2014, to: 2019 }, { label: "génération F", from: 2019, to: 2026 }] },
    { model: "Astra", from: 1991, to: 2026, carplayFrom: 2016, phases: [{ label: "génération J", from: 2009, to: 2015 }, { label: "génération K", from: 2015, to: 2021 }, { label: "génération L", from: 2021, to: 2026 }] },
    { model: "Insignia", from: 2008, to: 2022, carplayFrom: 2017, phases: [{ label: "génération A", from: 2008, to: 2017 }, { label: "génération B", from: 2017, to: 2022 }] },
    { model: "Meriva", from: 2003, to: 2017, carplayFrom: null },
    { model: "Zafira", from: 1999, to: 2019, carplayFrom: 2016 },
    { model: "Mokka", from: 2012, to: 2026, carplayFrom: 2016, phases: [{ label: "1ère génération", from: 2012, to: 2020 }, { label: "2ème génération", from: 2020, to: 2026 }] },
    { model: "Crossland", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "Grandland", from: 2017, to: 2026, carplayFrom: 2017, phases: [{ label: "1ère génération", from: 2017, to: 2023 }, { label: "2ème génération", from: 2023, to: 2026 }] },
    { model: "Combo", from: 1994, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2018", from: 1994, to: 2018 }, { label: "génération actuelle", from: 2018, to: 2026 }] },
    { model: "Vivaro", from: 1996, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2019", from: 1996, to: 2019 }, { label: "génération actuelle", from: 2019, to: 2026 }] },
    { model: "Movano", from: 1998, to: 2026, phases: [{ label: "avant 2021", from: 1998, to: 2021 }, { label: "génération actuelle", from: 2021, to: 2026 }] },
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
    { model: "208", from: 2012, to: 2026, carplayFrom: 2017, phases: [{ label: "1ère génération", from: 2012, to: 2019 }, { label: "2ème génération", from: 2019, to: 2026 }] },
    { model: "2008", from: 2013, to: 2026, carplayFrom: 2017, phases: [{ label: "1ère génération", from: 2013, to: 2019 }, { label: "2ème génération", from: 2019, to: 2026 }] },
    { model: "301", from: 2012, to: 2026, carplayFrom: null },
    { model: "307", from: 2001, to: 2008, carplayFrom: null },
    { model: "308", from: 2007, to: 2026, carplayFrom: 2017, phases: [{ label: "1ère génération", from: 2007, to: 2013 }, { label: "2ème génération", from: 2013, to: 2021 }, { label: "3ème génération", from: 2021, to: 2026 }] },
    { model: "3008", from: 2009, to: 2026, carplayFrom: 2016, phases: [{ label: "1ère génération (monospace)", from: 2009, to: 2016 }, { label: "2ème génération (SUV)", from: 2016, to: 2023 }, { label: "3ème génération", from: 2023, to: 2026 }] },
    { model: "407", from: 2004, to: 2011, carplayFrom: null },
    { model: "408", from: 2010, to: 2026, carplayFrom: 2018, phases: [{ label: "marché restreint (Chine)", from: 2010, to: 2021 }, { label: "nouvelle génération France", from: 2022, to: 2026 }] },
    { model: "5008", from: 2009, to: 2026, carplayFrom: 2017, phases: [{ label: "1ère génération (monospace)", from: 2009, to: 2017 }, { label: "2ème génération (SUV)", from: 2017, to: 2023 }, { label: "3ème génération", from: 2023, to: 2026 }] },
    { model: "508", from: 2010, to: 2026, carplayFrom: 2018, phases: [{ label: "1ère génération", from: 2010, to: 2018 }, { label: "2ème génération", from: 2018, to: 2026 }] },
    { model: "Partner", from: 1996, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2008", from: 1996, to: 2008 }, { label: "2ème génération", from: 2008, to: 2018 }, { label: "3ème génération", from: 2018, to: 2026 }] },
    { model: "Rifter", from: 2018, to: 2026, carplayFrom: 2018 },
    { model: "Expert", from: 1995, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2016", from: 1995, to: 2016 }, { label: "génération actuelle", from: 2016, to: 2026 }] },
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
    { model: "Twingo", from: 1993, to: 2026, carplayFrom: null, phases: [{ label: "génération 1", from: 1993, to: 2007 }, { label: "génération 2", from: 2007, to: 2014 }, { label: "génération 3", from: 2014, to: 2026 }] },
    { model: "Clio", from: 1990, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2012", from: 1990, to: 2012 }, { label: "génération 4", from: 2012, to: 2019 }, { label: "génération 5", from: 2019, to: 2026 }] },
    { model: "Captur", from: 2013, to: 2026, carplayFrom: 2019, phases: [{ label: "1ère génération", from: 2013, to: 2019 }, { label: "2ème génération", from: 2019, to: 2026 }] },
    { model: "Mégane", from: 1995, to: 2026, carplayFrom: 2020, phases: [{ label: "génération 3", from: 2008, to: 2016 }, { label: "génération 4", from: 2016, to: 2023 }, { label: "Mégane E-Tech (électrique)", from: 2022, to: 2026 }] },
    { model: "Scénic", from: 1996, to: 2026, carplayFrom: 2020, phases: [{ label: "génération 3", from: 2009, to: 2016 }, { label: "génération 4", from: 2016, to: 2023 }, { label: "Scenic E-Tech", from: 2023, to: 2026 }] },
    { model: "Kadjar", from: 2015, to: 2022, carplayFrom: 2019 },
    { model: "Austral", from: 2022, to: 2026, carplayFrom: 2022 },
    { model: "Talisman", from: 2015, to: 2022, carplayFrom: 2020 },
    { model: "Laguna", from: 1994, to: 2015, carplayFrom: null },
    { model: "Espace", from: 1984, to: 2026, carplayFrom: 2020, phases: [{ label: "avant 2015", from: 1984, to: 2015 }, { label: "génération 5 (crossover)", from: 2015, to: 2026 }] },
    { model: "Kangoo", from: 1997, to: 2026, carplayFrom: 2021, phases: [{ label: "avant 2008", from: 1997, to: 2008 }, { label: "génération 2", from: 2008, to: 2021 }, { label: "génération 3", from: 2021, to: 2026 }] },
    { model: "Trafic", from: 1980, to: 2026, carplayFrom: 2021, phases: [{ label: "avant 2014", from: 1980, to: 2014 }, { label: "génération 3", from: 2014, to: 2026 }] },
    { model: "Master", from: 1980, to: 2026, phases: [{ label: "avant restylage 2019", from: 1980, to: 2019 }, { label: "après restylage 2019 (écran tactile)", from: 2019, to: 2026 }] },
    { model: "Zoe", from: 2012, to: 2024, carplayFrom: 2019, phases: [{ label: "avant restylage", from: 2012, to: 2019 }, { label: "après restylage 2019", from: 2019, to: 2024 }] },
    { model: "Arkana", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Symbioz", from: 2023, to: 2026, carplayFrom: 2023 },
    { model: "Koleos", from: 2008, to: 2026, carplayFrom: 2019, phases: [{ label: "génération 1", from: 2008, to: 2016 }, { label: "génération 2", from: 2016, to: 2026 }] },
    { model: "Fluence", from: 2009, to: 2016, carplayFrom: null },
    { model: "Modus", from: 2004, to: 2012, carplayFrom: null }
  ],
  "Saab": [
    { model: "9-3", from: 1998, to: 2012 },
    { model: "9-5", from: 1997, to: 2012 }
  ],
  "Seat": [
    { model: "Ibiza", from: 1984, to: 2026, phases: [{ label: "avant 2008", from: 1984, to: 2008 }, { label: "génération 4", from: 2008, to: 2017 }, { label: "génération 5", from: 2017, to: 2026 }] },
    { model: "Leon", from: 1999, to: 2026, phases: [{ label: "avant 2012", from: 1999, to: 2012 }, { label: "génération 3", from: 2012, to: 2020 }, { label: "génération 4", from: 2020, to: 2026 }] },
    { model: "Arona", from: 2017, to: 2026, phases: [{ label: "avant restylage 2021", from: 2017, to: 2021 }, { label: "après restylage 2021 (MIB3)", from: 2021, to: 2026 }] },
    { model: "Ateca", from: 2016, to: 2026, phases: [{ label: "avant restylage 2021", from: 2016, to: 2021 }, { label: "après restylage 2021 (MIB3)", from: 2021, to: 2026 }] },
    { model: "Tarraco", from: 2018, to: 2026, phases: [{ label: "avant restylage 2021", from: 2018, to: 2021 }, { label: "après restylage 2021 (MIB3)", from: 2021, to: 2026 }] },
    { model: "Alhambra", from: 1996, to: 2020 },
    { model: "Mii", from: 2011, to: 2019 },
    { model: "Toledo", from: 1991, to: 2019 },
    { model: "Cordoba", from: 1993, to: 2009 }
  ],
  "Skoda": [
    { model: "Citigo", from: 2011, to: 2020 },
    { model: "Fabia", from: 1999, to: 2026, phases: [{ label: "avant 2014", from: 1999, to: 2014 }, { label: "génération 3", from: 2014, to: 2021 }, { label: "génération 4", from: 2021, to: 2026 }] },
    { model: "Rapid", from: 2012, to: 2019 },
    { model: "Scala", from: 2019, to: 2026 },
    { model: "Octavia", from: 1996, to: 2026, phases: [{ label: "avant 2013", from: 1996, to: 2013 }, { label: "génération 3", from: 2013, to: 2020 }, { label: "génération 4", from: 2020, to: 2026 }] },
    { model: "Kamiq", from: 2019, to: 2026 },
    { model: "Karoq", from: 2017, to: 2026 },
    { model: "Yeti", from: 2009, to: 2017 },
    { model: "Kodiaq", from: 2016, to: 2026, phases: [{ label: "génération 1", from: 2016, to: 2023 }, { label: "génération 2", from: 2023, to: 2026 }] },
    { model: "Superb", from: 2001, to: 2026, phases: [{ label: "avant 2015", from: 2001, to: 2015 }, { label: "génération 3", from: 2015, to: 2024 }, { label: "génération 4", from: 2024, to: 2026 }] },
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
    { model: "Aygo", from: 2005, to: 2022, carplayFrom: null, phases: [{ label: "génération 1", from: 2005, to: 2014 }, { label: "génération 2", from: 2014, to: 2022 }] },
    { model: "Aygo X", from: 2022, to: 2026, carplayFrom: 2022 },
    { model: "Yaris", from: 1999, to: 2026, carplayFrom: 2020, phases: [{ label: "avant 2020", from: 1999, to: 2020 }, { label: "génération 4", from: 2020, to: 2026 }] },
    { model: "Yaris Cross", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Corolla", from: 2001, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2019", from: 2001, to: 2019 }, { label: "génération actuelle", from: 2019, to: 2026 }] },
    { model: "Auris", from: 2006, to: 2018, carplayFrom: null },
    { model: "C-HR", from: 2016, to: 2026, carplayFrom: 2019, phases: [{ label: "1ère génération", from: 2016, to: 2023 }, { label: "2ème génération", from: 2023, to: 2026 }] },
    { model: "RAV4", from: 1994, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2013", from: 1994, to: 2013 }, { label: "génération 4", from: 2013, to: 2018 }, { label: "génération 5", from: 2018, to: 2026 }] },
    { model: "Prius", from: 1997, to: 2026, carplayFrom: 2019, phases: [{ label: "avant 2015", from: 1997, to: 2015 }, { label: "génération 4", from: 2015, to: 2022 }, { label: "génération 5", from: 2022, to: 2026 }] },
    { model: "Avensis", from: 1997, to: 2018, carplayFrom: null },
    { model: "Camry", from: 2018, to: 2026, carplayFrom: 2019 },
    { model: "Land Cruiser", from: 2002, to: 2026, carplayFrom: 2021, phases: [{ label: "avant 2021", from: 2002, to: 2021 }, { label: "génération actuelle (J250/J300)", from: 2021, to: 2026 }] },
    { model: "Hilux", from: 2005, to: 2026, carplayFrom: 2020, phases: [{ label: "avant restylage 2015", from: 2005, to: 2015 }, { label: "après restylage 2015", from: 2015, to: 2026 }] },
    { model: "Verso", from: 2004, to: 2018, carplayFrom: null },
    { model: "ProAce", from: 2016, to: 2026, carplayFrom: 2020 },
    { model: "bZ4X", from: 2022, to: 2026, carplayFrom: 2022 }
  ],
  "Volkswagen": [
    { model: "up!", from: 2011, to: 2023, carplayFrom: 2016, phases: [{ label: "avant restylage", from: 2011, to: 2016 }, { label: "après restylage 2016 (écran tactile)", from: 2016, to: 2023 }] },
    { model: "Polo", from: 2001, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2009", from: 2001, to: 2009 }, { label: "génération 5", from: 2009, to: 2017 }, { label: "génération 6", from: 2017, to: 2026 }] },
    { model: "Golf", from: 1997, to: 2026, carplayFrom: 2017, phases: [{ label: "avant Mk6", from: 1997, to: 2008 }, { label: "Mk6", from: 2008, to: 2012 }, { label: "Mk7", from: 2012, to: 2019 }, { label: "Mk8", from: 2019, to: 2026 }] },
    { model: "Passat", from: 1996, to: 2026, carplayFrom: 2015, phases: [{ label: "avant B7", from: 1996, to: 2010 }, { label: "B7", from: 2010, to: 2014 }, { label: "B8", from: 2014, to: 2023 }, { label: "B9", from: 2023, to: 2026 }] },
    { model: "Arteon", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "Scirocco", from: 2008, to: 2017, carplayFrom: null },
    { model: "Beetle", from: 1998, to: 2019, carplayFrom: 2016, phases: [{ label: "New Beetle", from: 1998, to: 2011 }, { label: "Beetle (A5)", from: 2011, to: 2019 }] },
    { model: "CC", from: 2008, to: 2017, carplayFrom: null },
    { model: "Tiguan", from: 2007, to: 2026, carplayFrom: 2016, phases: [{ label: "génération 1", from: 2007, to: 2016 }, { label: "génération 2", from: 2016, to: 2024 }, { label: "génération 3", from: 2024, to: 2026 }] },
    { model: "Touran", from: 2003, to: 2023, carplayFrom: 2016, phases: [{ label: "génération 1", from: 2003, to: 2010 }, { label: "génération 2", from: 2010, to: 2015 }, { label: "génération 2 restylée", from: 2015, to: 2023 }] },
    { model: "Touareg", from: 2002, to: 2026, carplayFrom: 2018, phases: [{ label: "avant 2010", from: 2002, to: 2010 }, { label: "génération 2", from: 2010, to: 2018 }, { label: "génération 3", from: 2018, to: 2026 }] },
    { model: "T-Roc", from: 2017, to: 2026, carplayFrom: 2017 },
    { model: "T-Cross", from: 2019, to: 2026, carplayFrom: 2019 },
    { model: "Taigo", from: 2021, to: 2026, carplayFrom: 2021 },
    { model: "Sharan", from: 1995, to: 2022, carplayFrom: 2015, phases: [{ label: "génération 1", from: 1995, to: 2010 }, { label: "génération 2", from: 2010, to: 2022 }] },
    { model: "Caddy", from: 2004, to: 2026, carplayFrom: 2020, phases: [{ label: "génération 4", from: 2004, to: 2020 }, { label: "génération 5", from: 2020, to: 2026 }] },
    { model: "Transporter / Multivan", from: 2003, to: 2026, carplayFrom: 2020, phases: [{ label: "T5", from: 2003, to: 2015 }, { label: "T6 / T6.1", from: 2015, to: 2020 }, { label: "T7 Multivan", from: 2020, to: 2026 }] },
    { model: "Amarok", from: 2010, to: 2026, carplayFrom: 2023, phases: [{ label: "1ère génération", from: 2010, to: 2022 }, { label: "2ème génération", from: 2023, to: 2026 }] },
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
  ],
};

const POPULAR_BRANDS = [
  "Volkswagen",
  "Peugeot",
  "Renault",
  "Citroën",
  "Opel",
  "Ford",
  "Toyota",
  "BMW",
  "Mercedes-Benz",
  "Audi"
];
