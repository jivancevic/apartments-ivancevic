import { Apartment } from '../shared/schema';

// Complete apartment data with all amenities and details
export const apartmentData: Apartment[] = [
  {
    id: 1,
    nameEn: "Magical Oasis",
    nameHr: "Magical Oasis",
    descriptionEn: `Nestled in a hidden lane of Korčula’s medieval Old Town, Magical Oasis is a charming retreat perfect for two. 
  This cozy 35 m² apartment blends historic character with modern comfort – think exposed stone walls and elegant contemporary décor. Guests love the spotless interior and thoughtful touches throughout. The living area features a comfy sofa, flat-screen TV (with Netflix) and air-conditioning, while the bedroom offers a luxuriously comfortable bed with quality linens for a restful night. A fully equipped kitchen provides everything needed to cook, and the sparkling bathroom includes a spacious rain shower, bidet, and plush towels for a touch of luxury. Despite being steps away from Korčula’s iconic landmarks, waterfront promenade, and best restaurants, the apartment stays peaceful – truly an “oasis” amid the lively Old Town. 
  Hosts Josip and his family go above and beyond, greeting guests with warm Dalmatian hospitality and insider tips. With its unbeatable location, romantic ambiance, and all the amenities of home (from fast Wi-Fi to an in-unit washing machine), Magical Oasis promises a delightful stay where you can unwind and enjoy the magic of Korčula.`,
    descriptionHr: `Smješten u mirnoj, skrivenoj uličici srednjovjekovne gradske jezgre Korčule, Magical Oasis pruža šarmantno utočište idealno za dvoje. 
    Ovaj udoban apartman od 35 m² spaja povijesni karakter i suvremeni komfor – kameni zidovi autentičnog ambijenta skladno su spojeni s elegantnim modernim uređenjem. Gosti oduševljeno ističu besprijekornu čistoću interijera i pažljivo osmišljene detalje u svakom kutku. Dnevni boravak nudi udobnu sofu, flat-screen TV (s pristupom Netflixu) i klima-uređaj, dok spavaća soba ima iznimno udoban krevet s kvalitetnom posteljinom za miran san. Potpuno opremljena kuhinja pruža sve potrebno za pripremu obroka, a blistava kupaonica s prostranim tušem, bideom i mekanim ručnicima donosi dašak luksuza. Iako se nalazi nadomak svih znamenitosti, šetnice “iza grada” i najboljih restorana, apartman ostaje tih i miran – prava “oaza” u srcu živahnog Starog Grada. 
    Domaćini Josip i njegova obitelj trude se gostima osigurati neponovljiv boravak: dočekuju goste s toplom dalmatinskom gostoljubivošću i korisnim lokalnim preporukama. Zahvaljujući nenadmašnoj lokaciji, romantičnom ugođaju i svim pogodnostima doma (od brzog Wi-Fi-ja do perilice rublja u apartmanu), Magical Oasis jamči divan boravak u kojem se možete opustiti i doživjeti svu čaroliju Korčule.`,
    images: [
      "/images/apartments/magical-oasis/living1.webp",
      "/images/apartments/magical-oasis/kitchen1.webp",
      "/images/apartments/magical-oasis/room1.webp",
      "/images/apartments/magical-oasis/wc1.webp",
      "/images/apartments/magical-oasis/out1.webp",
      "/images/apartments/magical-oasis/out2.webp",
      "/images/apartments/magical-oasis/hall1.webp",
      "/images/apartments/magical-oasis/room1.webp",
      "/images/apartments/magical-oasis/room2.webp",
      "/images/apartments/magical-oasis/room3.webp",
      "/images/apartments/magical-oasis/living1.webp",
      "/images/apartments/magical-oasis/living2.webp",
      "/images/apartments/magical-oasis/living3.webp",
      "/images/apartments/magical-oasis/living4.webp",
      "/images/apartments/magical-oasis/living5.webp",
      "/images/apartments/magical-oasis/living6.webp",
      "/images/apartments/magical-oasis/living7.webp",
      "/images/apartments/magical-oasis/living8.webp",
      "/images/apartments/magical-oasis/kitchen1.webp",
      "/images/apartments/magical-oasis/kitchen2.webp",
      "/images/apartments/magical-oasis/kitchen3.webp",
      "/images/apartments/magical-oasis/kitchen4.webp",
      "/images/apartments/magical-oasis/kitchen5.webp",
      "/images/apartments/magical-oasis/wc1.webp",
      "/images/apartments/magical-oasis/wc2.webp",
      "/images/apartments/magical-oasis/wc3.webp",
      "/images/apartments/magical-oasis/wc4.webp",
      "/images/apartments/magical-oasis/wc5.webp",
      "/images/apartments/magical-oasis/wc6.webp",
      "/images/apartments/magical-oasis/wc7.webp",
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1400!2d17.13583210884043!3d42.96238425612054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517549e08c53%3A0x20f6b511dabd88db!2sMagical%20Oasis%20for%20two%20in%20Korcula%20Old%20Town!5e0!3m2!1sen!2shr!4v1745508164244!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/magical-old-town-escape-for-two.html",
    airbnbUrl: "https://airbnb.com/h/magical-oasis-for-two-in-old-town-korcula",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e21284eed9fbea95b5d2dcc398220",
      "https://ical.booking.com/v1/export?t=2b421589-cfe4-42ba-9800-94a8a7ffd436"
    ],
    basePeakPrice: 290,
    priceMultiplier: "1.00",
    cleaningFee: 50,
    // Apartment details
    maxGuests: 2,
    type: "apartment",
    roomSizeM2: 35,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: false,
    hasGarden: false,
    hasSeaView: false,
    hasCityView: false, 
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "both",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: true,
    parkingType: "none",
    parkingDetails: null,
    otherAmenities: []
  },
  {
    id: 2,
    nameEn: "Ismaelli Palace",
    nameHr: "Palača Ismaelli",
    descriptionEn: `Indulge in a one-of-a-kind stay at the Sunset Palace Apartment, set within the 600-year-old Ismaelli Palace next to Korčula’s St. Mark’s Cathedral. 
    This expansive apartment (110 m²) offers two spacious bedrooms, a large living/dining area, a fully equipped kitchen, and a newly renovated bathroom – all crowned by a huge private terrace with breathtaking views of the Adriatic Sea. Each evening, you can relax on the terrace with a glass of wine as the sun sets in spectacular fashion over the water. Inside, the apartment’s unique retro-chic design honors its historical roots while providing every modern comfort: high ceilings, vintage decor pieces, and exposed stone walls blend with air-conditioning in every room, fast Wi-Fi, and a smart TV (with Netflix). Guests are amazed by how elegant yet comfortable the space is – from the plush beds and deluxe pillows to thoughtful extras like a coffee/tea station and even earplugs for the nearby cathedral church bells. 
    The location is unbeatable, with the island’s main sights, waterfront, and eateries at your doorstep. Despite the central setting, the apartment feels private and secure, offering a tranquil retreat above the charming Old Town streets. Host Josip earns rave reviews for his exceptional hospitality – meeting guests at the ferry, helping with luggage, and stocking the apartment with everything you could need (and more). Staying at Ismaelli Palace’s Sunset Flat is not just lodging, but an immersive experience of Korčula’s history and soul – with comfort, luxury, and unforgettable views included.`,
    descriptionHr: `Pružite si jedinstven doživljaj boravka u Apartmanu Sunset Palace, smještenom u palači Ismaelli staroj 600 godina tik uz korčulansku katedralu sv. Marka. 
    Ovaj prostrani apartman (110 m²) obuhvaća dvije prostrane spavaće sobe, veliki dnevni boravak s blagovaonicom, potpuno opremljenu kuhinju i novoobnovljenu kupaonicu. Kruna ovog apartmana jest raskošna privatna terasa s očaravajućim pogledom na Jadransko more. Svake večeri možete se opustiti na terasi uz čašu vina dok sunce spektakularno zalazi nad morem. Unutrašnjost krasi jedinstveni retro-šik dizajn koji odaje počast povijesnom naslijeđu palače, a istovremeno pruža sve moderne pogodnosti. Visoki stropovi, vintage detalji i izloženi kameni zidovi skladno su spojeni s klima-uređajima u svakoj prostoriji, brzim Wi-Fi internetom i pametnim TV-om (Netflix uključen). Gosti su oduševljeni elegantnošću, a ipak udobnošću apartmana – od vrhunskih madraca i jastuka do pažljivo osmišljenih dodataka poput kutka za kavu/čaj, pa čak i čepića za uši (za zvonjavu obližnjih crkvenih zvona). 
    Lokacija je nenadmašna: sve znamenitosti otoka, riva i izvrsni restorani nalaze se pred vratima palače. Unatoč centralnoj  poziciji, apartman pruža privatnost i mir, kao spokojno utočište iznad šarmantnih ulica Staroga Grada. Domaćin Josip dobiva izvrsne pohvale za svoje gostoprimstvo. Boravak u palači Ismaelli – Sunset apartmanu nije samo smještaj, već doživljaj korčulanske povijesti i duše, uz potpunu udobnost, luksuz i nezaboravne poglede.`,
    images: [
      "/images/apartments/ismaelli/balcony.webp",
      "/images/apartments/ismaelli/balcony-night.webp",
      "/images/apartments/ismaelli/bedroom1.webp",
      "/images/apartments/ismaelli/bedroom1-2.webp",
      "/images/apartments/ismaelli/bedroom2.webp",
      "/images/apartments/ismaelli/bathroom.webp",
      "/images/apartments/ismaelli/bathroom2.webp",
      "/images/apartments/ismaelli/kitchen.webp",
      "/images/apartments/ismaelli/living-room.webp",
      "/images/apartments/ismaelli/view.webp",
      "/images/apartments/ismaelli/view-living-room.webp",
      "/images/apartments/ismaelli/cathedral-view.webp",
      "/images/apartments/ismaelli/sunset.webp",
      "/images/apartments/ismaelli/street.webp",
      "/images/apartments/ismaelli/yard.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.795764736335!2d17.13304757563006!3d42.961508171143315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a6c1cbb5f%3A0x2849d1dc0357a5b5!2sUl.%20Ismaelli%205%2C%2020260%2C%20Kor%C4%8Dula%2C%20Croatia!5e0!3m2!1sen!2sen!4v1747852713021!5m2!1sen!2sen",
    bookingUrl: null,
    airbnbUrl: "https://airbnb.com/h/korcula-old-town-palace-sunset-flat",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
    ],
    basePeakPrice: 440,
    priceMultiplier: "1.00",
    cleaningFee: 80,
    // Apartment details
    maxGuests: 4,
    type: "apartment",
    roomSizeM2: 110,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Bedroom 2",
        nameHr: "Soba 2",
        beds: [
          {
            type: "single",
            count: 2
          }
        ]
      }
    ],
    bathrooms: 3,
    // Amenities
    hasKitchen: true,
    hasBalcony: true,
    hasGarden: false,
    hasSeaView: true,
    hasCityView: true,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: true,
    parkingType: "none",
    parkingDetails: null,
    otherAmenities: []
  },
  {
    id: 3,
    nameEn: "Saint Roko",
    nameHr: "Sveti Roko",
    descriptionEn: `Experience the charm of Korčula’s Old Town at Apartment St. Roko, an authentic stone residence nestled on the main cobbled street within the city walls. 
    This stylish 26 m² apartment has been thoughtfully renovated to blend historic character with modern comfort. Inside you’ll find tasteful decor accented by local art and original architectural details, creating a warm, inviting ambiance. The cozy living area features a sofa and flat-screen TV, while a compact kitchenette comes fully equipped (microwave, kettle, fridge, and more) for your convenience. In the bedroom, a very comfortable bed with quality linens promises restful sleep, and the surprisingly spacious bathroom offers a walk-in shower and all modern fixtures. Step outside and you’re mere steps from boutique shops, cafes, renowned restaurants, and even Korčula’s famous turret-top cocktail bar – yet nights are peaceful and quiet thanks to the apartment’s sound-insulated windows and thick stone walls. Guests consistently praise the fantastic location and the personal touch of the hosts. 
    Owner Vicko often greets guests at the ferry port and shares insider tips (even inviting visitors to local cultural events like the sword dance), ensuring you feel truly at home. With its blend of historic charm, comfort, and unbeatable convenience, Old Town St. Roko Apartment is an ideal hideaway for couples or solo travelers seeking a memorable Korčula stay.`,
      descriptionHr: `Doživite šarm korčulanskog Starog Grada u Apartmanu Sveti Roko, smještenom u autentičnoj kamenoj kući na glavnoj popločanoj ulici unutar gradskih zidina. 
      Ovaj elegantno obnovljeni apartman od 26 m² vješto spaja povijesni ugođaj s modernom udobnošću. Dopadljivo uređen interijer sadrži detalje lokalnih umjetnika i očuvane izvorne elemente arhitekture, stvarajući topao i ugodan ambijent. U dnevnom boravku čeka Vas udoban kauč i flat-screen TV, a mala čajna kuhinja potpuno je opremljena (mikrovalna, kuhalo za vodu, hladnjak i ostalo) za sve Vaše potrebe. U spavaćoj sobi nalazi se iznimno udoban krevet s kvalitetnom posteljinom koji jamče miran san, dok iznenađujuće prostrana kupaonica nudi walk-in tuš i sve moderne sadržaje. Izađete li van, naći ćete se na korak od butika, kafića, vrhunskih restorana, pa čak i čuvenog koktel bara na vrhu srednjovjekovne kulei – a unatoč središnjoj lokaciji, noću vlada tišina zahvaljujući zvučno izoliranim prozorima i debelim kamenim zidovima. Gosti neprestano hvale fantastičnu lokaciju i osobni pristup domaćina. 
      Vlasnik Vicko često dočeka goste već u luci te podijeli insajderske savjete (ponekad čak i poziv na lokalne manifestacije poput tradicionalnog mačevalačkog plesa), čineći da se ovdje osjećate kao kod kuće. Spoj povijesnog šarma, udobnosti i vrhunske praktičnosti čini Apartman Sveti Roko savršenim izborom za parove ili solo putnike u potrazi za nezaboravnim boravkom u Korčuli.
`,
    images: [
      "/images/apartments/st-roko/ispred.jpg",
      "/images/apartments/st-roko/krevet.jpg",
      "/images/apartments/st-roko/kuhinja.jpg",
      "/images/apartments/st-roko/kuhinja2.jpg",
      "/images/apartments/st-roko/ostava.jpg",
      "/images/apartments/st-roko/siroko.jpg",
      "/images/apartments/st-roko/siroko2.jpg",
      "/images/apartments/st-roko/ulaz.jpg",
      "/images/apartments/st-roko/wc.jpg",
      "/images/apartments/st-roko/wc2.jpg"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d17.130864458988793!3d42.9616473522362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartment%20St.%20Roko!5e0!3m2!1sen!2shr!4v1747837157249!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/old-town-st-roko.html",
    airbnbUrl: "https://airbnb.com/h/apartment-st-roko",
    icalUrls: [
      "https://airbnb.com/calendar/ical/1464339348196756738.ics?s=ac984c0abc2db6e63af3721318241e52",
      "https://ical.booking.com/v1/export?t=80af3713-fc99-4a39-9bf3-5d33e0bb1b9b"
    ],
    basePeakPrice: 165,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    // Apartment details
    maxGuests: 4,
    type: "studio",
    roomSizeM2: 26,
    bedrooms: [
      {
        nameEn: "Studio",
        nameHr: "Studio",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: false,
    hasGarden: false,
    hasSeaView: false,
    hasCityView: false,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: true,
    parkingType: "none",
    parkingDetails: null,
    otherAmenities: []
  },
  {
    id: 4,
    nameEn: "Lavender",
    nameHr: "Lavanda",
    descriptionEn: `Apartment Lavender welcomes you with a blend of modern comfort and Mediterranean charm. 
    This top-floor, two-bedroom retreat (plus a cozy single room) offers panoramic views of the Adriatic Sea, Korčula’s green hills, and even the silhouette of Korčula Old Town from its private balcony. The spacious interior is thoughtfully decorated, echoing the soothing hues of lavender for a truly relaxing ambiance. Guests appreciate the two full bathrooms and fully equipped kitchen – perfect for families or groups of up to five seeking convenience and privacy. The airy living room opens to a sunny balcony where you can savor breakfast with a sea breeze or dine under the stars. 
    Just steps below, a quiet pebbly beach with crystal-clear water awaits for morning swims or lazy afternoons. Korčula’s Old Town is a scenic 20-minute walk away, making it easy to explore local shops and restaurants. Previous guests rave about the spotless cleanliness, the stunning views, and the warm hospitality of the hosts. Apartment Viva Lavender invites you to experience Korčula’s beauty in comfort and style.`,
    descriptionHr: `Apartman Lavanda pruža suvremenu udobnost u kombinaciji s mediteranskim šarmom. 
    Ova oaza na najvišem katu, s dvije spavaće sobe i dodatnom manjom jednokrevetnom sobom, nudi panoramski pogled na Jadransko more, zelene brežuljke Korčule, pa čak i siluetu korčulanskog starog grada s privatnog balkona. Prostrana unutrašnjost promišljeno je uređena u umirujućim tonovima lavande, stvarajući zaista opuštajući ugođaj. Gostima se posebno sviđaju dvije kompletne kupaonice te potpuno opremljena kuhinja – savršeno za obitelji ili grupe do pet osoba koje traže praktičnost i privatnost. Svijetli dnevni boravak izlazi na osunčani balkon gdje možete uživati u doručku uz povjetarac ili večerati pod zvijezdama. Odmah ispod apartmana nalazi se mirna šljunčana plaža s kristalno čistim morem, idealna za jutarnje kupanje ili ljenčarenje popodne. Do starog grada vodi slikovita šetnja od oko 20 minuta, što olakšava obilazak lokalnih dućana i restorana. Prethodni gosti oduševljeno hvale besprijekornu čistoću, zadivljujuće poglede i srdačno gostoprimstvo domaćina. Apartman Viva Lavander poziva vas da u udobnosti i stilu doživite sve ljepote Korčule.`,
    images: [
      "/images/apartments/lavender/balcony.webp",
      "/images/apartments/lavender/balcony2.webp",
      "/images/apartments/lavender/balcony3.webp",
      "/images/apartments/lavender/books.webp",
      "/images/apartments/lavender/dining-room.webp",
      "/images/apartments/lavender/entrance.webp",
      "/images/apartments/lavender/exterior.webp",
      "/images/apartments/lavender/kitchen.webp",
      "/images/apartments/lavender/living-room.webp",
      "/images/apartments/lavender/location.webp",
      "/images/apartments/lavender/room1.webp",
      "/images/apartments/lavender/room1-2.webp",
      "/images/apartments/lavender/room2.webp",
      "/images/apartments/lavender/room2-2.webp",
      "/images/apartments/lavender/stairs.webp",
      "/images/apartments/lavender/table.webp",
      "/images/apartments/lavender/view.webp",
      "/images/apartments/lavender/view2.webp",
      "/images/apartments/lavender/view3.webp",
      "/images/apartments/lavender/wc1.webp",
      "/images/apartments/lavender/wc2.webp",
      "/images/apartments/lavender/wc3.webp",
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d17.129945983275697!3d42.83819729673939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sen!4v1747837786693!5m2!1sen!2sen",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-lavender",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/7353092.ics?s=eae1da13782e4b81009bcd64f58bd357",
      "https://ical.booking.com/v1/export?t=a0e8002c-1a82-4ca9-a900-50b1729a5c2d"
    ],
    basePeakPrice: 220,
    priceMultiplier: "1.00",
    cleaningFee: 80,
    // Apartment details
    maxGuests: 5,
    type: "apartment",
    roomSizeM2: 76,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Bedroom 2",
        nameHr: "Soba 2", 
        beds: [
          {
            type: "single",
            count: 2
          }
        ]
      },
      {
        nameEn: "Bedroom 3",
        nameHr: "Soba 3",
        beds: [
          {
            type: "single",
            count: 1
          }
        ]
      },
      {
        nameEn: "Living room",
        nameHr: "Dnevni boravak",
        beds: [
          {
            type: "sofa",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 2,
    // Amenities
    hasKitchen: true,
    hasBalcony: true,
    hasGarden: false,
    hasSeaView: true,
    hasCityView: false,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    otherAmenities: []
  },
  {
    id: 5,
    nameEn: "Sun",
    nameHr: "Sunce",
    descriptionEn: `Welcome to Apartment Sun – a bright, charming retreat just steps from Korčula's historic Old Town. 
    
    This modern two-bedroom apartment for up to four guests offers all the comforts of home with a touch of Mediterranean charm. Inside, you'll find a spacious open-plan living area filled with natural light and tasteful decor. Relax on the comfortable sofa and unwind with a movie on the flat-screen TV, or enjoy a meal at the dining table by the balcony. The living area flows into a fully equipped kitchen with modern appliances and all the cookware you need to prepare your favorite meals. You'll also appreciate amenities like air conditioning to keep you cool and high-speed Wi-Fi to keep you connected. 

    Upstairs, two cozy bedrooms promise a restful night's sleep. One offers a plush double bed under a skylight – perfect for stargazing – while the second has two twin beds ideal for children or friends. Quality linens and ample storage are provided so you can settle in comfortably. A clean, modern bathroom is also upstairs, featuring a bathtub/shower combo, fresh towels, and even a washing machine for your convenience. One of the highlights of Apartment Sun is the private balcony. Step outside with your morning coffee or an evening glass of wine and take in views of the neighborhood's red-tiled rooftops and green hills. The balcony's bistro set offers a lovely spot to relax and soak up the island atmosphere – from sunny breakfasts to romantic sunset toasts. 
    
    Location is everything, and Apartment Sun delivers. Tucked away on a quiet street, it's only a short stroll from the ancient walls of Korčula Old Town. In minutes you can wander the maze of cobblestone streets, explore historic landmarks, and dine at seafront cafes. The waterfront, markets, and ferry port are also within easy reach. Despite being so close to the sights, the apartment offers a peaceful haven to return to at the end of each day. 
    
    Whether you're a couple seeking a romantic getaway or a family on holiday, you'll feel right at home at Apartment Sun. It's the perfect blend of comfort, charm, and convenience – and we can't wait to host you for an unforgettable stay in Korčula!`,
    descriptionHr: `Dobrodošli u Apartman Sunce – svijetlu i šarmantnu oazu smještenu tek nekoliko koraka od povijesne jezgre starog grada Korčule.

    Ovaj moderni dvosobni apartman za do četiri osobe nudi sve udobnosti doma uz dašak mediteranskog šarma. Unutra vas očekuje prostrani dnevni boravak otvorenog tipa ispunjen prirodnim svjetlom i ukusnim detaljima. Opustite se na udobnom kauču uz film na ravnom ekranu ili uživajte u obroku za stolom uz balkon. Dnevni prostor povezan je s potpuno opremljenom kuhinjom koja sadrži sve potrebne aparate i posuđe za pripremu omiljenih jela. Klimatizacija će vas rashladiti tijekom toplijih dana, a brzi Wi-Fi omogućit će vam da ostanete povezani.

    Na katu se nalaze dvije ugodne spavaće sobe koje jamče miran san. Jedna ima udoban bračni krevet smješten ispod krovnog prozora – idealno za promatranje zvijezda – dok druga sadrži dva odvojena kreveta, savršena za djecu ili prijatelje. Na raspolaganju su vam kvalitetna posteljina i dovoljno prostora za odlaganje stvari. Kat uključuje i moderno uređenu kupaonicu s kadom/tušem, svježim ručnicima te perilicom rublja za dodatnu praktičnost.

    Jedan od najljepših dijelova apartmana je privatni balkon. Izađite s jutarnjom kavom ili čašom vina pri zalasku sunca i uživajte u pogledu na crvene krovove i zelene brežuljke okolice. S garniturom za sjedenje na balkonu možete uživati u opuštenoj atmosferi otoka – od sunčanih doručaka do romantičnih večeri.

    Lokacija je savršena – apartman se nalazi u mirnoj ulici, a svega je nekoliko minuta hoda udaljen od starogradskih zidina Korčule. U trenu ste u srcu grada, gdje vas čekaju kamene uličice, povijesne znamenitosti i restorani uz more. U blizini su i riva, tržnica te trajektna luka. Iako je smješten tako blizu centra, apartman nudi mirno utočište nakon dana istraživanja.

    Bilo da dolazite u dvoje na romantičan odmor ili s obitelji na ljetovanje, u Apartmanu Sunce ćete se osjećati kao kod kuće. To je idealan spoj udobnosti, šarma i odlične lokacije – veselimo se što ćemo vas ugostiti za nezaboravan boravak na Korčuli!`,
    images: [
      "/images/apartments/sun/living1.webp",
      "/images/apartments/sun/balcony1.webp",
      "/images/apartments/sun/living2.webp",
      "/images/apartments/sun/kitchen1.webp",
      "/images/apartments/sun/room1-1.webp",
      "/images/apartments/sun/room2-1.webp",
      "/images/apartments/sun/wc1-3.webp",
      "/images/apartments/sun/wc2-2.webp",
      "/images/apartments/sun/living3.webp",
      "/images/apartments/sun/living4.webp",
      "/images/apartments/sun/living5.webp",
      "/images/apartments/sun/living6.webp",
      "/images/apartments/sun/living7.webp",
      "/images/apartments/sun/living8.webp",
      "/images/apartments/sun/kitchen2.webp",
      "/images/apartments/sun/kitchen3.webp",
      "/images/apartments/sun/kitchen4.webp",
      "/images/apartments/sun/balcony2.webp",
      "/images/apartments/sun/room1-2.webp",
      "/images/apartments/sun/room1-3.webp",
      "/images/apartments/sun/room1-4.webp",
      "/images/apartments/sun/room2-2.webp",
      "/images/apartments/sun/view1.webp",
      "/images/apartments/sun/wc1-1.webp",
      "/images/apartments/sun/wc1-2.webp",
      "/images/apartments/sun/wc1-4.webp",
      "/images/apartments/sun/wc1-5.webp",
      "/images/apartments/sun/wc2-1.webp",
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d17.129945983275697!3d42.83819729673939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sen!4v1747837786693!5m2!1sen!2sen",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-sun",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/3289636.ics?s=3fc4d298685df0c27704199880b09d8c",
      "https://ical.booking.com/v1/export?t=81e13606-d72b-4e45-91d2-c6e73b6a0aed"
    ],
    basePeakPrice: 192,
    priceMultiplier: "1.00",
    cleaningFee: 70,
    // Apartment details
    maxGuests: 4,
    type: "apartment",
    roomSizeM2: 57,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Bedroom 2",
        nameHr: "Soba 2",
        beds: [
          {
            type: "single",
            count: 2
          }
        ]
      },
      {
        nameEn: "Living room",
        nameHr: "Dnevni boravak",
        beds: [
          {
            type: "sofa",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: true,
    hasGarden: false,
    hasSeaView: false,
    hasCityView: true,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    otherAmenities: []
  },
  {
    id: 6,
    nameEn: "Sea",
    nameHr: "More",
    descriptionEn: `Apartment Viva Sea is a stylish studio for two, offering breathtaking vistas and a serene atmosphere. Perched above the bay, this open-plan retreat maximizes space with a comfortable double bed, a compact kitchenette, and a modern bathroom. The décor is contemporary with touches of coastal charm, letting the sparkling sea view take center stage. Step out onto the private balcony and you’re greeted by an expansive panorama of the crystal-clear bay and the majestic Pelješac mountains across the channel. It’s the perfect spot to sip local wine at sunset or start your day with breakfast in the fresh sea air. Apartment Viva Sea comes equipped with all the essentials: air conditioning, free WiFi, satellite TV, and even a washing machine for your convenience. Adventure is close at hand – the calm bay below is great for swimming and snorkeling, and the area is known for windsurfing and scenic cycling routes. Korčula’s famous Old Town is around 1 km away (about a 15–20 minute walk), so you can enjoy both tranquility and cultural sights with ease. Guests consistently praise the panoramic views and peaceful location in their reviews, noting how rejuvenating their stay in Viva Sea was and applauding the attentive, friendly hosts. Whether you’re a couple seeking romance or a solo traveler longing for a quiet seaside escape, Viva Sea offers an unforgettable Korčula experience.`,
    descriptionHr: `Apartman Viva Sea moderan je studio za dvoje, s prekrasnim vidicima i spokojnim ugođajem. Smješten iznad uvale, ovaj otvoreni studio maksimalno koristi svoj prostor te nudi udoban bračni krevet, malu čajnu kuhinju i modernu kupaonicu – sve što vam treba za opušten boravak. Interijer je suvremen s daškom mediteranskog šarma, a blistav pogled na more uvijek je u prvom planu. S privatnog balkona pruža se široka panorama kristalno čiste uvale i impresivnih peljeških planina preko puta kanala. To je savršeno mjesto za uživanje u čaši domaćeg vina u suton ili za početak dana doručkom na svježem morskom zraku. Apartman Viva Sea opremljen je svim bitnim sadržajima: klima-uređajem, besplatnim Wi-Fi internetom, satelitskom TV i čak perilicom rublja za vašu udobnost. Avantura vam je također nadohvat ruke – mirna uvala ispod izvrsna je za plivanje i ronjenje, a okolica je poznata po jedrenju na dasci i slikovitim biciklističkim stazama. Čuveni stari grad Korčule udaljen je oko 1 km (15–20 minuta hoda), tako da možete lako uživati i u miru i u kulturnim znamenitostima. Gosti u recenzijama neprestano hvale panoramski pogled i miran položaj – mnogi ističu kako su se tijekom boravka u Vivi Sea zaista odmorili, a pohvaljuju i susretljive, prijazne domaćine. Bilo da ste par u potrazi za romantičnim bijegom ili solo putnik koji želi tiho utočište uz more, Viva Sea nudi nezaboravno korčulansko iskustvo.`,
    images: [
      "/images/apartments/sea/balcony.webp",
      "/images/apartments/sea/bedroom.webp",
      "/images/apartments/sea/exterior.webp",
      "/images/apartments/sea/location.webp",
      "/images/apartments/sea/wc.webp",
      "/images/apartments/sea/whole.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d17.129945983275697!3d42.83819729673939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sen!4v1747837786693!5m2!1sen!2sen",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-sea",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/19014861.ics?s=f8c3b2e230826d572c35ea739efb6e2a",
      "https://ical.booking.com/v1/export?t=b1213fe7-0aa3-47ec-9c78-6046a50fea91"
    ],
    basePeakPrice: 110,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    // Apartment details
    maxGuests: 2,
    type: "studio",
    roomSizeM2: 28,
    bedrooms: [
      {
        nameEn: "Studio",
        nameHr: "Studio",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: true,
    hasGarden: false,
    hasSeaView: false,
    hasCityView: true,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: false,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    otherAmenities: []
  },
  {
    id: 7,
    nameEn: "Beach",
    nameHr: "Plaža",
    descriptionEn: `Apartment Viva Beach is a charming seaside hideaway perfect for a romantic escape or a peaceful retreat for two. Nestled on the ground floor, this one-bedroom apartment boasts its own private courtyard terrace (about 22 m²) surrounded by lush greenery – including fragrant orange and lemon trees that provide natural shade. The cozy interior is thoughtfully arranged, featuring a comfortable double bed, a compact but well-equipped kitchen (with a dishwasher for added convenience), and a modern bathroom with a walk-in shower. The indoor living space seamlessly connects to the outdoor terrace, where you can lounge, sunbathe in privacy, or enjoy al fresco dining with the sound of the sea in the background. A few stone steps lead directly from the property down to a secluded pebble beach known for its crystal-clear water and uncrowded atmosphere – it’s almost like having your own private beach. Despite the tucked-away feel, Korčula’s Old Town is only a short drive or a pleasant 20-minute walk along the coast. Guests often remark in reviews that Apartment Viva Beach’s shady terrace is a highlight of their stay, calling it an “oasis of calm,” and they love the spotless cleanliness and the hospitality of the hosts. If you’re seeking tranquility by the sea with all the comforts of home, Viva Beach delivers an unforgettable experience.`,
    descriptionHr: `Apartman Viva Beach šarmantno je utočište uz more, savršeno za romantičan bijeg ili opuštajući odmor udvoje. Smješten u prizemlju, ovaj jednosobni apartman ima vlastitu privatnu terasu (oko 22 m²) okruženu bujnim zelenilom – mirisna stabla naranče i limuna pružaju prirodan hlad. Ugodan interijer pametno je organiziran te sadrži udoban bračni krevet, kompaktnu ali potpuno opremljenu kuhinju (s perilicom posuđa za dodatnu praktičnost) i modernu kupaonicu s prostranom tuš-kabinom. Unutarnji dnevni prostor neprimjetno se spaja s vanjskom terasom, gdje se možete opustiti, sunčati u privatnosti ili blagovati na otvorenom uz zvuk mora u pozadini. Nekoliko kamenih stuba vodi iz dvorišta izravno do osamljene šljunčane plaže s kristalno čistim morem, koja nije napučena – gotovo kao da imate vlastitu plažu. Unatoč skrovitom ugođaju, stari grad Korčule udaljen je samo kratku vožnju ili ugodnu šetnju od dvadesetak minuta uz obalu. Gosti u recenzijama često ističu da je zasjenjena terasa apartmana Viva Beach vrhunac njihova boravka, opisujući je kao "oazu mira", a hvale i besprijekornu čistoću te gostoljubivost domaćina. Ako tražite spokoj na moru uz sve udobnosti doma, Viva Beach pružit će vam nezaboravno iskustvo.`,
    images: [
      "/images/apartments/beach/bedroom.webp",
      "/images/apartments/beach/exterior.webp",
      "/images/apartments/beach/garden.webp",
      "/images/apartments/beach/location.webp",
      "/images/apartments/beach/terrace.webp",
      "/images/apartments/beach/wc.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d17.129945983275697!3d42.83819729673939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sen!4v1747837786693!5m2!1sen!2sen",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-beach",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/11847437.ics?s=6d2cbbdabf0b62bf08a047cf0712d317",
      "https://ical.booking.com/v1/export?t=3de330a9-30a8-4287-b485-8c665645be23"
    ],
    basePeakPrice: 137.5,
    priceMultiplier: "1.00",
    cleaningFee: 60,
    // Apartment details
    maxGuests: 2,
    type: "apartment",
    roomSizeM2: 33,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: false,
    hasGarden: true,
    hasSeaView: false,
    hasCityView: false,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    otherAmenities: ["Satellite TV", "Hair Dryer", "Terrace with Sea View"]
  },
  {
    id: 8,
    nameEn: "Nika",
    nameHr: "Nika",
    descriptionEn: `Apartment Nika offers a bright and comfortable escape just outside Korčula’s medieval Old Town. Located a leisurely 10-minute walk from the historic center (and only a few minutes from a hidden local beach), Nika rewards guests with a stunning panoramic view of the sea, mountains, and red-roofed Old Town from its private balcony. Inside, the apartment is modern and inviting: there’s a cozy living area with a sofa and flat-screen TV, a dining corner, and a fully equipped kitchen where you can prepare everything from morning coffee to dinner with ease. The separate bedroom features a comfortable double bed dressed in crisp linens, promising a good night’s sleep. Air-conditioning and free Wi-Fi are provided, and guests also have access to a washing machine for convenience. Nestled in a quiet residential neighborhood, the apartment provides peace and relaxation after a day of sightseeing, while still giving you easy access to shops, cafes, the ferry port and all the charms of town. The friendly hosts (the Giuliani family) are highly praised for their warm welcome and helpful local recommendations – they’ll make sure you feel right at home. With its lovely balcony views, well-appointed interior, and convenient location, Apartment Nika has everything you need for a charming and hassle-free stay on Korčula.`,
    descriptionHr: `Apartman Nika nudi svijetao i udoban smještaj nadomak povijesne jezgre Korčule. Smješten samo oko 10 minuta lagane šetnje od Staroga Grada (i tek nekoliko minuta od male skrovite plaže), Nika gostima pruža prekrasan panoramski pogled na more, grad i okolne planine sa svoje privatne balkonske terase. Unutrašnjost apartmana moderna je i ugodna: tu su prostrani dnevni boravak s udobnim kaučem, TV-om ravnog ekrana i kutkom za blagovanje, kao i potpuno opremljena kuhinja u kojoj možete s lakoćom pripremati jutarnju kavu ili večeru. Odvojena spavaća soba sadrži udoban bračni krevet sa svježom posteljinom koja jamči dobar san. Na raspolaganju su vam klima-uređaj i besplatan Wi-Fi, a gosti mogu koristiti i perilicu rublja što boravak čini još praktičnijim. Smješten u mirnom stambenom naselju, apartman pruža tišinu i opuštanje nakon dana razgledavanja, a istovremeno ste u neposrednoj blizini trgovina, kafića, trajektne luke i svih čari grada. Ljubazni domaćini, obitelj Giuliani, poznati su po toploj dobrodošlici i korisnim lokalnim preporukama – pobrinut će se da se u Niki osjećate kao kod kuće. Uz divan pogled s balkona, dobro opremljen interijer i praktičnu lokaciju, Apartman Nika ima sve što vam treba za šarmantan i bezbrižan boravak na Korčuli.`,
    images: [
      "/images/apartments/nika/view.webp",
      "/images/apartments/nika/living-room.webp",
      "/images/apartments/nika/dining-room.webp",
      "/images/apartments/nika/kitchen.webp",
      "/images/apartments/nika/table.webp",
      "/images/apartments/nika/room2.webp",
      "/images/apartments/nika/room2-2.webp",
      "/images/apartments/nika/room-view.webp",
      "/images/apartments/nika/room1.webp",
      "/images/apartments/nika/balcony.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d17.12748487563004!3d42.96148247114323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a516bb56b95d3%3A0x2758c0e472e4450c!2sApartments%20Giuliani!5e0!3m2!1sen!2sen!4v1747665953963!5m2!1sen!2sen",
    bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
    airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-nika",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/27617468.ics?s=e408c51a965bccbbaba29d58295304a6",
      "https://ical.booking.com/v1/export?t=15e633d6-1969-4a84-96f6-7cfbd1b58c80"
    ],
    basePeakPrice: 200,
    priceMultiplier: "1.00",
    cleaningFee: 80,
    // Apartment details
    maxGuests: 7,
    type: "apartment",
    roomSizeM2: 65,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Bedroom 2",
        nameHr: "Soba 2",
        beds: [
          {
            type: "single",
            count: 2
          }
        ]
      },
      {
        nameEn: "Living room",
        nameHr: "Dnevni boravak",
        beds: [
          {
            type: "sofa",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: true,
    hasGarden: false,
    hasSeaView: true,
    hasCityView: true,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: true,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    parkingType: "free",
    parkingDetails: null,
    otherAmenities: []
  },
  {
    id: 9,
    nameEn: "Lara",
    nameHr: "Lara",
    descriptionEn: `Apartment Lara is a cozy Korčula getaway with a delightful local touch. Just a short 10-minute stroll from the Old Town gates (and a few minutes from a small pebble beach), Lara enjoys a peaceful setting and lovely partial sea views. Step outside to your own little patio – the perfect spot to sip morning coffee while gazing at the turquoise Adriatic. Inside, the apartment is clean, bright and outfitted with everything you need. The living area includes a comfortable sofa (ideal for relaxing after a day of exploring) and a flat-screen TV, and opens into a compact kitchen equipped with all the essentials for cooking – from a stovetop and fridge to cookware and a coffee maker. The tranquil bedroom offers a cozy double bed with quality linens to ensure restful nights, and the bathroom is modern, stocked with fresh towels and toiletries. Air-conditioning and free Wi-Fi are provided, and guests of Lara can also use a shared washing machine during longer stays. Tucked in a friendly residential neighborhood just outside the tourist bustle, Apartment Lara lets you experience Korčula like a local – quiet nights, easy walks to town and beach, and authentic charm. Hosts Marija and her family are praised for their warmth and attentiveness; they’ll gladly offer tips on where to eat, swim, and sightsee. Whether you’re enjoying a glass of wine on the patio or unwinding in the comfy living room, Apartment Lara offers charm, comfort, and convenience for your island stay.`,
    descriptionHr: `Apartman Lara pruža ugodno utočište u Korčuli s osebujnim lokalnim šarmom. Nalazi se u mirnom okruženju, oko 10 minuta lagane šetnje od gradskih zidina (i tek nekoliko minuta od male šljunčane plaže). Lara uživa povlašten položaj u tišini stambenog naselja, uz lijep djelomičan pogled na more. Na vlastitoj maloj terasi ispred apartmana možete ispijati jutarnju kavu dok promatrate tirkizno more na obzoru. Unutrašnjost je čista, svijetla i opremljena svime što vam treba. Dnevni boravak nudi udoban kauč za opuštanje nakon istraživanja otoka i TV ravnog ekrana, a spojen je s kompaktnom kuhinjom opremljenom svim potrepštinama za kuhanje – od ploče za kuhanje i hladnjaka do posuđa i aparata za kavu. U mirnoj spavaćoj sobi nalazi se udoban bračni krevet s kvalitetnom posteljinom koja jamči spokojne noći, a kupaonica je moderna, s čistim ručnicima i toaletnim potrepštinama. Na raspolaganju su i klima-uređaj te besplatan Wi-Fi, a gosti Lare mogu koristiti i zajedničku perilicu rublja tijekom duljih boravaka. Smještena izvan vreve turista, u susjedstvu gdje žive lokalni stanovnici, Lara vam omogućuje da doživite Korčulu kao mještanin – mirne noći, lagane šetnje do grada i plaže, te autentičan ugođaj. Domaćini (obitelj Giuliani) poznati su po svojoj srdačnosti i pažnji: rado će vam preporučiti gdje jesti, kupati se ili što posjetiti. Bilo da ispijate čašu vina na terasi u suton ili se odmarate u udobnom dnevnom boravku, Apartman Lara pruža šarm, udobnost i praktičnost za vaš boravak na otoku.`,
    images: [
      "/images/apartments/lara/bed.webp",
      "/images/apartments/lara/bed2.webp",
      "/images/apartments/lara/bed3.webp",
      "/images/apartments/lara/bed4.webp",
      "/images/apartments/lara/kitchen.webp",
      "/images/apartments/lara/kitchen2.webp",
      "/images/apartments/lara/mirror.webp",
      "/images/apartments/lara/table.webp",
      "/images/apartments/lara/table2.webp",
      "/images/apartments/lara/terrace.webp",
      "/images/apartments/lara/view.webp",
      "/images/apartments/lara/wc.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d17.12748487563004!3d42.96148247114323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a516bb56b95d3%3A0x2758c0e472e4450c!2sApartments%20Giuliani!5e0!3m2!1sen!2sen!4v1747665953963!5m2!1sen!2sen",
    bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
    airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-lara",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/29197587.ics?s=8b113ddead9128d420c587e9dd7b1d31",
      "https://ical.booking.com/v1/export?t=b697b0c9-fcbe-4ee1-b416-6d680fe8039e"
    ],
    basePeakPrice: 100,
    priceMultiplier: "1.00",
    cleaningFee: 30,
    // Apartment details
    maxGuests: 2,
    type: "apartment",
    roomSizeM2: 25,
    bedrooms: [
      {
        nameEn: "Studio",
        nameHr: "Studio",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasKitchen: true,
    hasBalcony: true,
    hasGarden: false,
    hasSeaView: true,
    hasCityView: false,
    hasWifi: true,
    hasAC: true,
    hasTV: true,
    hasDishwasher: false,
    washingMachineType: "washing",
    hasHairDryer: true,
    hasCoffeeMachine: false,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    parkingType: "free",
    parkingDetails: null,
    otherAmenities: []
  }
];