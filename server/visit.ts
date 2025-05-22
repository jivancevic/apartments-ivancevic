import { InsertLocation } from '../shared/schema';

// Define type for location items without the type fields
type LocationItem = Omit<InsertLocation, 'typeEn' | 'typeHr'>;

// Define category labels
export const categories = {
  attractionsOldTown: {
    en: "Attractions - Old Town",
    hr: "Atrakcije - Stari grad"
  },
  attractionsIsland: {
    en: "Attractions - Island",
    hr: "Atrakcije - Otok"
  },
  activities: {
    en: "Activities",
    hr: "Aktivnosti"
  },
  excursions: {
    en: "Excursions",
    hr: "Izleti"
  },
  restaurants: {
    en: "Restaurants",
    hr: "Restorani"
  }
};

// Create a record of categories to locations
export const visitDataByCategory: Record<string, LocationItem[]> = {
  attractionsOldTown: [
    {
      nameEn: "Moreška",
      nameHr: "Moreška",
      descriptionEn: "Traditional sword dance performed in summer, depicting a battle for a maiden between the Black and White kings.",
      descriptionHr: "Tradicionalni ples s mačevima koji se izvodi ljeti, prikazujući bitku za djevojku između crnog i bijelog kralja.",
      image: "/images/locations/moreska.webp",
      location: "https://maps.google.com/?q=42.961889,17.135832",
      distance: { minutes: 5, mean: "walk" },
      featureEn: "Cultural experience",
      featureHr: "Kulturno iskustvo",
      link: "https://www.korcula.net/culture/moreska.html"
    },
    {
      nameEn: "Marko Polo Center",
      nameHr: "Centar Marka Pola",
      descriptionEn: "Interpretive center dedicated to Marco Polo, believed by locals to be born in Korčula.",
      descriptionHr: "Interpretacijski centar posvećen Marku Polu, za kojeg lokalno stanovništvo vjeruje da je rođen u Korčuli.",
      image: "/images/locations/marco-polo.webp",
      location: "https://maps.google.com/?q=42.962562,17.135966",
      distance: { minutes: 7, mean: "walk" },
      featureEn: "Historical site",
      featureHr: "Povijesno mjesto"
    },
    {
      nameEn: "Korčula Town Museum",
      nameHr: "Gradski muzej Korčula",
      descriptionEn: "City museum in Gabriellis Palace, showcasing Korčula's cultural and historical heritage.",
      descriptionHr: "Gradski muzej u palači Gabriellis, prikazuje kulturnu i povijesnu baštinu Korčule.",
      image: "/images/locations/cathedral.webp",
      location: "https://maps.google.com/?q=42.961656,17.136433",
      distance: { minutes: 5, mean: "walk" },
      featureEn: "Cultural heritage",
      featureHr: "Kulturna baština",
      link: "https://www.gm-korcula.com/"
    },
    {
      nameEn: "Saint Mark's Cathedral",
      nameHr: "Katedrala Sv. Marka",
      descriptionEn: "Main cathedral with a bell tower offering panoramic views of the town and sea.",
      descriptionHr: "Glavna katedrala sa zvonikom koji nudi panoramski pogled na grad i more.",
      image: "/images/locations/cathedral.webp",
      location: "https://maps.google.com/?q=42.961761,17.136141",
      distance: { minutes: 3, mean: "walk" },
      featureEn: "Religious site",
      featureHr: "Vjersko mjesto"
    },
    {
      nameEn: "Church of the All Saints",
      nameHr: "Crkva Svih Svetih",
      descriptionEn: "Small church with baroque wooden altars and a sacral art collection.",
      descriptionHr: "Mala crkva s baroknim drvenim oltarima i zbirkom sakralne umjetnosti.",
      image: "/images/locations/cathedral.webp",
      location: "https://maps.google.com/?q=42.961425,17.135941",
      distance: { minutes: 4, mean: "walk" },
      featureEn: "Baroque art",
      featureHr: "Barokna umjetnost"
    },
    {
      nameEn: "Revelin Tower",
      nameHr: "Kula Revelin",
      descriptionEn: "Defense tower at the Old Town gate, known for views and evening events.",
      descriptionHr: "Obrambena kula na ulazu u Stari grad, poznata po pogledima i večernjim događanjima.",
      image: "/images/locations/cathedral.webp",
      location: "https://maps.google.com/?q=42.962127,17.135651",
      distance: { minutes: 6, mean: "walk" },
      featureEn: "Historic landmark",
      featureHr: "Povijesni spomenik"
    }
  ],
  
  attractionsIsland: [
    {
      nameEn: "Badija Island",
      nameHr: "Otok Badija",
      descriptionEn: "Island with a Franciscan monastery, walking trails, beaches, and tame deer.",
      descriptionHr: "Otok s franjevačkim samostanom, pješačkim stazama, plažama i pitomim jelenima.",
      image: "/images/locations/banje-beach.webp",
      location: "https://maps.google.com/?q=42.957752,17.148639",
      distance: { minutes: 15, mean: "ferry" },
      featureEn: "Natural beauty",
      featureHr: "Prirodna ljepota"
    },
    {
      nameEn: "Vrnik Island",
      nameHr: "Otok Vrnik",
      descriptionEn: "Island known for its old stone quarries and crystal-clear sea. Can be walked around in about an hour.",
      descriptionHr: "Otok poznat po starim kamenolomima i kristalno čistom moru. Može se obići za otprilike sat vremena.",
      image: "/images/locations/banje-beach.webp",
      location: "https://maps.google.com/?q=42.953429,17.150464",
      distance: { minutes: 10, mean: "ferry" },
      featureEn: "Stone quarries",
      featureHr: "Kamenolomi"
    },
    {
      nameEn: "Pupnatska Luka",
      nameHr: "Pupnatska Luka",
      descriptionEn: "One of the island's most beautiful beaches, with turquoise water and a natural pebble bay.",
      descriptionHr: "Jedna od najljepših plaža na otoku s tirkiznim morem i prirodnom šljunčanom uvalom.",
      image: "/images/locations/pupnatska-luka.webp",
      location: "https://maps.google.com/?q=42.912827,17.162743",
      distance: { minutes: 20, mean: "car" },
      featureEn: "Beach",
      featureHr: "Plaža"
    }
  ],
  
  activities: [
    {
      nameEn: "Windsurfing",
      nameHr: "Windsurfing",
      descriptionEn: "Excellent wind conditions in the Korčula-Pelješac channel make this one of the island's top water sports.",
      descriptionHr: "Odlični vjetreni uvjeti u kanalu Korčula-Pelješac čine ovo jednim od najboljih vodenih sportova na otoku.",
      image: "/images/locations/korcula-adventures.webp",
      location: "https://maps.google.com/?q=42.959088,17.141762",
      distance: { minutes: 15, mean: "walk" },
      featureEn: "Water sports",
      featureHr: "Vodeni sportovi",
      link: "https://www.korculainfo.com/windsurfing-korcula/"
    },
    {
      nameEn: "Scuba Diving",
      nameHr: "Ronjenje",
      descriptionEn: "Guided dives to explore underwater caves, reefs, and Adriatic marine life.",
      descriptionHr: "Vođena ronjenja za istraživanje podvodnih špilja, grebena i jadranskog morskog života.",
      image: "/images/locations/korcula-adventures.webp",
      location: "https://maps.google.com/?q=42.960553,17.138225",
      distance: { minutes: 12, mean: "walk" },
      featureEn: "Underwater adventure",
      featureHr: "Podvodna avantura",
      link: "https://www.korculadiving.com/"
    },
    {
      nameEn: "Buggies",
      nameHr: "Buggies",
      descriptionEn: "Quad and buggy rides through scenic hills and vineyards, offering sweeping views of the sea and Pelješac.",
      descriptionHr: "Vožnje quadovima i buggyima kroz slikovita brda i vinograde, s prekrasnim pogledima na more i Pelješac.",
      image: "/images/locations/korcula-adventures.webp",
      location: "https://maps.google.com/?q=42.957133,17.133196",
      distance: { minutes: 10, mean: "walk" },
      featureEn: "Adventure",
      featureHr: "Avantura"
    }
  ],
  
  excursions: [
    {
      nameEn: "Hop on Hop off Taxi Boat",
      nameHr: "Hop on Hop off Taxi Brod",
      descriptionEn: "Boat line connecting Korčula to Badija, Vrnik, and Lumbarda – ideal for easy day-tripping.",
      descriptionHr: "Brodska linija koja povezuje Korčulu s Badijom, Vrnikom i Lumbardom – idealna za jednodnevne izlete.",
      image: "/images/locations/korcula-adventures.webp",
      location: "https://maps.google.com/?q=42.962189,17.137651",
      distance: { minutes: 5, mean: "walk" },
      featureEn: "Island hopping",
      featureHr: "Obilazak otoka",
      link: "https://www.korculainfo.com/korcula-water-taxi/"
    },
    {
      nameEn: "Mljet",
      nameHr: "Mljet",
      descriptionEn: "National park island known for its saltwater lakes, dense forests, and a 12th-century monastery on St. Mary's islet.",
      descriptionHr: "Nacionalni park poznat po slanim jezerima, gustim šumama i samostanu iz 12. stoljeća na otočiću Sv. Marije.",
      image: "/images/locations/korcula-adventures.webp",
      location: "https://maps.google.com/?q=42.781687,17.386935",
      distance: { minutes: 45, mean: "ferry" },
      featureEn: "National Park",
      featureHr: "Nacionalni park",
      link: "https://np-mljet.hr/en/"
    },
    {
      nameEn: "Dubrovnik",
      nameHr: "Dubrovnik",
      descriptionEn: "Organized day trip to the UNESCO-protected 'Pearl of the Adriatic' – best outside peak summer crowds.",
      descriptionHr: "Organizirani jednodnevni izlet u UNESCO-om zaštićeni 'Biser Jadrana' – najbolje izvan ljetnih gužvi.",
      image: "/images/locations/korcula-adventures.webp",
      location: "https://maps.google.com/?q=42.640278,18.108334",
      distance: { minutes: 120, mean: "car" },
      featureEn: "UNESCO site",
      featureHr: "UNESCO lokalitet",
      link: "https://visitdubrovnik.hr/en/"
    }
  ],
  
  restaurants: [
    {
      nameEn: "Filippi",
      nameHr: "Filippi",
      descriptionEn: "Elegant seaside restaurant with a Michelin recommendation, known for refined presentations and creative local cuisine.",
      descriptionHr: "Elegantni restoran uz more s Michelinovom preporukom, poznat po profinjenim prezentacijama i kreativnoj lokalnoj kuhinji.",
      image: "/images/locations/filippi.webp",
      location: "https://maps.google.com/?q=42.962041,17.137671",
      distance: { minutes: 10, mean: "walk" },
      featureEn: "Fine dining",
      featureHr: "Vrhunska kuhinja",
      link: "https://www.filippicorchula.com/"
    },
    {
      nameEn: "LD Restaurant",
      nameHr: "LD Restaurant",
      descriptionEn: "Michelin-starred fine dining restaurant offering a creative, modern Mediterranean tasting menu by the sea.",
      descriptionHr: "Restoran s Michelinovom zvezdicom koji nudi kreativan, moderan mediteranski menu za degustaciju uz more.",
      image: "/images/locations/adio-mare.webp",
      location: "https://maps.google.com/?q=42.961824,17.138191",
      distance: { minutes: 8, mean: "walk" },
      featureEn: "Michelin starred",
      featureHr: "Michelinova zvezdica",
      link: "https://ldrestaurant.com/"
    },
    {
      nameEn: "Adio Mare",
      nameHr: "Adio Mare",
      descriptionEn: "Legendary Korčula konoba serving classic Dalmatian dishes with an impressive wine list.",
      descriptionHr: "Legendarna korčulanska konoba koja poslužuje klasična dalmatinska jela s impresivnom vinskom kartom.",
      image: "/images/locations/adio-mare.webp",
      location: "https://maps.google.com/?q=42.961683,17.136066",
      distance: { minutes: 7, mean: "walk" },
      featureEn: "Traditional cuisine",
      featureHr: "Tradicionalna kuhinja"
    },
    {
      nameEn: "Čakulona",
      nameHr: "Čakulona",
      descriptionEn: "Cozy restaurant in the Old Town, offering homemade Croatian meals and a welcoming atmosphere.",
      descriptionHr: "Ugodan restoran u Starom gradu, nudi domaća hrvatska jela i gostoljubivu atmosferu.",
      image: "/images/locations/adio-mare.webp",
      location: "https://maps.google.com/?q=42.961476,17.135943",
      distance: { minutes: 6, mean: "walk" },
      featureEn: "Home cooking",
      featureHr: "Domaća kuhinja"
    }
  ]
};

// Convert the categorized data back to a flat array for compatibility with existing code
export const visitData: InsertLocation[] = Object.entries(visitDataByCategory).flatMap(
  ([category, items]) => {
    let typeEn = "";
    let typeHr = "";
    
    // Determine type values based on category
    switch(category) {
      case "attractionsOldTown":
        typeEn = "attraction-old-town";
        typeHr = "atrakcija-stari-grad";
        break;
      case "attractionsIsland":
        typeEn = "attraction-island";
        typeHr = "atrakcija-otok";
        break;
      case "activities":
        typeEn = "activity";
        typeHr = "aktivnost";
        break;
      case "excursions":
        typeEn = "excursion";
        typeHr = "izlet";
        break;
      case "restaurants":
        typeEn = "restaurant";
        typeHr = "restoran";
        break;
    }
    
    // Add type information to each item
    return items.map(item => ({
      ...item,
      typeEn,
      typeHr
    }));
  }
);