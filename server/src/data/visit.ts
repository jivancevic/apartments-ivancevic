import type { InsertLocation } from "../types";

// Define type for location items without the type fields
type LocationItem = Omit<InsertLocation, "typeEn" | "typeHr">;

// Define category labels
export const categories = {
  attractionsOldTown: {
    en: "Attractions - Old Town",
    hr: "Atrakcije - Stari grad",
  },
  attractionsIsland: {
    en: "Attractions - Island",
    hr: "Atrakcije - Otok",
  },
  activities: {
    en: "Activities",
    hr: "Aktivnosti",
  },
  excursions: {
    en: "Excursions",
    hr: "Izleti",
  },
  restaurants: {
    en: "Restaurants",
    hr: "Restorani",
  },
};

// Create a record of categories to locations
export const visitDataByCategory: Record<string, LocationItem[]> = {
  attractionsOldTown: [
    {
      nameEn: "Moreška",
      nameHr: "Moreška",
      descriptionEn:
        "Moreška is Korčula’s iconic traditional sword dance, performed for over 400 years. This vibrant spectacle features two groups of costumed dancers enacting a dramatic battle over a captured maiden. Accompanied by rhythmic music, the performance showcases the island's rich cultural heritage.",
      descriptionHr:
        "Moreška je kultni tradicionalni mačevalački ples Korčule, koji se izvodi više od 400 godina. Ovaj živopisni spektakl prikazuje dvije skupine kostimiranih plesača u dramatičnoj borbi za otetu djevojku. Uz ritmičnu glazbu, izvedba prikazuje bogatu kulturnu baštinu otoka.",
      image: "/images/visit/moreska.webp",
      location: "https://maps.app.goo.gl/bbyevJgZaJAhp67w8",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Sword dance",
      featureHr: "Ples s mačevima",
      link: "https://www.korculainfo.com/moreska/",
    },
    {
      nameEn: "Marko Polo Center",
      nameHr: "Marko Polo centar",
      descriptionEn:
        "The Marko Polo Center in Korčula offers an engaging exhibition dedicated to the life and legacy of the famed explorer Marco Polo. Visitors can explore interactive displays detailing his journeys, the historical context of his travels, and his impact on connecting Eastern and Western cultures.",
      descriptionHr:
        "Marko Polo centar u Korčuli nudi zanimljivu izložbu posvećenu životu i naslijeđu slavnog istraživača Marka Pola. Posjetitelji mogu istražiti interaktivne prikaze njegovih putovanja, povijesni kontekst tih putovanja i njegov utjecaj na povezivanje istočnih i zapadnih kultura.",
      image: "/images/visit/marko-polo-center.webp",
      location: "https://maps.app.goo.gl/3ZoZKqndgwZkjVg69",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Explorer museum",
      featureHr: "Muzej istraživača",
      link: "https://www.korculainfo.com/marcopolohouse/",
    },
    {
      nameEn: "Korčula Town Museum",
      nameHr: "Gradski muzej Korčula",
      descriptionEn:
        "Housed in the 16th-century Gabrielis Palace on St. Mark’s Square, Korčula Town Museum showcases the island’s history from ancient Greek artifacts to Venetian-era shipbuilding and local culture. Its exhibits include the 4th-century BC Lumbarda Psephism stone inscription and various historical household items, offering insight into Korčula’s heritage.",
      descriptionHr:
        "Gradski muzej Korčula smješten je u palači Gabrielis iz 16. stoljeća na Trgu sv. Marka. Muzej prikazuje povijest otoka od antičkih grčkih artefakata do venecijanskog brodograditeljstva i lokalne kulture. Izloženi su, između ostalog, Lumbardska psefizma iz 4. st. pr. Kr. te razni povijesni kućanski predmeti, pružajući uvid u korčulansko naslijeđe.",
      image: "/images/visit/korcula-town-museum.webp",
      location: "https://maps.app.goo.gl/PS15FhUtw4oLuhd6A",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "City history",
      featureHr: "Gradska povijest",
      link: "https://www.korculainfo.com/museums/korcula-museum/",
    },
    {
      nameEn: "Saint Mark’s Cathedral",
      nameHr: "Katedrala sv. Marka",
      descriptionEn:
        "The Gothic-Renaissance St. Mark’s Cathedral is Korčula’s most striking landmark. Built by local stonemasons between the 14th and 16th centuries, it features a majestic bell tower (completed by master Marko Andrijić) and a beautiful rose window over the portal. Inside, the cathedral houses artworks by Tintoretto and other Italian masters, as well as a rich treasury of religious art and artifacts.",
      descriptionHr:
        "Katedrala sv. Marka najupadljivija je znamenitost Korčule. Građena je od 14. do 16. stoljeća rukama lokalnih klesara, a krasi je veličanstveni zvonik (dovršen od majstora Marka Andrijića) i prekrasna rozeta iznad portala. Unutrašnjost čuva umjetnine Tintoretta i drugih talijanskih majstora te bogatu riznicu vjerske umjetnosti i artefakata.",
      image: "/images/locations/saint-marks-cathedral.webp",
      location: "https://maps.app.goo.gl/BXzJrcmxEhYWvrBt7",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Gothic-Renaissance",
      featureHr: "Gotika i renesansa",
      link: "https://visitkorcula.eu/cultural-heritage.html#St.%20Mark",
    },
    {
      nameEn: "Church of All Saints",
      nameHr: "Crkva Svih Svetih",
      descriptionEn:
        "All Saints Church, built in the early 15th century, stands in a quaint square near Korčula’s old city walls. It was home to the Brotherhood of All Saints (est. 1301), one of Korčula’s oldest fraternities. The church’s interior is simple but notable for housing an Icon Collection of precious Cretan icons brought by Korčulan sailors in the 17th century, as well as a series of wooden Baroque carvings and a painted ceiling.",
      descriptionHr:
        "Crkva Svih Svetih, sagrađena početkom 15. stoljeća, nalazi se na pitoresknom trgu uz stare gradske zidine. U njoj je djelovalo Bratovština Svih Svetih (osnovana 1301.), jedno od najstarijih korčulanskih bratstava. Unutrašnjost je skromna, ali značajna po Zbirci ikona – vrijednim kretskim ikonama koje su donijeli korčulanski mornari u 17. stoljeću – kao i po nizu drvenih baroknih rezbarija te oslikanom stropu.",
      image: "/images/locations/church-of-all-saints.webp",
      location: "https://maps.app.goo.gl/zumWn2Ay8noUZ8ps7",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Icon collection",
      featureHr: "Zbirka ikona",
      link: "https://visitkorcula.eu/cultural-heritage.html#All%20Saints",
    },
    {
      nameEn: "Revelin Tower (Land Gate)",
      nameHr: "Kula Revelin (Kopnena vrata)",
      descriptionEn:
        "The Revelin Tower (Veliki Revelin) guards Korčula’s Land Gate, the grand entrance to the Old Town. Erected in 1485 during Venetian rule, this round defensive tower is emblazoned above its arch with the winged lion of St. Mark and a plaque commemorating the 1000th anniversary of Croatian King Tomislav. Crossing under Revelin’s gatehouse and staircase, visitors enter the walled town as countless sailors and merchants did in past centuries.",
      descriptionHr:
        "Kula Revelin (Veliki Revelin) čuva kopnena vrata – glavni ulaz u stari grad. Podignuta 1485. za vrijeme mletačke vlasti, ova okrugla obrambena kula iznad svog luka ima uklesanog krilatog lava sv. Marka i ploču koja obilježava 1000. godišnjicu krunidbe hrvatskog kralja Tomislava. Prolaskom ispod Revelina i njegovog stubišta posjetitelji ulaze u utvrđeni grad kao bezbrojni pomorci i trgovci proteklih stoljeća.",
      image: "/images/locations/revelin-tower.webp",
      location: "https://maps.app.goo.gl/qnwbHEKCRjLYvLYU6",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "City gate",
      featureHr: "Gradska vrata",
      link: "https://visitkorcula.eu/cultural-heritage.html#GREAT%20REVELIN",
    },
    {
      nameEn: "Ismaelli Courtyard",
      nameHr: "Dvorište palače Ismaelli",
      descriptionEn:
        "Tucked away in Korčula’s Old Town is the Ismaelli Courtyard, the secluded inner garden of a 15th-century palace once owned by the noble Ismaeli family. Framed by stone walls and historic architecture, this little courtyard garden offers a peaceful atmosphere with greenery and potted plants – a hidden oasis that evokes the everyday life of Korčulan nobility in Renaissance times.",
      descriptionHr:
        "U starogradskoj jezgri Korčule skriveno je dvorište palače Ismaelli – intimni vrt unutar palače iz 15. stoljeća koja je pripadala plemićkoj obitelji Ismaeli. Okruženo kamenim zidovima i povijesnom arhitekturom, ovo malo dvorište s zelenilom i lončanicama pruža mirnu atmosferu – skrivenu oazu koja dočarava svakodnevni život korčulanske vlastele u doba renesanse.",
      image: "/images/locations/ismaelli-courtyard.webp",
      location: "https://maps.app.goo.gl/HeGk61V1KrADsTCk8",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Hidden garden",
      featureHr: "Skriveni vrt",
      link: "https://visitkorcula.eu/cultural-heritage.html#OF%20OUR%20LADY (private chapel note)",
    },
    {
      nameEn: "Španić Garden",
      nameHr: "Španićev vrt",
      descriptionEn:
        "The Španić Garden is a tranquil walled garden attached to the historic Španić Palace in Korčula’s Old Town. Once belonging to the local bishop Španić in the 17th century, this pocket of greenery features stone-paved grounds, citrus and fig trees, and flower pots scattered about. Today it serves as a quiet courtyard for guests of a small inn, but it still retains the charm of a bygone era and offers a relaxing escape from the narrow streets.",
      descriptionHr:
        "Španićev vrt mirni je ograđeni vrt uz povijesnu palaču Španić u starom gradu Korčule. Nekad je pripadao mjesnom biskupu Španiću u 17. stoljeću, a ovaj zeleni kutak ima kamenom popločano tlo, stabla citrusa i smokava te razasute lončanice s cvijećem. Danas služi kao tiho dvorište gostima malog pansiona, no i dalje zadržava šarm minulog doba i pruža opuštajući predah od uskih ulica.",
      image: "/images/locations/spanic-garden.webp",
      location: "https://maps.app.goo.gl/JARGMJzwWRKZn8sV8",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Courtyard oasis",
      featureHr: "Dvorišni kutak",
      link: "https://korculainfo.com/kneza/ (Španić mention)",
    },
    {
      nameEn: "Church Nuncijata",
      nameHr: "Crkva Gospe od Nuncijate",
      descriptionEn:
        "The Church of Our Lady of the Annunciation (Nuncijata) sits on a hillside just outside Korčula Old Town, known for its panoramic views. This tiny 15th-century chapel, dedicated to the Annunciation, is accessible by a short uphill walk and offers a sweeping outlook over Korčula’s rooftops, the Pelješac Channel, and surrounding islets. Locals often visit Nuncijata for serene contemplation, especially at sunset when the vistas are most breathtaking.",
      descriptionHr:
        "Crkva Gospe od Nuncijate smještena je na brežuljku neposredno izvan stare gradske jezgre Korčule, poznata po panoramskom pogledu. Ova malena kapela iz 15. stoljeća, posvećena Navještenju, do koje vodi kratka uzbrdica, pruža širok vidik na korčulanske krovove, Pelješki kanal i okolne otočiće. Mještani često posjećuju Nuncijatu radi tihog promišljanja, osobito u suton kada je pogled najljepši.",
      image: "/images/locations/church-nuncijata.webp",
      location: "https://maps.app.goo.gl/TZ5vwZcRyge8AgFP7",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Viewpoint chapel",
      featureHr: "Vidikovac",
      link: "https://visitkorcula.eu/best views (St. Anthony & St. Vlaho mentioned)",
    },
    {
      nameEn: "Church of Our Lady (Gospojina)",
      nameHr: "Crkva Gospojina",
      descriptionEn:
        "This small Renaissance church, built in 1483, stands opposite St. Mark’s Cathedral. Dedicated to the Virgin Mary’s Immaculate Conception, it was once the private chapel of the noble Gabrielis and Ismaelis families. The floor is inlaid with medieval Korčulan family tombstones, including that of priest Antun Rozanović who defended Korčula from an Ottoman attack in 1571. Behind the altar, resplendent gold mosaics (added in the 1960s) adorn the wall, and today the church occasionally serves as an art gallery.",
      descriptionHr:
        "Ova mala renesansna crkva, sagrađena 1483. godine, stoji nasuprot katedrali sv. Marka. Posvećena je Bezgrešnom začeću Blažene Djevice Marije, a nekad je bila privatna kapelica plemićkih obitelji Gabrielis i Ismaelis. Pod crkve prekriven je srednjovjekovnim grobnicama korčulanskih obitelji, uključujući onu svećenika Antuna Rozanovića koji je branio Korčulu od Turaka 1571. godine. Iza oltara zid krase zlatni mozaici iz 1960-ih, a danas se crkva povremeno koristi i kao galerija za umjetničke izložbe.",
      image: "/images/locations/church-of-our-lady.webp",
      location: "https://maps.app.goo.gl/pfwxA6FdWuYQNixS8",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Renaissance chapel",
      featureHr: "Renesansna kapela",
      link: "https://visitkorcula.eu/cultural-heritage.html#OF%20OUR%20LADY",
    },
    {
      nameEn: "Church of St. Michael",
      nameHr: "Crkva sv. Mihovila",
      descriptionEn:
        "Set on a small square facing the old Town Hall, St. Michael’s Church dates to the early 15th century. It was overseen by the Brotherhood of the Virgin of Consolation from 1603, and took its present Baroque form during the 17th–18th centuries. The church’s single nave leads to a 18th-century high altar which features a painting of Our Lady of Consolation by Domenico Maggiotto. Though modest in size, this church is an integral part of Korčula’s religious heritage and neighborhood identity.",
      descriptionHr:
        "Smještena na trgu nasuprot staroj gradskoj vijećnici, crkva sv. Mihovila potječe iz ranog 15. stoljeća. Pod skrbništvom je Bratovštine Gospe od Utjehe od 1603. godine, a svoj današnji barokni oblik dobila je tijekom 17. i 18. stoljeća. Jednobrodna crkvica vodi do glavnog oltara iz 18. st. na kojem se nalazi slika Gospe od Utjehe, rad Domenica Maggiotta. Iako malena, ova crkva je sastavni dio korčulanske sakralne baštine i identiteta mjesne zajednice.",
      image: "/images/locations/church-of-st-michael.webp",
      location: "https://maps.app.goo.gl/NxjCzVZGypY32Fn26",
      distance: {
        minutes: 2,
        mean: "walk",
      },
      featureEn: "Baroque church",
      featureHr: "Barokna crkva",
      link: "https://visitkorcula.eu/cultural-heritage.html#ST.%20MICHAEL",
    },
  ],
  attractionsIsland: [
    {
      nameEn: "Badija Island",
      nameHr: "Otok Badija",
      descriptionEn:
        "Badija is a green, pine-covered islet just a 15-minute boat ride from Korčula Town. It’s famed for its large 15th-century Franciscan Monastery and the Church of Our Lady of Mercy, which features a beautiful Gothic-Renaissance rosette and portal. Badija’s walking paths, pebble beaches, and resident tame deer make it a popular excursion for nature lovers seeking a peaceful picnic or a swim in the clear Adriatic waters.",
      descriptionHr:
        "Badija je zeleni otočić prekriven borovima, udaljen oko 15 minuta vožnje brodom od grada Korčule. Poznat je po velikom franjevačkom samostanu iz 15. stoljeća i crkvi Gospe od Milosti s prekrasnom gotičko-renesansnom rozetom i portalom. Šetnice, šljunčane plaže i pitomi jeleni koji obitavaju na Badiji čine ga omiljenim odredištem za izletnike i ljubitelje prirode koji traže miran piknik ili kupanje u bistrom Jadranu.",
      image: "/images/locations/badija-island.webp",
      location: "https://maps.app.goo.gl/jHfsvKfSNhrRyWfc7",
      distance: {
        minutes: 10,
        mean: "ferry",
      },
      featureEn: "Monastery island",
      featureHr: "Otok s samostanom",
      link: "https://www.korculainfo.com/badija/",
    },
    {
      nameEn: "Vrnik Island",
      nameHr: "Otok Vrnik",
      descriptionEn:
        "Vrnik is a tiny car-free island known as Korčula’s ancient quarry site. For millennia, stone cutters extracted high-quality limestone here – stones from Vrnik were used in palaces and cathedrals across Dalmatia. Today a handful of old stone houses and a small chapel remain. Visitors can take a taxi-boat to explore Vrnik’s quiet pebble beaches, wander its abandoned quarries, and visit the quaint art gallery/café housed in the old schoolhouse, experiencing a slice of Korčula’s stone-carving heritage.",
      descriptionHr:
        "Vrnik je maleni otok bez automobila, poznat kao drevno korčulansko nalazište kamena. Tisućljećima su klesari ovdje vadili kvalitetni vapnenac – kamen s Vrnika ugrađen je u palače i katedrale širom Dalmacije. Danas na otoku postoji nekoliko starih kamenih kuća i mala kapela. Posjetitelji mogu taksi-brodom doploviti do Vrnika te istražiti njegove tihe šljunčane plaže, napuštene kamenolome i posjetiti umjetničku galeriju/kafić smještenu u staroj školjici, doživjevši dio naslijeđa klesarstva Korčule.",
      image: "/images/locations/vrnik-island.webp",
      location: "https://maps.app.goo.gl/fkKWRKSzr4SvZajT8",
      distance: {
        minutes: 20,
        mean: "ferry",
      },
      featureEn: "Stone quarries",
      featureHr: "Kamenolomi",
      link: "https://visitkorcula.eu/island-vrnik.html",
    },
    {
      nameEn: "Lumbarda",
      nameHr: "Lumbarda",
      descriptionEn:
        "Lumbarda is a charming coastal village about 6 km east of Korčula Town, celebrated for its sandy beaches and wineries. Its two main beaches, Vela Pržina and Bilin Žal, offer rare golden sand and shallow waters ideal for families. Inland, Lumbarda’s vineyards produce the unique Grk white wine, which visitors can sample at local wineries. With its laid-back Dalmatian vibe, seaside taverns, and scenic cycling trails through vineyards, Lumbarda is a favorite for a relaxing day trip.",
      descriptionHr:
        "Lumbarda je slikovito obalno selo oko 6 km istočno od grada Korčule, poznato po pješčanim plažama i vinarijama. Dvije glavne plaže, Vela Pržina i Bilin Žal, nude rijedak zlatni pijesak i plitko more idealno za obitelji. U unutrašnjosti Lumbarde vinogradi rađaju jedinstveno bijelo vino Grk koje posjetitelji mogu kušati u lokalnim vinarijama. Sa svojim opuštenim dalmatinskim ugođajem, konobama uz more i slikovitim biciklističkim stazama kroz vinograde, Lumbarda je omiljena za ležeran izlet.",
      image: "/images/locations/lumbarda.webp",
      location: "https://maps.app.goo.gl/MjvuWqcBPWdXU3Lg9",
      distance: {
        minutes: 10,
        mean: "car",
      },
      featureEn: "Sandy beaches",
      featureHr: "Pješčane plaže",
      link: "https://www.visitlumbarda.com/",
    },
    {
      nameEn: "Pupnatska Luka",
      nameHr: "Pupnatska Luka",
      descriptionEn:
        "Pupnatska Luka is often hailed as one of Korčula’s most beautiful bays. Located on the island’s south coast about 15 km from town, this deep turquoise cove is framed by pine-covered hills and has a gorgeous pebble beach with crystal-clear water. The bay’s remote feel and vivid colors make it a perfect spot for swimming, snorkeling, and sunbathing in peace. A small seaside konoba (tavern) nearby serves local dishes, allowing visitors to enjoy a leisurely lunch with a stunning view of the Adriatic.",
      descriptionHr:
        "Pupnatska Luka često se ističe kao jedna od najljepših uvala na Korčuli. Smještena na južnoj obali otoka, oko 15 km od grada, ova duboka tirkizna uvala obrubljena je borovim brežuljcima i ima prekrasnu šljunčanu plažu s kristalno čistim morem. Uvala pruža osjet udaljenosti i živopisne boje, što je čini savršenim mjestom za mirno plivanje, ronjenje i sunčanje. U blizini se nalazi i mala konoba uz more koja poslužuje domaća jela, tako da posjetitelji mogu uživati u ručku s prekrasnim pogledom na Jadran.",
      image: "/images/locations/pupnatska-luka.webp",
      location: "https://maps.app.goo.gl/TwVaEXSbvBazvLRP7",
      distance: {
        minutes: 30,
        mean: "car",
      },
      featureEn: "Scenic bay",
      featureHr: "Prekrasna uvala",
      link: "https://www.korculainfo.com/pupnatska-luka/",
    },
    {
      nameEn: "Vaja & Samograd Beaches",
      nameHr: "Plaže Vaja i Samograd",
      descriptionEn:
        "Vaja and Samograd are two secluded pebble beaches near the village of Račišće on Korčula’s northern shore. Vaja Beach lies in a cove just outside Račišće and is reachable via a steep footpath, rewarding visitors with its clear aqua-blue water and peaceful setting. A short hike further west leads to Samograd Bay, another hidden cove enclosed by rocky cliffs and pine trees. With no facilities on-site, both beaches offer a true off-the-beaten-path escape – bring water and enjoy the tranquility of these pristine spots.",
      descriptionHr:
        "Vaja i Samograd dvije su skrovite šljunčane plaže u blizini sela Račišće na sjevernoj obali Korčule. Plaža Vaja smještena je u uvali tik izvan Račišća i do nje vodi strma staza, no posjetitelje nagrađuje bistrom modrozelenom vodom i mirnim okruženjem. Kratka šetnja dalje na zapad vodi do uvale Samograd, još jedne skrivene plaže okružene stijenama i borovom šumom. Budući da na ovim plažama nema sadržaja, pružaju autentičan bijeg od gužve – ponesite vodu i uživajte u tišini ovih netaknutih kutaka prirode.",
      image: "/images/locations/vaja-samograd.webp",
      location: "https://maps.app.goo.gl/ogpx1aVArPhdmzyTA",
      distance: {
        minutes: 25,
        mean: "car",
      },
      featureEn: "Hidden coves",
      featureHr: "Skrivene uvale",
      link: "https://www.korculainfo.com/vaja/",
    },
    {
      nameEn: "Stupe Islets",
      nameHr: "Otočići Stupe",
      descriptionEn:
        "The Stupe are two tiny islets (Mala Stupa and Vela Stupa) in the Korčula archipelago, a short boat hop from Korčula Town. These flat, rocky islands boast extremely clear water and a laid-back beach vibe. On Vela Stupa, visitors will find Moro Beach Club – a casual bar/restaurant with sunbeds where you can sip cocktails and enjoy grilled dishes by the sea. Popular for swimming, snorkeling, and relaxing in the sun with panoramic views of Pelješac, the Stupe islets offer a fun island-hopping stop during summer.",
      descriptionHr:
        "Stupe su dva sićušna otočića (Mala i Vela Stupa) u korčulanskom arhipelagu, par minuta vožnje brodićem od grada Korčule. Ovi niski, stjenoviti otočići imaju iznimno bistro more i opušteni ugođaj za kupanje. Na Veloj Stupi nalazi se Moro Beach Club – neformalni bar/restoran s ležaljkama gdje možete pijuckati koktele i uživati u jelima s grilla tik uz more. Stupe su omiljene za plivanje, ronjenje s maskom i upijanje sunca uz panoramski pogled na Pelješac, te su zabavna stanica pri ljetnom obilasku otočića.",
      image: "/images/locations/stupe.webp",
      location: "https://maps.app.goo.gl/1F6Di7yGEyRuQDPP8",
      distance: {
        minutes: 30,
        mean: "ferry",
      },
      featureEn: "Island bar",
      featureHr: "Otočni bar",
      link: "https://www.morobeach.com/",
    },
    {
      nameEn: "Kočje Nature Reserve",
      nameHr: "Prirodni rezervat Kočje",
      descriptionEn:
        "Kočje is a protected forest sanctuary in the hills near Žrnovo, about a 20-minute drive from Korčula Town. Covering just 5 hectares, Kočje feels magical – a lush green enclave filled with ancient mossy rock formations, narrow passages, and a cool microclimate even in summer. Local legend says fairies (vile) once dwelled among these dolomite rocks. A marked hiking path leads through Kočje’s oak and ivy-covered terrain, offering an adventurous walk under the dense canopy and a glimpse into the island’s untouched nature.",
      descriptionHr:
        "Kočje je zaštićeni šumski rezervat u brdima blizu Žrnova, oko 20 minuta vožnje od grada Korčule. Obuhvaća samo 5 hektara, a odiše čarolijom – bujno zelenilo ispunjeno drevnim obraslim stijenama, uskim prolazima i svježom mikroklimom čak i ljeti. Prema lokalnoj legendi, među ovim dolomitnim stijenama nekad su živjele vile. Označena pješačka staza vodi kroz Kočje, kroz hrastovu šumu obrastu mahovinom i bršljanom, pružajući pustolovnu šetnju ispod guste krošnje i uvid u netaknutu prirodu otoka.",
      image: "/images/locations/kocje.webp",
      location: "https://maps.app.goo.gl/8hKaphPqtWAWJfLU7",
      distance: {
        minutes: 15,
        mean: "car",
      },
      featureEn: "Fairy forest",
      featureHr: "Čarobna šuma",
      link: "https://korcula.net/kocje/",
    },
  ],
  activities: [
    {
      nameEn: "Off-Road Buggies",
      nameHr: "Off-road buggy vozila",
      descriptionEn:
        "Experience Korčula’s countryside with an exhilarating off-road buggy tour. Driving 2-seater buggies, participants follow a guide through winding dirt trails, olive groves, and hilltops overlooking the sea. The safari-style adventure often includes stops at scenic viewpoints above Korčula Town, visits to a rural farmhouse, and a chance to taste local products (like homemade wine or snacks) at the end. It’s a fun-filled way for thrill seekers and families to explore the island’s interior beyond the paved roads.",
      descriptionHr:
        "Doživite korčulansko zaleđe uz uzbudljivu vožnju off-road buggy vozilima. Vozeći dvosjede buggye, sudionici prate vodiča makadamskim stazama kroz maslinike i brežuljke s pogledom na more. Ova safari avantura često uključuje stajanja na vidikovcima iznad Korčule, posjet seoskom domaćinstvu te priliku za kušanje lokalnih proizvoda (poput domaćeg vina ili zakuske) na kraju. To je zabavan način za ljubitelje adrenalina i obitelji da istraže unutrašnjost otoka izvan asfaltiranih cesta.",
      image: "/images/locations/buggies.webp",
      location: "https://maps.app.goo.gl/9E4zopEHjmbEcd88A",
      distance: {
        minutes: 10,
        mean: "car",
      },
      featureEn: "Off-road fun",
      featureHr: "Off-road zabava",
      link: "https://www.korcula-buggy.com/",
    },
    {
      nameEn: "Windsurfing",
      nameHr: "Jedrenje na dasci",
      descriptionEn:
        "Thanks to steady Maestral winds, the channel between Korčula and the Pelješac Peninsula is a windsurfing hotspot. Several centers in Korčula Town and Lumbarda offer windsurfing lessons and rentals for all levels. Beginners practice on gentler bays, while advanced windsurfers zip across the channel to catch stronger gusts near Viganj (on Pelješac), known internationally for its wind conditions. Whether you’re learning the basics or carving up the waves at high speed, windsurfing here is an adrenaline-filled way to enjoy the Adriatic.",
      descriptionHr:
        "Zahvaljujući pouzdanim maestralima, kanal između Korčule i poluotoka Pelješca pravi je raj za jedrenje na dasci. Nekoliko centara u gradu Korčuli i Lumbardi nudi tečajeve i najam windsurf opreme za sve razine. Početnici vježbaju u mirnijim uvalama, dok iskusniji surferi jurcaju preko kanala hvatajući jače udare vjetra kod Vignja (na Pelješcu), međunarodno poznatog po odličnim uvjetima. Bilo da savladavate osnove ili već velikom brzinom klizite po valovima, jedrenje na dasci ovdje je adrenalinski način uživanja u Jadranu.",
      image: "/images/locations/windsurfing.webp",
      location: "https://maps.app.goo.gl/m6Eva7yAsWdUmFMG7",
      distance: {
        minutes: 45,
        mean: "car",
      },
      featureEn: "Windy channel",
      featureHr: "Vjetroviti kanal",
      link: "https://www.visitkorcula.eu",
    },
    {
      nameEn: "Scuba Diving",
      nameHr: "Ronjenje",
      descriptionEn:
        "The waters around Korčula Island are a paradise for scuba divers, offering clear visibility, diverse marine life, and intriguing dive sites. Local dive centers (in Korčula Town and Lumbarda) run daily boat dives to underwater caves, coral-covered reefs, and even a couple of shipwrecks. You might encounter octopuses, moray eels, seahorses, and colorful fish among the rocks and seagrass meadows. Whether you’re a novice (discover scuba courses are available) or an experienced diver, exploring Korčula’s underwater world is an unforgettable adventure.",
      descriptionHr:
        "Podmorje oko otoka Korčule raj je za ronioca – nudi izvrsnu vidljivost, raznolik morski život i zanimljive lokacije za ronjenje. Lokalni ronilački centri (u gradu Korčuli i Lumbardi) organiziraju dnevne izlaske brodom do podvodnih špilja, grebena obraslih koraljima, pa čak i nekoliko olupina brodova. Među stijenama i livadama posidonije možete sresti hobotnice, murine, morske konjice i šarene ribice. Bilo da ste početnik (dostupni su probni zaroni) ili iskusan ronilac, istraživanje korčulanskog podmorja nezaboravna je pustolovina.",
      image: "/images/locations/scuba-diving.webp",
      location: "https://maps.app.goo.gl/ShSuUgZ8CMF1ek5j6",
      distance: {
        minutes: 15,
        mean: "walk",
      },
      featureEn: "Underwater adventure",
      featureHr: "Podvodna avantura",
      link: "http://www.lumbardablue.com/",
    },
  ],
  excursions: [
    {
      nameEn: "Hop-On Hop-Off Water Taxi",
      nameHr: "Taksi brod hop-on hop-off",
      descriptionEn:
        "The Hop On Hop Off Taxi Boat is a convenient ferry service linking Korčula Town with nearby islands and villages. With a day ticket, you can freely “hop” between Korčula’s Old Town port, the islets of Badija and Vrnik, and the village of Lumbarda. The bright yellow catamaran runs hourly loops, allowing you to sunbathe on Badija, explore Vrnik’s quarries, and relax on Lumbarda’s beaches all in one day. It’s an easy, scenic way to discover Korčula’s archipelago at your own pace.",
      descriptionHr:
        "Hop-on hop-off taksi brod praktična je brodska linija koja povezuje grad Korčulu s obližnjim otocima i selima. S dnevnom kartom možete slobodno „skakati” između luke u starom gradu Korčule, otočića Badije i Vrnika te mjesta Lumbarda. Jarko žuti katamaran vozi u krug svakog sata, omogućujući vam da se sunčate na Badiji, istražite kamenolome Vrnika i opustite se na plažama Lumbarde – sve u jednom danu. To je lagan i slikovit način da vlastitim tempom otkrijete korčulanski arhipelag.",
      image: "/images/locations/hop-on-hop-off-taxi-boat.webp",
      location: "https://maps.app.goo.gl/RUR2RBQtx2tFD6bd8",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Island hopping",
      featureHr: "Obilazak otočića",
      link: "https://www.korculaboating.com/3-island-tour-hoponhopoff/",
    },
    {
      nameEn: "Day Trip to Mljet",
      nameHr: "Izlet na Mljet",
      descriptionEn:
        "A day excursion to Mljet Island, home to one of Croatia’s most stunning National Parks, is highly recommended. A catamaran or speedboat from Korčula (about 1 hour) brings you to Mljet’s western lakes region, where you can wander around Veliko and Malo Jezero (the island’s famous salt lakes) surrounded by pine forests. Don’t miss taking a small boat to the charming St. Mary’s Islet with its 12th-century monastery at the center of Veliko Jezero. Hiking or cycling trails crisscross Mljet’s unspoiled nature, and you’ll have time to swim in the tranquil lakes before returning to Korčula.",
      descriptionHr:
        "Toplo se preporučuje jednodnevni izlet na otok Mljet, dom jednog od najljepših hrvatskih nacionalnih parkova. Katamaran ili brzi brod iz Korčule (oko 1 sat vožnje) dovodi vas do zapadnog dijela Mljeta, gdje možete obići Veliko i Malo jezero (poznate slane mljetske uvale) okružene borovom šumom. Obavezno malim brodićem posjetite šarmantni otočić Sv. Marije s benediktinskim samostanom iz 12. stoljeća usred Velikog jezera. Pješačke i biciklističke staze mrežasto se protežu netaknutom prirodom Mljeta, a imat ćete vremena i zaplivati u mirnim jezerima prije povratka na Korčulu.",
      image: "/images/locations/mljet.webp",
      location: "https://maps.app.goo.gl/dNuyYRLWFTSvDtgRA",
      distance: {
        minutes: 60,
        mean: "ferry",
      },
      featureEn: "National Park",
      featureHr: "Nacionalni park",
      link: "http://np-mljet.hr/",
    },
    {
      nameEn: "Hvar Town Visit",
      nameHr: "Posjet gradu Hvaru",
      descriptionEn:
        "Hvar Town, the glamorous hub of neighboring Hvar Island, is reachable by daily summer catamaran from Korčula (about 1.5 hours). On a day trip, you can stroll Hvar’s marble-paved streets lined with Venetian-era stone houses, visit the majestic Fortica fortress for panoramic views, and admire the Renaissance St. Stephen’s Cathedral on the main square. Hvar offers upscale boutiques, cafes, and a bustling harbor often filled with yachts. You’ll have a few hours to soak in the lively atmosphere and Dalmatian history of one of Croatia’s most popular island towns, before returning by boat to Korčula.",
      descriptionHr:
        "Grad Hvar, glamurozno središte susjednog otoka Hvara, dostupan je ljeti svakodnevnim katamaranom iz Korčule (oko 1,5 sat). U jednodnevnom posjetu možete prošetati hvarskim ulicama popločanim mramorom, okruženim venecijanskim kamenim kućama, posjetiti veličanstvenu tvrđavu Forticu radi panoramskih pogleda te razgledati renesansnu katedralu sv. Stjepana na glavnom trgu. Hvar nudi otmjene butike, kafiće i živu luku često ispunjenu jahtama. Imat ćete nekoliko sati za upijanje živahne atmosfere i dalmatinske povijesti jednog od najpopularnijih otočkih gradova u Hrvatskoj prije povratka brodom na Korčulu.",
      image: "/images/locations/hvar.webp",
      location: "https://maps.app.goo.gl/WB6qBMKctj8dqcLy5",
      distance: {
        minutes: 90,
        mean: "ferry",
      },
      featureEn: "Historic harbor",
      featureHr: "Povijesna luka",
      link: "https://visithvar.hr/",
    },
    {
      nameEn: "Dubrovnik Excursion",
      nameHr: "Izlet u Dubrovnik",
      descriptionEn:
        "Visiting Dubrovnik, the UNESCO-listed “Pearl of the Adriatic,” is a feasible day trip from Korčula. High-speed catamarans depart in the morning (around 2 hours) and bring you directly to Dubrovnik’s Old Port. There, you can spend the day walking the entirety of the medieval city walls, exploring landmarks like the Stradun, Rector’s Palace, and Lovrijenac Fortress, and perhaps taking a cable car up Mt. Srđ for a postcard view of the red rooftops and sea. By evening, you’ll return to Korčula with memories of Dubrovnik’s magnificent walled city and its rich history.",
      descriptionHr:
        "Posjet Dubrovniku, biseru Jadrana pod zaštitom UNESCO-a, moguć je kao jednodnevni izlet iz Korčule. Brzi katamarani polaze ujutro (vožnja oko 2 sata) i dovode vas izravno u staru gradsku luku Dubrovnika. Tamo možete provesti dan šetajući kompletnim srednjovjekovnim zidinama, istražujući znamenitosti poput Straduna, Kneževa dvora i tvrđave Lovrijenac, a možda i uspinjačom otići na Srđ kako biste uživo vidjeli razglednicu s crvenim krovovima i morem. Do večeri ćete se vratiti na Korčulu s uspomenama na veličanstveni opasani grad Dubrovnik i njegovu bogatu povijest.",
      image: "/images/locations/dubrovnik.webp",
      location: "https://maps.app.goo.gl/uqQJdfzL6Rv91kVD9",
      distance: {
        minutes: 120,
        mean: "ferry",
      },
      featureEn: "Walled city",
      featureHr: "Grad-zidine",
      link: "https://www.dubrovnik-tourist-board.hr/",
    },
  ],
  restaurants: [
    {
      nameEn: "Agroturizam Pagar (Pupnat)",
      nameHr: "Agroturizam Pagar (Pupnat)",
      descriptionEn:
        "Agroturizam Pagar is a rustic farm-to-table restaurant in the tiny village of Pupnat, offering an authentic Korčulan dining experience. Specializing in seafood and local island cuisine, Pagar has no fixed menu – you choose from the day’s fresh catch (lobsters, fish, squid) and homegrown produce. The family owners then grill or bake the selection under the open fire or peka bell, serving it with homemade olive oil, vegetables, and local wine. Dining is on a terrace overlooking the countryside, making for a memorable, hearty meal in a traditional setting.",
      descriptionHr:
        "Agroturizam Pagar rustikalni je restoran na seoskom gospodarstvu u selu Pupnat, koji nudi autentično korčulansko gastronomsko iskustvo. Specijaliziran za plodove mora i lokalnu kuhinju otoka, Pagar nema fiksni jelovnik – sami odabirete svježi ulov dana (jastoge, ribu, lignje) i domaće povrće. Vlasnička obitelj potom peče ili kuha vaš odabir na otvorenoj vatri ili pod pekom, poslužujući ga s domaćim maslinovim uljem, povrćem i lokalnim vinom. Jelo se poslužuje na terasi s pogledom na krajolik, pružajući nezaboravan, obilan obrok u tradicionalnom okruženju.",
      image: "/images/locations/pagar-pupnat.webp",
      location: "https://maps.app.goo.gl/aCYmhW13u63JFHBy7",
      distance: {
        minutes: 15,
        mean: "car",
      },
      featureEn: "Seafood feast",
      featureHr: "Morski specijaliteti",
      link: "https://www.facebook.com/Agroturizam-Pagar-Pupnat-461612723987230/",
    },
    {
      nameEn: "Konoba Marko Polo (Kneže)",
      nameHr: "Konoba Marko Polo (Kneže)",
      descriptionEn:
        "Located in the sleepy bay of Kneže on Korčula’s north coast, Konoba Marko Polo is a cozy seaside tavern renowned for its fresh seafood and homestyle Dalmatian dishes. Run by a local family, the konoba features an open-air terrace by the water and a rustic interior with an open hearth. Guests can savor grilled fish, octopus under the peka, black risotto, and other island specialties, all while enjoying views of the Pelješac channel. With its friendly service and authentic atmosphere, this konoba offers a true taste of Korčulan hospitality by the sea.",
      descriptionHr:
        "Smještena u mirnoj uvali Kneže na sjevernoj obali Korčule, konoba Marko Polo ugodna je konoba uz more poznata po svježoj ribi i domaćim dalmatinskim jelima. Vodena od strane lokalne obitelji, konoba ima terasu tik uz more i rustikalnu unutrašnjost s ognjištem. Gosti mogu kušati ribu na žaru, hobotnicu ispod peke, crni rižot i druge otočke specijalitete, a sve to uz pogled na Pelješki kanal. Uz prijateljsku uslugu i autentičan ugođaj, ova konoba pruža istinski doživljaj korčulanske gostoljubivosti uz more.",
      image: "/images/locations/marko-polo-kneze.webp",
      location: "https://maps.app.goo.gl/CRN2XyiPbyGfCqev8",
      distance: {
        minutes: 15,
        mean: "car",
      },
      featureEn: "Seaside tavern",
      featureHr: "Konoba uz more",
      link: "https://www.timeout.com/croatia/restaurants/konoba-marko-polo",
    },
    {
      nameEn: "Šimunovo Agrotourism (Smrč)",
      nameHr: "Agroturizam Šimunovo (Smrč)",
      descriptionEn:
        "Šimunovo is a family-run agrotourism and tavern hidden in the hamlet of Smrč on Korčula’s southern slopes. Here, under a vine-covered patio, guests are treated to true homemade island cuisine. The menu features whatever is fresh and local: slow-cooked meat or octopus under peka, grilled lamb or fish over open coals, and organic vegetables from the garden. Everything is prepared in a traditional way by the Curać family, accompanied by their house wine and olive oil. Dining at Šimunovo feels like visiting a Korčulan farmhouse – expect hearty portions, simple delicious flavors, and genuine hospitality off the beaten path.",
      descriptionHr:
        "Šimunovo je obiteljski vođen agroturizam i konoba skrivena u zaseoku Smrč na južnim obroncima Korčule. Na terasi ispod loze gosti uživaju u pravoj domaćoj otočkoj kuhinji. Na jelovniku je ono što je svježe i lokalno: polagano pečeno meso ili hobotnica ispod peke, janjetina ili riba na gradelama te organsko povrće iz vrta. Sve priprema obitelj Curać na tradicionalan način, uz vlastito vino i maslinovo ulje. Večera u Šimunovu kao da posjećujete korčulansko seosko domaćinstvo – očekujte obilne porcije, jednostavne ukusne okuse i iskreno gostoprimstvo daleko od turističnih staza.",
      image: "/images/locations/smrc-simunovo.webp",
      location: "https://maps.app.goo.gl/WEzEzU5CxKbfg2A87",
      distance: {
        minutes: 25,
        mean: "car",
      },
      featureEn: "Farm dining",
      featureHr: "Domaća kuhinja",
      link: "mailto:marin.curac@gmail.com",
    },
    {
      nameEn: "Ćakulona Bistro",
      nameHr: "Bistro Ćakulona",
      descriptionEn:
        "Ćakulona is a tiny bistro tucked in a side street of Korčula’s Old Town, beloved for its warm ambiance and home-style cooking. With only a few tables, this family-run spot (whose name means “chatterbox”) serves whatever the chef-owner Renata has prepared fresh that day – often traditional Korčulan comfort food. House specialties include her famous makaruni pasta with hearty meat sauce, slow-cooked casseroles, and tasty appetizers using seasonal ingredients. Dining here feels like eating in a local’s home, complete with friendly conversation and a personal touch in every dish.",
      descriptionHr:
        "Ćakulona je maleni bistro skriven u sporednoj ulici starog grada Korčule, omiljen zbog tople atmosfere i domaće kuhinje. Sa samo nekoliko stolova, ovo obiteljsko mjesto (čije ime znači “ćakulica”) poslužuje ono što je vlasnica-kuharica Renata toga dana svježe pripremila – često tradicionalnu korčulansku utješnu hranu. Među specijalitetima su njeni čuveni makaruni s bogatim mesnim umakom, jela iz pećnice koja se dugo krčkaju i ukusna predjela od sezonskih namirnica. Jesti ovdje djeluje kao obrok u domu mještana, uz prijatan razgovor i osobnu notu u svakom jelu.",
      image: "/images/locations/cakulona.webp",
      location: "https://maps.app.goo.gl/AkdoiyAyCEMm1A116",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Homemade pasta",
      featureHr: "Domaći makaruni",
      link: "https://www.tripadvisor.com/Restaurant_Review-g1007309-d8471594-Cakulona-Korcula_Town_Korcula_Island_Dubrovnik_Neretva_County_Dalmatia.html",
    },
    {
      nameEn: "Konoba Aterina",
      nameHr: "Konoba Aterina",
      descriptionEn:
        "Aterina is a trendy yet laid-back konoba and wine bar perched on the western edge of Korčula Old Town’s walls. It is known for its inventive small plates and tapas-style Dalmatian dishes – think marinated anchovies, grilled seasonal veggies, local cheeses, and creative bruschettas – as well as hearty mains like homemade gnocchi or seafood stew. With vegetarian-friendly options and an emphasis on fresh local ingredients, Aterina offers a modern twist on traditional flavors. Diners sit on a terrace overlooking the sea and sunset, sipping Korčula wines and enjoying a relaxed, convivial atmosphere.",
      descriptionHr:
        "Aterina je trendovska, ali opuštena konoba i vinski bar smješten na zapadnom rubu zidina starog grada Korčule. Poznata je po svojim inventivnim zalogajima i dalmatinskim jelima u tapas stilu – primjerice mariniranim inćunima, grillanom sezonskom povrću, lokalnim sirevima i kreativnim bruśketama – kao i po izdašnim glavnim jelima poput domaćih njoka ili brodeta od plodova mora. S opcijama prikladnim za vegetarijance i naglaskom na svježim lokalnim namirnicama, Aterina nudi suvremeni zaokret tradicionalnim okusima. Gosti sjede na terasi s koje se pruža pogled na more i zalazak sunca, pijuckajući korčulanska vina u ležernoj, druželjubivoj atmosferi.",
      image: "/images/locations/aterina.webp",
      location: "https://maps.app.goo.gl/KBQ1ZUfKHeQNCVns5",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Local tapas",
      featureHr: "Lokalni zalogaji",
      link: "https://www.korculainfo.com/restaurants/aterina/",
    },
    {
      nameEn: "Konoba Biankura",
      nameHr: "Konoba Biankura",
      descriptionEn:
        "Opened in 2023 in a tucked-away Old Town alley, Konoba Biankura has quickly become a favorite for traditional Korčulan cuisine with a contemporary touch. The restaurant comprises a cozy indoor tavern and a wine bar, both offering a menu of classic Dalmatian dishes – like grilled Adriatic fish, pasticada beef stew with homemade pasta, and seasoned veggies – prepared with modern finesse. Biankura’s chefs prioritize local produce and daily catch, and the extensive wine list highlights Korčula’s Grk and Pošip wines. With its blend of nostalgia and innovation, Biankura provides a memorable dining experience steeped in island tradition.",
      descriptionHr:
        "Otvorena 2023. u zabačenoj kaleti starog grada, konoba Biankura brzo je postala omiljena po tradicionalnoj korčulanskoj kuhinji s modernim štihom. Restoran se sastoji od ugodne unutarnje konobe i wine bara, a nudi jelovnik klasičnih dalmatinskih jela – poput ribe s gradela, pašticade s domaćim makarunima i začinjenog povrća – pripremljenih s modernom finesom. Kuhari u Biankuri naglasak stavljaju na lokalne namirnice i dnevni ulov, a opsežna vinska lista ističe korčulanske sorte Grk i Pošip. Sa spojem nostalgije i inovacije, Biankura pruža nezaboravno iskustvo objedovanja prožeto otočnom tradicijom.",
      image: "/images/locations/biankura.webp",
      location: "https://maps.app.goo.gl/YYW5HxynEFpyhCoYA",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Innovative konoba",
      featureHr: "Inovativna konoba",
      link: "https://www.biankurakorcula.com/",
    },
    {
      nameEn: "Pepper & Choco",
      nameHr: "Pepper & Choco",
      descriptionEn:
        "Pepper & Choco is a chic bistro and patisserie in the heart of Korčula Town, known for its unique blend of savory and sweet offerings. By day, it operates as a café with a selection of homemade cakes, chocolates, and desserts (the “Choco” side) – perfect for a coffee and pastry break. By night, it transforms into a bistro serving creative small plates and entrees that mix local Dalmatian ingredients with international twists (representing the “Pepper”). You might find indulgent appetizers like fig and goat cheese bruschetta, followed by a spiced seafood curry or a twist on pašticada. With stylish decor and a modern vibe, Pepper & Choco provides a fresh gastronomic experience on Korčula’s dining scene.",
      descriptionHr:
        "Pepper & Choco moderan je bistro i slastičarnica u srcu grada Korčule, poznat po jedinstvenom spoju slanih i slatkih ponuda. Danju radi kao kafić sa izborom domaćih kolača, čokoladnih pralina i deserata (“Choco” strana) – idealno za predah uz kavu i slasticu. Navečer se pretvara u bistro koji poslužuje kreativne male zalogaje i glavna jela koja miješaju lokalne dalmatinske sastojke s međunarodnim utjecajima (odraz “Pepper” strane). Možete pronaći raskošna predjela poput brusketa s smokvama i kozjim sirom, a zatim pikantni morski curry ili inovativnu verziju pašticade. Uz otmjen interijer i modernu vibru, Pepper & Choco donosi svjež gastronomski doživljaj na korčulansku kulinarsku scenu.",
      image: "/images/locations/pepper-and-choco.webp",
      location: "https://maps.app.goo.gl/B8Dx7SR8iMBeTQAr5",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Bistro & sweets",
      featureHr: "Bistro i slastice",
      link: "https://www.facebook.com/pepper.and.choco",
    },
    {
      nameEn: "Konoba Adio Mare",
      nameHr: "Konoba Adio Mare",
      descriptionEn:
        "Adio Mare is Korčula’s oldest tavern (since 1974), a family-run restaurant tucked in a narrow alley near the Cathedral. Revered by locals and visitors alike, it serves classic Korčulan dishes in a cozy, stone-walled setting and on a rooftop terrace. Don’t miss their signature dish: homemade makaruni pasta tossed with rich beef sauce, simmered for hours following a generations-old recipe. Other favorites include brodet fish stew, grilled meats, and delightful desserts like rožata custard. With a name meaning “Farewell Sea,” Adio Mare exudes tradition – from the red-checkered tablecloths to the aroma of mom’s cooking – making it a must-visit for an authentic island meal.",
      descriptionHr:
        "Adio Mare najstarija je korčulanska konoba (od 1974.), obiteljski restoran skriven u uskoj uličici blizu katedrale. Cijene ga i lokalni i gosti, a nudi klasična korčulanska jela u ugodnom ambijentu s kamenim zidovima te na krovnoj terasi. Ne propustite njihov zaštitni specijalitet: domaće makarune s bogatim umakom od junetine, koji se krčka satima po receptu koji se prenosi generacijama. Među ostalim favoritima su brodet, meso sa žara i slastice poput rožate. S imenom koje znači “Zbogom more”, Adio Mare odiše tradicijom – od stolnjaka na kockice do mirisa mamine kuhinje – zbog čega je nezaobilazan za autentični otočki obrok.",
      image: "/images/locations/adio-mare.webp",
      location: "https://maps.google.com/?q=42.9620,17.1363",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Traditional cuisine",
      featureHr: "Tradicionalna kuhinja",
      link: "https://www.korculainfo.com/restaurants/adio-mare/",
    },
    {
      nameEn: "LD Restaurant",
      nameHr: "Restoran LD",
      descriptionEn:
        "Part of the boutique Lešić Dimitri Palace hotel, LD Restaurant is Korčula’s premier fine dining establishment – it earned Korčula its first Michelin star in 2020. Chef Marko Gajski’s tasting menus take diners on a creative journey through Dalmatia’s flavors, blending locally sourced seafood, herbs, and produce into artfully presented dishes. Each course (often 5–7 in an evening) is paired with top Croatian wines, and the attentive service elevates the experience. The setting is equally exquisite: an elegant terrace on the medieval walls, with views over the sea. For a special occasion meal that fuses Korčulan tradition and innovation, LD is unmatched.",
      descriptionHr:
        "U sklopu butique hotela Lešić Dimitri Palace nalazi se restoran LD, vrhunac fine dininga na Korčuli – 2020. godine donio je Korčuli prvu Michelinovu zvjezdicu. Chef Marko Gajski na degustacijskim menijima vodi goste na kreativno putovanje kroz okuse Dalmacije, spajajući lokalno ulovljenu ribu, začinsko bilje i proizvode u umjetnički prezentirana jela. Svaki slijed (često 5–7 tijekom večeri) sljubljuje se s ponajboljim hrvatskim vinima, a pažljiva usluga upotpunjuje doživljaj. Ambijent je jednako izvrstan: elegantna terasa na srednjovjekovnim zidinama s pogledom na more. Za svečanu večeru koja spaja korčulansku tradiciju i inovaciju, LD je nenadmašan izbor.",
      image: "/images/locations/ld-restaurant.webp",
      location: "https://maps.app.goo.gl/phaK7f5LE8hptgNeA",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Michelin-starred",
      featureHr: "Michelinov restoran",
      link: "https://www.ldrestaurant.com/",
    },
    {
      nameEn: "Restaurant Filippi",
      nameHr: "Restoran Filippi",
      descriptionEn:
        "Filippi is an elegant restaurant situated along Korčula Town’s seaside promenade, offering modern Dalmatian cuisine with a focus on local ingredients and lighter fare. Its menu changes seasonally, but you can expect dishes like handmade ravioli with Adriatic shrimp, grilled catch-of-the-day fish with blitva (chard and potato), and inventive desserts featuring local fruits and herbs. Filippi’s setting is one of its highlights – tables set just above the lapping waves, under white canopies, providing a romantic ambiance at sunset. With attentive staff and artfully plated food, Filippi presents a refined yet relaxed dining experience by the sea.",
      descriptionHr:
        "Filippi je elegantan restoran smješten uz šetnicu u gradu Korčuli, koji nudi modernu dalmatinsku kuhinju s naglaskom na lokalne sastojke i lakša jela. Jelovnik se mijenja s godišnjim dobima, ali možete očekivati jela poput ručno rađenih raviola punjenih jadranskim škampima, ribe dana na žaru s blitvom te kreativnih deserta s lokalnim voćem i začinima. Jedan od aduta Filippija je njegov ambijent – stolovi smješteni neposredno iznad mora koje oplakuje rivu, pod bijelim tendama, što pruža romantičan ugođaj u suton. Uz pažljivo osoblje i umjetnički aranžirana jela, Filippi predstavlja profinjeno, ali opušteno iskustvo objedovanja uz more.",
      image: "/images/locations/filippi.webp",
      location: "https://maps.google.com/?q=42.9598,17.1352",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Seaside dining",
      featureHr: "Večera uz more",
      link: "https://www.restaurantfilippi.com/",
    },
    {
      nameEn: "LoLe Wine & Tapas Bar",
      nameHr: "LoLe wine & tapas bar",
      descriptionEn:
        "LoLe is a cozy wine and tapas bar nestled in a cobbled alley of Korčula Old Town, famed for its intimate atmosphere and excellent selection of Croatian wines. The owner is passionate about local varietals, so you can sample Grk and Pošip whites from Korčula or robust Plavac Mali reds from Pelješac, all by the glass. To pair with the wine, LoLe serves a rotating array of Dalmatian-style tapas: think prosciutto and Pag cheese platters, marinated seafood, olives, and other bite-sized delicacies that celebrate Croatian flavors. With only a handful of high tables and a friendly knowledgeable host, LoLe provides a personalized evening of wine tasting and light bites – a perfect way to spend a leisurely night in Korčula.",
      descriptionHr:
        "LoLe je intimni wine & tapas bar u kaletici starog grada Korčule, poznat po ugodnom ugođaju i izvrsnom izboru hrvatskih vina. Vlasnik je strastveni poznavatelj lokalnih sorti, pa možete kušati bijeli Grk i Pošip s Korčule ili snažni crni Plavac Mali s Pelješca, sve na čaše. Uz vino, LoLe nudi i rotirajući izbor zalogaja u dalmatinskom stilu: plate pršuta i paškog sira, marinirane morske plodove, masline i druge delicije veličine zalogaja koje slave hrvatske okuse. Sa samo nekoliko barskih stolova i prijateljskim, upućenim domaćinom, LoLe pruža osobno iskustvo kušanja vina i laganih zalogaja – savršen način za provesti opuštenu večer u Korčuli.",
      image: "/images/locations/lole.webp",
      location: "https://maps.google.com/?q=42.9615,17.1365",
      distance: {
        minutes: 5,
        mean: "walk",
      },
      featureEn: "Wine & tapas",
      featureHr: "Vino i tapas",
      link: "https://www.facebook.com/lole.wine.tapas.bar/",
    },
  ],
};

// Convert the categorized data back to a flat array for compatibility with existing code
export const visitData: InsertLocation[] = Object.entries(
  visitDataByCategory
).flatMap(([category, items]) => {
  let typeEn = "";
  let typeHr = "";

  // Determine type values based on category
  switch (category) {
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
  return items.map((item) => ({
    ...item,
    typeEn,
    typeHr,
  }));
});
