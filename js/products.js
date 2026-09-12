/**
 * Catalogue produits de démonstration.
 * "dongle"   -> boîtier sans fil qui ajoute CarPlay/Android Auto à un écran
 *               d'origine déjà compatible filaire.
 * "headunit" -> autoradio/écran Android à installer en remplacement de
 *               l'autoradio/écran d'origine.
 * `recommended: true` marque le produit mis en avant comme "Le choix PlayAuto".
 * Prix, délais et notes sont des données de démonstration à remplacer par
 * un vrai catalogue / flux fournisseur.
 */
const PRODUCTS = {
  dongle: [
    {
      id: "dg-tbox-plus",
      name: "CarlinKit Tbox Plus",
      price: 69,
      deliveryDays: 5,
      rating: 4.2,
      reviews: 312,
      icon: "🔌",
      features: [
        "CarPlay & Android Auto sans fil",
        "Branchement direct sur le port USB d'origine",
        "Compatible iOS et Android"
      ]
    },
    {
      id: "dg-carlinkit-5",
      name: "CarlinKit 5.0 2Air",
      price: 89,
      deliveryDays: 4,
      rating: 4.5,
      reviews: 540,
      icon: "📡",
      features: [
        "Wi-Fi 5 GHz, connexion plus stable",
        "Reconnexion automatique au démarrage",
        "Mises à jour du micrologiciel en ligne"
      ]
    },
    {
      id: "dg-aawireless-2",
      name: "AAWireless 2",
      price: 99,
      deliveryDays: 6,
      rating: 4.6,
      reviews: 210,
      icon: "📶",
      features: [
        "Spécialiste Android Auto sans fil",
        "Boîtier compact discret derrière le combiné",
        "App mobile de configuration"
      ]
    },
    {
      id: "dg-ottocast-u2air",
      name: "Ottocast U2-Air Pro",
      price: 129,
      deliveryDays: 3,
      rating: 4.7,
      reviews: 180,
      icon: "⭐",
      recommended: true,
      features: [
        "Latence quasi nulle, image fluide",
        "CarPlay & Android Auto sans fil",
        "SAV et garantie 2 ans"
      ]
    },
    {
      id: "dg-ottocast-pico",
      name: "Ottocast Pico Air",
      price: 109,
      deliveryDays: 2,
      rating: 4.4,
      reviews: 95,
      icon: "🚀",
      features: [
        "Le plus petit boîtier du marché",
        "Installation en moins de 5 minutes",
        "Livraison express"
      ]
    }
  ],
  headunit: [
    {
      id: "hu-essentiel-7",
      name: "Autoradio Android 7\" Essentiel",
      price: 129,
      deliveryDays: 7,
      rating: 4.0,
      reviews: 88,
      icon: "📻",
      screen: "7 pouces",
      features: [
        "Android 12, CarPlay & Android Auto filaire",
        "1 Go RAM / 16 Go stockage",
        "Radio FM/DAB+ intégrée"
      ]
    },
    {
      id: "hu-confort-9",
      name: "Autoradio Android 9\" Confort",
      price: 189,
      deliveryDays: 6,
      rating: 4.3,
      reviews: 150,
      icon: "🖥️",
      screen: "9 pouces",
      features: [
        "CarPlay & Android Auto sans fil",
        "2 Go RAM / 32 Go stockage",
        "Caméra de recul incluse"
      ]
    },
    {
      id: "hu-premium-10",
      name: "Autoradio Android 10.1\" Premium QLED",
      price: 299,
      deliveryDays: 5,
      rating: 4.6,
      reviews: 230,
      icon: "⭐",
      screen: "10.1 pouces",
      recommended: true,
      features: [
        "Dalle QLED haute luminosité",
        "4 Go RAM / 64 Go stockage",
        "CarPlay & Android Auto sans fil + GPS intégré"
      ]
    },
    {
      id: "hu-pro-123",
      name: "Autoradio Android 12.3\" Pro sur-mesure",
      price: 349,
      deliveryDays: 8,
      rating: 4.7,
      reviews: 64,
      icon: "🏆",
      screen: "12.3 pouces",
      features: [
        "Façade sur-mesure adaptée à votre tableau de bord",
        "8 Go RAM / 128 Go stockage",
        "Processeur audio DSP intégré"
      ]
    },
    {
      id: "hu-rapide-9",
      name: "Autoradio Android 9\" Rapide",
      price: 219,
      deliveryDays: 3,
      rating: 4.2,
      reviews: 70,
      icon: "🚀",
      screen: "9 pouces",
      features: [
        "Livraison express sous 3 jours",
        "CarPlay & Android Auto sans fil",
        "2 Go RAM / 32 Go stockage"
      ]
    }
  ]
};
