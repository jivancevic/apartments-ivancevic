import { Apartment } from '../shared/schema';

// All apartments with complete data including new amenities
export const apartmentData: Apartment[] = [
  {
    id: 1,
    nameEn: "Magical Oasis",
    nameHr: "Magična Oaza",
    descriptionEn: "Your perfect vacation awaits in this stylish apartment with breathtaking views of Korčula's old town. Located in a traditional stone house just steps from the crystal-clear Adriatic Sea, this one-bedroom retreat combines Mediterranean charm with modern comfort. The bright, open-plan living space features a fully equipped kitchen and dining area that opens onto a private terrace—ideal for morning coffee or evening wine as you watch boats glide across the bay. The bedroom offers a comfortable queen bed and ample storage, while the renovated bathroom includes a spacious walk-in shower. Air conditioning, high-speed WiFi, and smart TV ensure all the comforts of home, while authentic architectural details like exposed stone walls and wooden ceiling beams create an atmosphere of timeless elegance.",
    descriptionHr: "Savršen odmor očekuje vas u ovom elegantnom apartmanu s prekrasnim pogledom na stari grad Korčule. Smješten u tradicionalnoj kamenoj kući, samo nekoliko koraka od kristalno čistog Jadranskog mora, ovaj apartman s jednom spavaćom sobom spaja mediteranski šarm s modernom udobnošću. Svijetli otvoreni prostor za življenje sadrži potpuno opremljenu kuhinju i blagovaonicu koja se otvara prema privatnoj terasi—idealnoj za jutarnju kavu ili večernje vino dok promatrate brodove kako klize preko zaljeva. Spavaća soba nudi udoban queen krevet i obilan prostor za odlaganje, dok obnovljena kupaonica uključuje prostrani walk-in tuš. Klima uređaj, brzi WiFi i smart TV osiguravaju svu udobnost doma, dok autentični arhitektonski detalji poput izloženih kamenih zidova i drvenih stropnih greda stvaraju atmosferu bezvremenskog elegantnog prostora.",
    images: [
      "/images/apartments/magical-oasis/aerial.webp",
      "/images/apartments/magical-oasis/balcony.webp",
      "/images/apartments/magical-oasis/bedroom.webp",
      "/images/apartments/magical-oasis/entrance.webp",
      "/images/apartments/magical-oasis/kitchen.webp",
      "/images/apartments/magical-oasis/living-room.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11634.13829008658!2d17.101095019775404!3d42.95736079914995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a7594141dbce1%3A0xe1c79d56cfaa7a6c!2sKor%C4%8Dula%2C%20Croatia!5e0!3m2!1sen!2shr!4v1746787834401!5m2!1sen!2shr",
    airbnbUrl: "https://www.airbnb.com/rooms/plus/12345678",
    bookingUrl: null,
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e21284eed9fbea95b5d2dcc398220",
      "https://ical.booking.com/v1/export?t=2b421589-cfe4-42ba-9800-94a8a7ffd436"
    ],
    basePeakPrice: 120,
    priceMultiplier: "3.00",
    cleaningFee: 40,
    maxGuests: 4,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 65,
    bedrooms: [
      {
        name: "Bedroom 1",
        beds: [
          {
            type: "queen",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Living room",
        beds: [
          {
            type: "sofa bed",
            count: 1,
            emoji: "🛋️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true, 
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "none",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Patio Furniture", "Washing Machine", "Hair Dryer", "Iron"]
  },
  {
    id: 2,
    nameEn: "Ismaelli Palace",
    nameHr: "Palača Ismaelli",
    descriptionEn: "Discover magical moments in the Old Town Palace Sunset Flat apartment, located in the historic Ismaelli Palace. From its windows, as well as from the spacious terrace, there is a spectacular sea view of the sunset. Two comfortable bedrooms, kitchen, living room, renovated bathroom and terrace on more than 110m². The location is perfect - just a step away from the cathedral. Experience the authentic atmosphere of this wonderful place and create unforgettable memories in this unique retro ambience.",
    descriptionHr: "Doživite čarobne trenutke u apartmanu Old Town Palace Sunset Flat, smještenom u povijesnoj palači Ismaelli. S prozora, kao i s prostrane terase, pruža se spektakularan pogled na more i zalazak sunca. Dvije udobne spavaće sobe, kuhinja, dnevni boravak, renovirana kupaonica i terasa na više od 110 m². Lokacija je savršena – samo korak od katedrale. Osjetite autentičnu atmosferu ovog prekrasnog mjesta i stvorite nezaboravne uspomene u ovom jedinstvenom retro ambijentu.",
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
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d17.13522756990842!3d42.96152961092943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a6c1cbb5f%3A0x2849d1dc0357a5b5!2sUl.%20Ismaelli%205%2C%2020260%2C%20Kor%C4%8Dula%2C%20Croatia!5e1!3m2!1sen!2shr!4v1746768250275!5m2!1sen!2shr",
    airbnbUrl: "https://airbnb.com/h/korcula-old-town-palace-sunset-flat",
    bookingUrl: null,
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
    ],
    basePeakPrice: 110,
    priceMultiplier: "4.00",
    cleaningFee: 80,
    maxGuests: 5,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 110,
    bedrooms: [
      {
        name: "Bedroom 1",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Bedroom 2",
        beds: [
          {
            type: "single",
            count: 2,
            emoji: "🛌"
          }
        ]
      },
      {
        name: "Living room",
        beds: [
          {
            type: "sofa bed",
            count: 1,
            emoji: "🛋️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: true,
    hasCityView: true,
    hasDishwasher: true,
    hasCoffeeMachine: true,
    parkingType: "none",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Historic Building", "Cathedral View", "Washing Machine", "Hair Dryer"]
  },
  {
    id: 3,
    nameEn: "Lavender",
    nameHr: "Lavanda",
    descriptionEn: "Apartment Lavender welcomes you with a blend of modern comfort and Mediterranean charm. This top-floor, three-bedroom retreat offers panoramic views of the Adriatic Sea, Korčula's green hills, and even the silhouette of Korčula Old Town from its private balcony. The spacious interior is thoughtfully decorated, echoing the soothing hues of lavender for a truly relaxing ambiance. Guests appreciate the two full bathrooms and fully equipped kitchen – perfect for families or groups of up to five seeking convenience and privacy. The airy living room opens to a sunny balcony where you can savor breakfast with a sea breeze or dine under the stars. Just steps below, a quiet pebbly beach with crystal-clear water awaits for morning swims or lazy afternoons. Korčula's Old Town is a scenic 3-minute walk away, making it easy to explore local shops and restaurants. Previous guests rave about the spotless cleanliness, the stunning views, and the warm hospitality of the hosts. Apartment Lavender invites you to experience Korčula's beauty in comfort and style.",
    descriptionHr: "Apartman Lavanda pruža suvremenu udobnost u kombinaciji s mediteranskim šarmom. Ova oaza na najvišem katu s tri spavaće sobe nudi panoramski pogled na Jadransko more, zelene brežuljke Korčule, pa čak i siluetu korčulanskog Starog grada s privatnog balkona. Prostrana unutrašnjost promišljeno je uređena u umirujućim tonovima lavande, stvarajući opuštajući ugođaj. Gostima se posebno sviđaju dvije kupaonice te potpuno opremljena kuhinja – savršeno za obitelji ili grupe do pet osoba koje traže praktičnost i privatnost. Svijetli dnevni boravak izlazi na osunčani balkon gdje možete uživati u doručku uz povjetarac ili večerati pod zvijezdama. Odmah ispod apartmana nalazi se mirna šljunčana plaža s kristalno čistim morem, idealna za jutarnje kupanje ili ljenčarenje popodne. Do starog grada vodi slikovita šetnja od oko 3 minute, što olakšava obilazak lokalnih dućana i restorana. Prethodni gosti oduševljeno hvale besprijekornu čistoću, zadivljujuće poglede i srdačno gostoprimstvo domaćina. Apartman Lavanda poziva vas da u udobnosti i stilu doživite sve ljepote Korčule.",
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
      "/images/apartments/lavender/room3.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d17.129945983275697!3d42.83819729673939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2shr!4v1747837786693!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-lavender",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/7353092.ics?s=eae1da13782e4b81009bcd64f58bd357"
    ],
    basePeakPrice: 110,
    priceMultiplier: "2.20",
    cleaningFee: 80,
    maxGuests: 6,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 85,
    bedrooms: [
      {
        name: "Bedroom 1",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Bedroom 2", 
        beds: [
          {
            type: "single",
            count: 2,
            emoji: "🛌"
          }
        ]
      },
      {
        name: "Bedroom 3",
        beds: [
          {
            type: "single",
            count: 1,
            emoji: "🛌"
          }
        ]
      }
    ],
    bathrooms: 2,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true,
    hasDishwasher: true,
    hasCoffeeMachine: true,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    hasGarden: false,
    otherAmenities: ["Outdoor Dining Area", "Washing Machine", "Iron", "Hair Dryer"]
  },
  {
    id: 4,
    nameEn: "Sea",
    nameHr: "More",
    descriptionEn: "Air-conditioned, 3 stars studio apartment for 2 people in the centre of town. Living room - kitchen, balcony. Fitted with satellite/TV, DVD, washing machine and other necessary facilities. Living area 28m2 + balcony 6,5m2.",
    descriptionHr: "Klimatizirani studio apartman s 3 zvjezdice za 2 osobe, u samom centru grada. Dnevni boravak s kuhinjom, balkon. Opremljen satelitskom TV, DVD uređajem, perilicom rublja i svim potrebnim sadržajima. Površina 28 m² + balkon 6,5 m².",
    images: [
      "/images/apartments/sea/bedroom.webp",
      "/images/apartments/sea/exterior.webp",
      "/images/apartments/sea/location.webp",
      "/images/apartments/sea/whole.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.2796402065861!2d17.13455596084784!3d42.95820684655463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sit!4v1747665668512!5m2!1sen!2sit",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-sea",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/19014861.ics?s=f8c3b2e230826d572c35ea739efb6e2a"
    ],
    basePeakPrice: 110,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    maxGuests: 2,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 28,
    bedrooms: [
      {
        name: "Studio Room",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    hasGarden: false,
    otherAmenities: ["Washing Machine", "DVD Player", "Satellite TV"]
  },
  {
    id: 5,
    nameEn: "Sun",
    nameHr: "Sunce",
    descriptionEn: "Air-conditioned, 3 stars studio apartment for 2 people at the very heart of the town. Living room - kitchen, balcony. Fitted with satellite/TV, DVD and other necessary facilities. Living area 28m2 + balcony 6,5m2.",
    descriptionHr: "Klimatizirani studio apartman s 3 zvjezdice za 2 osobe, u samom srcu grada. Dnevni boravak s kuhinjom, balkon. Opremljen satelitskom TV, DVD uređajem i svim potrebnim sadržajima. Površina 28 m² + balkon 6,5 m².",
    images: [
      "/images/apartments/sun/bedroom.webp",
      "/images/apartments/sun/exterior.webp",
      "/images/apartments/sun/kitchen.webp",
      "/images/apartments/sun/location.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-sun",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/3289636.ics?s=3fc4d298685df0c27704199880b09d8c"
    ],
    basePeakPrice: 110,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    maxGuests: 2,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 28,
    bedrooms: [
      {
        name: "Studio Room",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    hasGarden: false,
    otherAmenities: ["DVD Player", "Satellite TV", "Hair Dryer"]
  },
  {
    id: 6,
    nameEn: "Beach",
    nameHr: "Plaža",
    descriptionEn: "Air-conditioned, 4 stars suite, 35 m² for 2-3 people. Consists of a bedroom, kitchen, bathroom with jaccuzi and a balcony. Fitted with satellite/TV, radio, internet and other necessary facilities.",
    descriptionHr: "Klimatizirani apartman s 4 zvjezdice, 35 m² za 2-3 osobe. Sastoji se od spavaće sobe, kuhinje, kupaonice s jacuzzijem i balkona. Opremljen satelitskom TV, radiom, internetom i svim potrebnim sadržajima.",
    images: [
      "/images/apartments/beach/bedroom.webp",
      "/images/apartments/beach/exterior.webp",
      "/images/apartments/beach/kitchen.webp",
      "/images/apartments/beach/view.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-beach",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/11847437.ics?s=6d2cbbdabf0b62bf08a047cf0712d317"
    ],
    basePeakPrice: 110,
    priceMultiplier: "1.30",
    cleaningFee: 45,
    maxGuests: 3,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 35,
    bedrooms: [
      {
        name: "Bedroom",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Living Area",
        beds: [
          {
            type: "sofa bed",
            count: 1,
            emoji: "🛋️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    hasGarden: false,
    otherAmenities: ["Jacuzzi Tub", "Satellite TV", "Hair Dryer"]
  },
  {
    id: 7,
    nameEn: "Saint Roko",
    nameHr: "Sveti Roko",
    descriptionEn: "Two bedrooms apartment for 4 people with 4 stars, 50m² + terrace with magnificent sea and Old city view, in top center location. Air-conditioned, SAT/TV, kitchen, bathroom, balcony and a terrace.",
    descriptionHr: "Apartman s dvije spavaće sobe za 4 osobe s 4 zvjezdice, 50m² + terasa s veličanstvenim pogledom na more i Stari grad, na vrhunskoj lokaciji u centru. Klimatiziran, SAT/TV, kuhinja, kupaonica, balkon i terasa.",
    images: [
      "/images/apartments/saint-roko/bedroom.webp",
      "/images/apartments/saint-roko/exterior.webp",
      "/images/apartments/saint-roko/kitchen.webp",
      "/images/apartments/saint-roko/terrace-view.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-saint-roko",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/27617468.ics?s=e408c51a965bccbbaba29d58295304a6&locale=hr"
    ],
    basePeakPrice: 110,
    priceMultiplier: "2.00",
    cleaningFee: 60,
    maxGuests: 4,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 50,
    bedrooms: [
      {
        name: "Bedroom 1",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Bedroom 2",
        beds: [
          {
            type: "single",
            count: 2,
            emoji: "🛌"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: true,
    hasCityView: true,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    hasGarden: false,
    otherAmenities: ["Satellite TV", "Hair Dryer", "Terrace with Sea View"]
  },
  {
    id: 8,
    nameEn: "Nika",
    nameHr: "Nika",
    descriptionEn: "Charming apartment with 3 stars, for 2-3 people. Air-conditioned, consists of a bedroom, kitchen, bathroom, balcony and a terrace. This apartment is situated on the ground floor with access to a garden filled with Mediterranean herbs and plants.",
    descriptionHr: "Šarmantni apartman s 3 zvjezdice, za 2-3 osobe. Klimatiziran, sastoji se od spavaće sobe, kuhinje, kupaonice, balkona i terase. Ovaj se apartman nalazi u prizemlju s pristupom vrtu punom mediteranskog bilja i biljaka.",
    images: [
      "/images/apartments/nika/bedroom.webp",
      "/images/apartments/nika/exterior.webp",
      "/images/apartments/nika/garden.webp",
      "/images/apartments/nika/kitchen.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-nika",
    icalUrls: null,
    basePeakPrice: 200,
    priceMultiplier: "1.50",
    cleaningFee: 40,
    maxGuests: 3,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 40,
    bedrooms: [
      {
        name: "Bedroom",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Living Area",
        beds: [
          {
            type: "sofa bed",
            count: 1,
            emoji: "🛋️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: false,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "free",
    parkingDetails: null,
    hasGarden: true,
    otherAmenities: ["Garden Access", "Outdoor Dining Area", "Ground Floor"]
  },
  {
    id: 9,
    nameEn: "Lara",
    nameHr: "Lara",
    descriptionEn: "Cozy apartment with 3 stars, for 2-3 people. Located on the first floor with a balcony overlooking local gardens. Features a comfortable bedroom, small kitchen, modern bathroom, and air conditioning throughout.",
    descriptionHr: "Udoban apartman s 3 zvjezdice, za 2-3 osobe. Smješten na prvom katu s balkonom s pogledom na lokalne vrtove. Sadrži udobnu spavaću sobu, malu kuhinju, modernu kupaonicu i klimu u cijelom prostoru.",
    images: [
      "/images/apartments/lara/bedroom.webp",
      "/images/apartments/lara/exterior.webp",
      "/images/apartments/lara/kitchen.webp",
      "/images/apartments/lara/view.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-lara",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
    ],
    basePeakPrice: 100,
    priceMultiplier: "1.50",
    cleaningFee: 40,
    maxGuests: 3,
    // Apartment details
    isEntireApartment: true,
    roomSizeM2: 38,
    bedrooms: [
      {
        name: "Bedroom",
        beds: [
          {
            type: "double",
            count: 1,
            emoji: "🛏️"
          }
        ]
      },
      {
        name: "Living Area",
        beds: [
          {
            type: "sofa bed",
            count: 1,
            emoji: "🛋️"
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: false,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Garden View", "Hair Dryer", "Satellite TV"]
  }
];