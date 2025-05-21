import { Apartment } from '../shared/schema';

// Complete apartment data with all amenities and details
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
    // Consolidated price (120 * 3.00 = 360)
    basePeakPrice: 360,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    maxGuests: 4,
    // Apartment details
    type: "apartment",
    roomSizeM2: 65,
    bedrooms: [
      {
        nameEn: "Bedroom",
        nameHr: "Spavaća soba",
        beds: [
          {
            type: "queen",
            count: 1
          }
        ]
      },
      {
        nameEn: "Living room",
        nameHr: "Dnevni boravak",
        beds: [
          {
            type: "sofa bed",
            count: 1
          }
        ]
      }
    ],
    bathrooms: 1,
    // Amenities - with new fields added
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true, 
    hasDishwasher: false,
    hasCoffeeMachine: true,
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: true,
    washingMachineType: "both",
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
      "/images/apartments/ismaelli/living-room2.webp",
      "/images/apartments/ismaelli/terrace.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1466.5748851986003!2d17.135027077599716!3d42.96120679739083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517cc4a01a5b%3A0xda3ca1ada70cf84b!2sOld%20Town%20Palace%20Sunset%20Flat%20Apartment!5e0!3m2!1sen!2shr!4v1746788210903!5m2!1sen!2shr",
    bookingUrl: null,
    airbnbUrl: "https://www.airbnb.com/rooms/plus/12345678",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
    ],
    // Consolidated price (170 * 2.50 = 425)
    basePeakPrice: 425,
    priceMultiplier: "1.00",
    cleaningFee: 60,
    maxGuests: 6,
    // Apartment details
    type: "apartment",
    roomSizeM2: 110,
    bedrooms: [
      {
        nameEn: "Master Bedroom",
        nameHr: "Glavna spavaća soba",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Second Bedroom",
        nameHr: "Druga spavaća soba",
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
            type: "sofa bed",
            count: 1
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: true,
    washingMachineType: "washing",
    parkingType: "none",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Large Terrace", "Historic Building", "Sea View"]
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
      "/images/apartments/lavender/bedroom1.webp",
      "/images/apartments/lavender/bedroom2.webp",
      "/images/apartments/lavender/bedroom3.webp",
      "/images/apartments/lavender/entrance.webp",
      "/images/apartments/lavender/kitchen.webp",
      "/images/apartments/lavender/living-room.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1466.5748851986003!2d17.135027077599716!3d42.96120679739083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517cc4a01a5b%3A0xda3ca1ada70cf84b!2sOld%20Town%20Palace%20Sunset%20Flat%20Apartment!5e0!3m2!1sen!2shr!4v1746788210903!5m2!1sen!2shr",
    bookingUrl: null,
    airbnbUrl: "https://www.airbnb.com/rooms/plus/12345678",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/7353092.ics?s=eae1da13782e4b81009bcd64f58bd357"
    ],
    // Consolidated price (150 * 2.00 = 300)
    basePeakPrice: 300,
    priceMultiplier: "1.00",
    cleaningFee: 60,
    maxGuests: 5,
    // Apartment details
    type: "apartment",
    roomSizeM2: 80,
    bedrooms: [
      {
        nameEn: "Master Bedroom",
        nameHr: "Glavna spavaća soba",
        beds: [
          {
            type: "queen",
            count: 1
          }
        ]
      },
      {
        nameEn: "Second Bedroom",
        nameHr: "Druga spavaća soba",
        beds: [
          {
            type: "single",
            count: 2
          }
        ]
      },
      {
        nameEn: "Third Bedroom",
        nameHr: "Treća spavaća soba",
        beds: [
          {
            type: "single",
            count: 1
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    washingMachineType: "washing",
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Two Bathrooms", "Balcony with City View", "Beach Access"]
  },
  {
    id: 4,
    nameEn: "Sun",
    nameHr: "Sunce",
    descriptionEn: "Our newest apartment for 4 people with 4 stars. 50m² apartment with bedroom, kitchen, bathroom, lounge room. Additionally there is a 60m² terrace with a magnificent view of the Adriatic sea.",
    descriptionHr: "Naš najnoviji apartman za 4 osobe s 4 zvjezdice. Apartman od 50m² sa spavaćom sobom, kuhinjom, kupaonicom, dnevnim boravkom. Dodatno, tu je terasa od 60m² s veličanstvenim pogledom na Jadransko more.",
    images: [
      "/images/apartments/sun/bedroom.webp",
      "/images/apartments/sun/balcony.webp",
      "/images/apartments/sun/living-room.webp",
      "/images/apartments/sun/view.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-sunce",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/3289636.ics?s=3fc4d298685df0c27704199880b09d8c"
    ],
    // Consolidated price (120 * 1.80 = 216)
    basePeakPrice: 216,
    priceMultiplier: "1.00",
    cleaningFee: 45,
    maxGuests: 4,
    // Apartment details
    type: "apartment",
    roomSizeM2: 50,
    bedrooms: [
      {
        nameEn: "Bedroom",
        nameHr: "Spavaća soba",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Living Room",
        nameHr: "Dnevni boravak",
        beds: [
          {
            type: "sofa bed",
            count: 1
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    washingMachineType: "washing",
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Large Terrace", "Sea View", "Loungers"]
  },
  {
    id: 5,
    nameEn: "Sea",
    nameHr: "More",
    descriptionEn: "Air-conditioned, 3 stars studio apartment for 2 people in the centre of town. Living room - kitchen, balcony. Fitted with satellite/TV, DVD, washing machine and other necessary facilities. Living area 28m2 + balcony 6,5m2.",
    descriptionHr: "Klimatizirani studio apartman s 3 zvjezdice za 2 osobe, u samom centru grada. Dnevni boravak s kuhinjom, balkon. Opremljen satelitskom TV, DVD uređajem, perilicom rublja i svim potrebnim sadržajima. Površina 28 m² + balkon 6,5 m².",
    images: [
      "/images/apartments/sea/bedroom.webp",
      "/images/apartments/sea/balcony.webp",
      "/images/apartments/sea/balcony2.webp",
      "/images/apartments/sea/bathroom.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-more",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/19014861.ics?s=f8c3b2e230826d572c35ea739efb6e2a"
    ],
    // Consolidated price (110 * 1.00 = 110)
    basePeakPrice: 110,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    maxGuests: 2,
    // Apartment details
    type: "studio",
    roomSizeM2: 28,
    bedrooms: [
      {
        nameEn: "Studio Room",
        nameHr: "Studio soba",
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
    hasWifi: true,
    hasKitchen: true,
    hasAC: true,
    hasTV: true,
    hasBalcony: true,
    hasSeaView: false,
    hasCityView: true,
    hasDishwasher: false,
    hasCoffeeMachine: true,
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    washingMachineType: "washing",
    parkingType: "private",
    parkingDetails: {
      pricePerDay: 8,
      reservationRequired: true
    },
    hasGarden: false,
    otherAmenities: ["Central Location", "DVD Player", "Balcony"]
  },
  {
    id: 6,
    nameEn: "Beach",
    nameHr: "Plaža",
    descriptionEn: "Apartment with 4 stars for 2-4 people, 60m² large with one bedroom, kitchen, bathroom, living room + terrace with beautiful view of the Adriatic sea. Air conditioning, satellite TV, etc.",
    descriptionHr: "Apartman s 4 zvjezdice za 2-4 osobe, veličine 60m² s jednom spavaćom sobom, kuhinjom, kupaonicom, dnevnim boravkom + terasom s prekrasnim pogledom na Jadransko more. Klima uređaj, satelitska TV, itd.",
    images: [
      "/images/apartments/beach/balcony.webp",
      "/images/apartments/beach/bedroom.webp",
      "/images/apartments/beach/kitchen.webp",
      "/images/apartments/beach/living-room.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-beach",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/11847437.ics?s=6d2cbbdabf0b62bf08a047cf0712d317"
    ],
    // Consolidated price (120 * 1.50 = 180)
    basePeakPrice: 180,
    priceMultiplier: "1.00",
    cleaningFee: 45,
    maxGuests: 4,
    // Apartment details
    type: "apartment",
    roomSizeM2: 60,
    bedrooms: [
      {
        nameEn: "Bedroom",
        nameHr: "Spavaća soba",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Living Room",
        nameHr: "Dnevni boravak",
        beds: [
          {
            type: "sofa bed",
            count: 1
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    washingMachineType: "washing",
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Satellite TV", "Hair Dryer", "Terrace with Sea View"]
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
    // Consolidated price (110 * 2.00 = 220)
    basePeakPrice: 220,
    priceMultiplier: "1.00",
    cleaningFee: 60,
    maxGuests: 4,
    // Apartment details
    type: "studio",
    roomSizeM2: 50,
    bedrooms: [
      {
        nameEn: "Bedroom 1",
        nameHr: "Spavaća soba 1",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Bedroom 2",
        nameHr: "Spavaća soba 2",
        beds: [
          {
            type: "single",
            count: 2
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: true,
    washingMachineType: "washing",
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Terrace with Sea View", "Central Location", "Air Conditioning"]
  },
  {
    id: 8,
    nameEn: "Nika",
    nameHr: "Nika",
    descriptionEn: "Apartment with 3 stars for 2-3 people, 38m² large with one bedroom, kitchen, bathroom, hallway + terrace. Air conditioning, satellite TV, etc.",
    descriptionHr: "Apartman s 3 zvjezdice za 2-3 osobe, veličine 38m² s jednom spavaćom sobom, kuhinjom, kupaonicom, hodnikom + terasom. Klima uređaj, satelitska TV, itd.",
    images: [
      "/images/apartments/nika/bedroom.webp",
      "/images/apartments/nika/kitchen.webp",
      "/images/apartments/nika/bathroom.webp",
      "/images/apartments/nika/terrace.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-nika",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/27617468.ics?s=e408c51a965bccbbaba29d58295304a6&locale=hr"
    ],
    // Consolidated price (100 * 1.50 = 150)
    basePeakPrice: 150,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    maxGuests: 3,
    // Apartment details
    type: "apartment",
    roomSizeM2: 38,
    bedrooms: [
      {
        nameEn: "Bedroom",
        nameHr: "Spavaća soba",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Living Area",
        nameHr: "Dnevni prostor",
        beds: [
          {
            type: "sofa bed",
            count: 1
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    washingMachineType: "washing",
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Terrace", "Quiet Location", "Air Conditioning"]
  },
  {
    id: 9,
    nameEn: "Lara",
    nameHr: "Lara",
    descriptionEn: "Apartment with 3 stars for 2-3 people, 38m² large with one bedroom, kitchen, bathroom, hallway + terrace. Air conditioning, satellite TV, etc.",
    descriptionHr: "Apartman s 3 zvjezdice za 2-3 osobe, veličine 38m² s jednom spavaćom sobom, kuhinjom, kupaonicom, hodnikom + terasom. Klima uređaj, satelitska TV, itd.",
    images: [
      "/images/apartments/lara/bedroom.webp",
      "/images/apartments/lara/kitchen.webp",
      "/images/apartments/lara/bathroom.webp",
      "/images/apartments/lara/exterior.webp"
    ],
    location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6597618819957!2d17.132774076268704!3d42.96089097114812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a511a53686173%3A0xb07cc02c9f7b77bc!2zS29yw6d1bGE!5e0!3m2!1sen!2shr!4v1746823574845!5m2!1sen!2shr",
    bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
    airbnbUrl: "https://airbnb.com/h/apartments-viva-lara",
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
    ],
    // Consolidated price (100 * 1.50 = 150)
    basePeakPrice: 150,
    priceMultiplier: "1.00",
    cleaningFee: 40,
    maxGuests: 3,
    // Apartment details
    type: "studio",
    roomSizeM2: 38,
    bedrooms: [
      {
        nameEn: "Bedroom",
        nameHr: "Spavaća soba",
        beds: [
          {
            type: "double",
            count: 1
          }
        ]
      },
      {
        nameEn: "Living Area",
        nameHr: "Dnevni prostor",
        beds: [
          {
            type: "sofa bed",
            count: 1
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
    hasHairDryer: true,
    hasMicrowave: true,
    hasSmoothieMaker: false,
    washingMachineType: "washing",
    parkingType: "free",
    parkingDetails: null,
    hasGarden: false,
    otherAmenities: ["Terrace", "Quiet Location", "Air Conditioning"]
  }
];