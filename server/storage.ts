import { 
  apartments, type Apartment, type InsertApartment,
  bookings, type Booking, type InsertBooking,
  inquiries, type Inquiry, type InsertInquiry,
  locations, type Location, type InsertLocation
} from "@shared/schema";
import { apartmentData } from './apartments';

// Storage interface with all needed CRUD operations
export interface IStorage {
  // Apartment operations
  getApartments(): Promise<Apartment[]>;
  getApartment(id: number): Promise<Apartment | undefined>;
  createApartment(apartment: InsertApartment): Promise<Apartment>;
  
  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBookingsByApartment(apartmentId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  
  // Location operations
  getLocations(): Promise<Location[]>;
  getLocationsByType(type: string): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private apartments: Map<number, Apartment>;
  private bookings: Map<number, Booking>;
  private inquiries: Map<number, Inquiry>;
  private locations: Map<number, Location>;
  
  private apartmentId: number;
  private bookingId: number;
  private inquiryId: number;
  private locationId: number;
  
  constructor() {
    this.apartments = new Map();
    this.bookings = new Map();
    this.inquiries = new Map();
    this.locations = new Map();
    
    this.apartmentId = 9;
    this.bookingId = 1;
    this.inquiryId = 1; 
    this.locationId = 10;
    
    // Initialize with seed data
    this.seedApartments();
    this.seedLocations();
    
    // Add a booking for demo purposes
    this.createBooking({
      apartmentId: 1,
      startDate: new Date("2025-07-15"),
      endDate: new Date("2025-07-20")
    });
  }
  
  // APARTMENT OPERATIONS
  async getApartments(): Promise<Apartment[]> {
    return Array.from(this.apartments.values());
  }
  
  async getApartment(id: number): Promise<Apartment | undefined> {
    return this.apartments.get(id);
  }
  
  async createApartment(apartment: InsertApartment): Promise<Apartment> {
    const newApartment: Apartment = {
      id: this.apartmentId++,
      ...apartment
    };
    
    this.apartments.set(newApartment.id, newApartment);
    return newApartment;
  }
  
  // BOOKING OPERATIONS
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBookingsByApartment(apartmentId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.apartmentId === apartmentId
    );
  }
  
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const newBooking: Booking = {
      id: this.bookingId++,
      ...booking
    };
    
    this.bookings.set(newBooking.id, newBooking);
    return newBooking;
  }
  
  // INQUIRY OPERATIONS
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      id: this.inquiryId++,
      createdAt: new Date(),
      ...inquiry
    };
    
    this.inquiries.set(newInquiry.id, newInquiry);
    return newInquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
  
  // LOCATION OPERATIONS
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }
  
  async getLocationsByType(type: string): Promise<Location[]> {
    return Array.from(this.locations.values()).filter(
      location => location.typeEn === type || location.typeHr === type
    );
  }
  
  async createLocation(location: InsertLocation): Promise<Location> {
    const newLocation: Location = {
      id: this.locationId++,
      ...location
    };
    
    this.locations.set(newLocation.id, newLocation);
    return newLocation;
  }
  
  // SEED DATA
  private seedApartments() {
    // Load data from the apartments.ts file
    this.apartments = new Map(apartmentData.map(apt => [apt.id, apt]));
    // We've migrated all apartment data to the apartments.ts file
    return;
    
    // Legacy code kept for reference - not actually used
    const unusedData: InsertApartment[] = [
      {
        nameEn: "Magical Oasis",
        nameHr: "Magical Oasis",
        descriptionEn: `Nestled in a hidden lane of Korčula’s medieval Old Town, Magical Oasis is a charming retreat perfect for two. This cozy 35 m² apartment blends historic character with modern comfort – think exposed stone walls and elegant contemporary décor. Guests love the spotless interior and thoughtful touches throughout. The living area features a comfy sofa, flat-screen TV (with Netflix) and air-conditioning, while the bedroom offers a luxuriously comfortable bed with quality linens for a restful night. A fully equipped kitchen provides everything needed to cook, and the sparkling bathroom includes a spacious rain shower (plus a bidet and plush towels) for a touch of luxury. Despite being steps away from Korčula’s iconic landmarks, waterfront promenade, and best restaurants, the apartment stays peaceful – truly an “oasis” amid the lively Old Town. Hosts Ana and her family go above and beyond, greeting guests with warm Dalmatian hospitality and insider tips. With its unbeatable location, romantic ambiance, and all the amenities of home (from fast Wi-Fi to an in-unit washing machine), Magical Oasis promises a delightful stay where you can unwind and enjoy the magic of Korčula.`,
        descriptionHr: `Smješten u mirnoj, skrivenoj uličici srednjovjekovne gradske jezgre Korčule, Magical Oasis pruža šarmantno utočište idealno za dvoje. Ovaj udoban apartman od 35 m² spaja povijesni karakter i suvremeni komfor – kameni zidovi autentičnog ambijenta skladno su spojeni s elegantnim modernim uređenjem. Gosti oduševljeno ističu besprijekornu čistoću interijera i pažljivo osmišljene detalje u svakom kutku. Dnevni boravak nudi udobnu sofu, ravni TV (s pristupom Netflixu) i klima-uređaj, dok spavaća soba ima iznimno udoban krevet s kvalitetnom posteljinom za miran san. Potpuno opremljena kuhinja pruža sve potrebno za pripremu obroka, a blistava kupaonica s prostranim tušem (uz bide i mekane ručnike) donosi dašak luksuza. Iako se nalazi nadomak svih znamenitosti, šetnice uz more i najboljih restorana, apartman ostaje tih i miran – prava “oaza” u srcu živahnog Starog Grada. Domaćini Ana i obitelj trude se iznad očekivanja: dočekuju goste s toplom dalmatinskom gostoljubivošću i korisnim lokalnim preporukama. Zahvaljujući nenadmašnoj lokaciji, romantičnom ugođaju i svim pogodnostima doma (od brzog Wi-Fi-ja do perilice rublja u apartmanu), Magical Oasis jamči divan boravak u kojem se možete opustiti i doživjeti svu čaroliju Korčule.`,
        images: [
          "/images/apartments/magical-oasis/exterior.webp",
          "/images/apartments/magical-oasis/exterior2.webp",
          "/images/apartments/magical-oasis/entrance.webp",
          "/images/apartments/magical-oasis/bedroom.webp",
          "/images/apartments/magical-oasis/bathroom.webp",
          "/images/apartments/magical-oasis/bathroom2.webp",
          "/images/apartments/magical-oasis/kitchen.webp",
          "/images/apartments/magical-oasis/window-view.webp",
          "/images/apartments/magical-oasis/view.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1400!2d17.13583210884043!3d42.96238425612054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517549e08c53%3A0x20f6b511dabd88db!2sMagical%20Oasis%20for%20two%20in%20Korcula%20Old%20Town!5e0!3m2!1sen!2shr!4v1745508164244!5m2!1sen!2shr",
        bookingUrl: "https://www.booking.com/hotel/hr/magical-old-town-escape-for-two.html",
        airbnbUrl: "https://airbnb.com/h/magical-oasis-for-two-in-old-town-korcula",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e21284eed9fbea95b5d2dcc398220",
          "https://ical.booking.com/v1/export?t=2b421589-cfe4-42ba-9800-94a8a7ffd436"
          
        ],
        basePeakPrice: 110,
        priceMultiplier: "1.90",
        cleaningFee: 50,
        maxGuests: 2,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 35,
        bedrooms: [
          {
            name: "Bedroom 1",
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
        hasBalcony: false,
        hasSeaView: false,
        hasCityView: true,
        hasDishwasher: true,
        hasCoffeeMachine: true,
        parkingType: "none",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Saint Roko",
        nameHr: "Sveti Roko",
        descriptionEn: `Experience the charm of Korčula’s Old Town at Apartment St. Roko, an authentic stone residence nestled on the main cobbled street within the city walls. This stylish 26 m² apartment has been thoughtfully renovated to blend historic character with modern comfort. Inside you’ll find tasteful decor accented by local art and original architectural details, creating a warm, inviting ambiance. The cozy living area features a sofa and flat-screen TV, while a compact kitchenette comes fully equipped (microwave, kettle, fridge, and more) for your convenience. In the bedroom, a very comfortable bed with quality linens promises restful sleep, and the surprisingly spacious bathroom offers a walk-in shower and all modern fixtures. Step outside and you’re mere steps from boutique shops, cafes, renowned restaurants, and even Korčula’s famous turret-top cocktail bar – yet nights are peaceful and quiet thanks to the apartment’s sound-insulated windows and thick stone walls. Guests consistently praise the fantastic location and the personal touch of the hosts. Owner Vicko often greets guests at the ferry port and shares insider tips (even inviting visitors to local cultural events like the sword dance), ensuring you feel truly at home. With its blend of historic charm, comfort, and unbeatable convenience, Old Town St. Roko Apartment is an ideal hideaway for couples or solo travelers seeking a memorable Korčula stay.`,
        descriptionHr: `Doživite šarm korčulanskog Starog Grada u Apartmanu St. Roko, smještenom u autentičnoj kamenoj kući na glavnoj popločanoj ulici unutar gradskih zidina. Ovaj elegantno obnovljeni apartman od 26 m² vješto spaja povijesni ugođaj s modernom udobnošću. Ukusno uređen interijer sadrži lokalne umjetničke detalje i očuvane izvorne elemente arhitekture, stvarajući topao i ugodan ambijent. U dnevnom boravku čeka vas udoban kauč i ravni TV, a mala čajna kuhinja potpuno je opremljena (mikrovalna, kuhalo za vodu, hladnjak i ostalo) za sve vaše potrebe. U spavaćoj sobi nalazi se iznimno udoban krevet s kvalitetnom posteljinom koji jamči miran san, dok iznenađujuće prostrana kupaonica nudi moderni tuš i sve suvremene sadržaje. Izađete li van, naći ćete se na korak od butika, kafića, vrhunskih restorana, pa čak i čuvenog koktel bara u gradskoj kuli – a unatoč središnjoj lokaciji, noću vlada tišina zahvaljujući zvučno izoliranim prozorima i masivnim kamenim zidovima. Gosti neprestano hvale fantastičnu lokaciju i osobni pristup domaćina. Vlasnik Vicko često dočeka goste već u luci te podijeli insajderske savjete (ponekad čak i poziv na lokalne manifestacije poput tradicionalnog mačevalačkog plesa), čineći da se ovdje osjećate kao kod kuće. Spoj povijesnog šarma, udobnosti i vrhunske praktičnosti čini Old Town St. Roko savršenim izborom za parove ili samostalne putnike u potrazi za nezaboravnim boravkom u Korčuli.`,
        images: [
          "/images/apartments/saint-roko/living-room1.webp",
          "/images/apartments/saint-roko/living-room2.webp",
          "/images/apartments/saint-roko/bedroom.webp",
          "/images/apartments/saint-roko/bathroom.webp",
          "/images/apartments/saint-roko/detail1.webp",
          "/images/apartments/saint-roko/detail2.webp",
          "/images/apartments/saint-roko/exterior.webp",
          "/images/apartments/saint-roko/entrance.webp",
          "/images/apartments/saint-roko/street.webp",
          "/images/apartments/saint-roko/location.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d17.130864458988793!3d42.9616473522362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartment%20St.%20Roko!5e0!3m2!1sen!2shr!4v1747837157249!5m2!1sen!2shr",
        bookingUrl: "https://www.booking.com/hotel/hr/old-town-st-roko.html",
        airbnbUrl: "https://airbnb.com/h/old-town-st-roko-apartment",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e2124eed9fbea95b5d2dcc398220",
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd4cd0dbd2911faab332fcfd90"
        ],
        basePeakPrice: 110,
        priceMultiplier: "1.50",
        cleaningFee: 40,
        maxGuests: 2,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 26,
        bedrooms: [
          {
            name: "Bedroom 1",
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
        hasBalcony: false,
        hasSeaView: false,
        hasCityView: true, 
        hasDishwasher: true,
        hasCoffeeMachine: true,
        parkingType: "none",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Ismaelli Palace",
        nameHr: "Palača Ismaelli",
        descriptionEn: `Indulge in a one-of-a-kind stay at the Sunset Palace Apartment, set within the 600-year-old Ismaelli Palace next to Korčula’s St. Mark’s Cathedral. This expansive apartment (110 m²) offers two spacious bedrooms, a large living/dining area, a fully equipped kitchen, and a newly renovated bathroom – all crowned by a huge private terrace with breathtaking views of the Adriatic Sea. Each evening, you can relax on the terrace with a glass of wine as the sun sets in spectacular fashion over the water. Inside, the apartment’s unique retro-chic design honors its historical roots while providing every modern comfort: high ceilings, vintage decor pieces, and exposed stone walls blend with air-conditioning in every room, fast Wi-Fi, and a smart TV (with Netflix). Guests are amazed by how elegant yet comfortable the space is – from the plush beds and deluxe pillows to thoughtful extras like a coffee/tea station and even earplugs for the nearby church bells. The location is unbeatable, with the island’s main sights, waterfront, and eateries at your doorstep. Despite the central setting, the apartment feels private and secure, offering a tranquil retreat above the charming Old Town streets. Host Filip earns rave reviews for his exceptional hospitality – meeting guests at the ferry, helping with luggage, and stocking the apartment with everything you could need (and more). Staying at Ismaelli Palace’s Sunset Flat is not just lodging, but an immersive experience of Korčula’s history and soul – with comfort, luxury, and unforgettable views included.`,
        descriptionHr: `Pružite si jedinstven doživljaj boravka u Apartmanu Sunset Palace, smještenom u palači Ismaelli staroj 600 godina (UNESCO baština) tik uz korčulansku katedralu sv. Marka. Ovaj prostrani apartman (110 m²) obuhvaća dvije komforne spavaće sobe, veliki dnevni boravak s blagovaonicom, potpuno opremljenu kuhinju i novoobnovljenu kupaonicu – a kruna svega je ogromna privatna terasa s očaravajućim pogledom na Jadransko more. Svake večeri možete se opustiti na terasi uz čašu vina dok sunce spektakularno zalazi nad morem. Unutrašnjost krasi jedinstveni retro-šik dizajn koji odaje počast povijesnom naslijeđu palače, a istovremeno pruža sve moderne pogodnosti. Visoki stropovi, vintage detalji i izloženi kameni zidovi skladno su spojeni s klima-uređajima u svakoj prostoriji, brzim Wi-Fi internetom i pametnim TV-om (Netflix uključen). Gosti su oduševljeni koliko je prostor elegantan, a ipak udoban – od vrhunskih madraca i jastuka do pažljivo osmišljenih dodataka poput kutka za kavu/čaj, pa čak i čepića za uši (za zvonjavu obližnjih crkvenih zvona). Lokacija je nenadmašna: sve znamenitosti otoka, riva i izvrsni restorani nalaze se pred vratima palače. Unatoč središnjoj poziciji, apartman pruža privatnost i mir, kao spokojno utočište iznad šarmantnih ulica Staroga Grada. Domaćin Filip dobiva izvrsne pohvale za svoje gostoprimstvo – dočekat će vas pri dolasku trajektom, pomoći oko prtljage i pobrinuti se da u apartmanu imate sve što vam zatreba (i više). Boravak u palači Ismaelli – Sunset apartmanu nije samo smještaj, već doživljaj korčulanske povijesti i duše, uz potpunu udobnost, luksuz i nezaboravne poglede.`,
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
        airbnbUrl: "https://airbnb.com/h/korcula-old-town-palace-sunset-flat",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
        ],
        basePeakPrice: 110,
        priceMultiplier: "4.00",
        cleaningFee: 80,
        maxGuests: 4,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 110,
        bedrooms: [
          {
            name: "Bedroom 1",
            beds: [
              {
                type: "double",
                count: 1
              }
            ]
          },
          {
            name: "Bedroom 2",
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
        hasGarden: true,
        otherAmenities: []
      },
      {
        nameEn: "Lavender",
        nameHr: "Lavanda",
        descriptionEn: `Apartment Lavender welcomes you with a blend of modern comfort and Mediterranean charm. This top-floor, three-bedroom retreat offers panoramic views of the Adriatic Sea, Korčula’s green hills, and even the silhouette of Korčula Old Town from its private balcony. The spacious interior is thoughtfully decorated, echoing the soothing hues of lavender for a truly relaxing ambiance. Guests appreciate the two full bathrooms and fully equipped kitchen – perfect for families or groups of up to five seeking convenience and privacy. The airy living room opens to a sunny balcony where you can savor breakfast with a sea breeze or dine under the stars. Just steps below, a quiet pebbly beach with crystal-clear water awaits for morning swims or lazy afternoons. Korčula’s Old Town is a scenic 3-minute walk away, making it easy to explore local shops and restaurants. Previous guests rave about the spotless cleanliness, the stunning views, and the warm hospitality of the hosts. Apartment Lavender invites you to experience Korčula’s beauty in comfort and style.`,
        descriptionHr: `Apartman Lavanda pruža suvremenu udobnost u kombinaciji s mediteranskim šarmom. Ova oaza na najvišem katu s tri spavaće sobe nudi panoramski pogled na Jadransko more, zelene brežuljke Korčule, pa čak i siluetu korčulanskog Starog grada s privatnog balkona. Prostrana unutrašnjost promišljeno je uređena u umirujućim tonovima lavande, stvarajući opuštajući ugođaj. Gostima se posebno sviđaju dvije kupaonice te potpuno opremljena kuhinja – savršeno za obitelji ili grupe do pet osoba koje traže praktičnost i privatnost. Svijetli dnevni boravak izlazi na osunčani balkon gdje možete uživati u doručku uz povjetarac ili večerati pod zvijezdama. Odmah ispod apartmana nalazi se mirna šljunčana plaža s kristalno čistim morem, idealna za jutarnje kupanje ili ljenčarenje popodne. Do starog grada vodi slikovita šetnja od oko 3 minute, što olakšava obilazak lokalnih dućana i restorana. Prethodni gosti oduševljeno hvale besprijekornu čistoću, zadivljujuće poglede i srdačno gostoprimstvo domaćina. Apartman Lavanda poziva vas da u udobnosti i stilu doživite sve ljepote Korčule.`,
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
        maxGuests: 5,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 76,
        bedrooms: [
          {
            name: "Bedroom 1",
            beds: [
              {
                type: "double",
                count: 1
              }
            ]
          },
          {
            name: "Bedroom 2", 
            beds: [
              {
                type: "single",
                count: 2
              }
            ]
          },
          {
            name: "Bedroom 3",
            beds: [
              {
                type: "single",
                count: 1
              }
            ]
          },
          {
            name: "Living room",
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasCityView: false,
        hasDishwasher: true,
        hasCoffeeMachine: true,
        parkingType: "private",
        parkingDetails: {
          pricePerDay: 8,
          reservationRequired: true
        },
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Sun",
        nameHr: "Sunce",
        descriptionEn: `Apartment Viva Sun is a bright and welcoming getaway designed for comfort and relaxation. This spacious two-bedroom apartment (one with a queen bed and one flexible twin/double) features a prozračan open living area filled with natural light and a balcony that offers beautiful views of the Adriatic Sea. Start your morning with sunshine on the balcony, sipping coffee as you overlook the tranquil bay. Inside, a fully equipped kitchen and a cozy dining space make it easy to enjoy meals at home. An added convenience is the apartment’s extra half-bathroom alongside the modern full bathroom – a detail families and groups of up to four guests truly appreciate. The décor reflects the warm colors of the Dalmatian sun, creating a cheerful ambiance throughout. Guests have access to a barbecue grill on the property, perfect for grilling fresh local seafood in the evenings. The seaside is just a few minutes’ walk down a path, leading to a quiet pebble beach with crystal-clear water. Korčula’s historic center is within walking distance or a quick drive, so you can easily explore shops, restaurants, and cultural sites. Past guests consistently praise Apartment Viva Sun’s cleanliness, convenient layout, and the friendly, helpful hosts who make every stay special.`,
        descriptionHr: `Apartman Viva Sun svijetao je i ugodan prostor osmišljen za udoban odmor. Ovaj prostrani apartman s dvije spavaće sobe (jedna s bračnim krevetom, druga s dva odvojena kreveta koja se mogu spojiti) ima prozračan dnevni boravak ispunjen prirodnim svjetlom i balkon koji pruža prekrasan pogled na Jadransko more. Jutro možete započeti uz sunčeve zrake na balkonu, ispijajući kavu s pogledom na mirnu uvalu. Unutra se nalaze potpuno opremljena kuhinja i udoban blagovaonski kutak kako biste lako mogli uživati u obrocima. Dodatna pogodnost je odvojeni toalet uz modernu kupaonicu – detalj koji obitelji i grupe do četiri osobe itekako cijene. Uređenje interijera odražava tople boje dalmatinskog sunca, stvarajući vedar ugođaj u cijelom prostoru. Gostima je na raspolaganju i roštilj u dvorištu, idealan za pripremu svježe ribe i morskih plodova u toplim večerima. More je udaljeno svega nekoliko minuta hoda niz stazu, gdje vas čeka mirna šljunčana plaža s kristalno čistim morem. Povijesna jezgra Korčule nalazi se na pješačkoj udaljenosti ili par minuta vožnje, pa lako možete istražiti trgovine, restorane i kulturne znamenitosti. Prijašnji gosti redovito hvale besprijekornu čistoću, praktičan raspored apartmana te ljubazne i susretljive domaćine koji svaki boravak čine posebnim.`,
        images: [
          "/images/apartments/sun/living-room.webp",
          "/images/apartments/sun/living-room2.webp",
          "/images/apartments/sun/kitchen.webp",
          "/images/apartments/sun/bedroom1.webp",
          "/images/apartments/sun/bedroom2.webp",
          "/images/apartments/sun/bathroom.webp",
          "/images/apartments/sun/balcony.webp",
          "/images/apartments/sun/view.webp",
          "/images/apartments/sun/garden.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.2796402065861!2d17.13455596084784!3d42.95820684655463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sit!4v1747665668512!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
        airbnbUrl: "https://airbnb.com/h/apartments-viva-sun",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/3289636.ics?s=3fc4d298685df0c27704199880b09d8c"
        ],
        basePeakPrice: 110,
        priceMultiplier: "1.75",
        cleaningFee: 70,
        maxGuests: 4,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 57,
        bedrooms: [
          {
            name: "Bedroom 1",
            beds: [
              {
                type: "double",
                count: 1
              }
            ]
          },
          {
            name: "Bedroom 2",
            beds: [
              {
                type: "single",
                count: 2
              }
            ]
          },
          {
            name: "Living room",
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
        otherAmenities: []
      },
      {
        nameEn: "Sea",
        nameHr: "More",
        descriptionEn: `Apartment Viva Sea is a stylish studio for two, offering breathtaking vistas and a serene atmosphere. Perched above the bay, this open-plan retreat maximizes space with a comfortable double bed, a compact kitchenette, and a modern bathroom. The décor is contemporary with touches of coastal charm, letting the sparkling sea view take center stage. Step out onto the private balcony and you’re greeted by an expansive panorama of the crystal-clear bay and the majestic Pelješac mountains across the channel. It’s the perfect spot to sip local wine at sunset or start your day with breakfast in the fresh sea air. Apartment Viva Sea comes equipped with all the essentials: air conditioning, free WiFi, satellite TV, and even a washing machine for your convenience. Adventure is close at hand – the calm bay below is great for swimming and snorkeling, and the area is known for windsurfing and scenic cycling routes. Korčula’s famous Old Town is around 1 km away (about a 15–20 minute walk), so you can enjoy both tranquility and cultural sights with ease. Guests consistently praise the panoramic views and peaceful location in their reviews, noting how rejuvenating their stay in Viva Sea was and applauding the attentive, friendly hosts. Whether you’re a couple seeking romance or a solo traveler longing for a quiet seaside escape, Viva Sea offers an unforgettable Korčula experience.`,
        descriptionHr: `Apartman Viva Sea moderan je studio za dvoje, s prekrasnim vidicima i spokojnim ugođajem. Smješten iznad uvale, ovaj otvoreni studio maksimalno koristi svoj prostor te nudi udoban bračni krevet, malu čajnu kuhinju i modernu kupaonicu – sve što vam treba za opušten boravak. Interijer je suvremen s daškom mediteranskog šarma, a blistav pogled na more uvijek je u prvom planu. S privatnog balkona pruža se široka panorama kristalno čiste uvale i impresivnih peljeških planina preko puta kanala. To je savršeno mjesto za uživanje u čaši domaćeg vina u suton ili za početak dana doručkom na svježem morskom zraku. Apartman Viva Sea opremljen je svim bitnim sadržajima: klima-uređajem, besplatnim Wi-Fi internetom, satelitskom TV i čak perilicom rublja za vašu udobnost. Avantura vam je također nadohvat ruke – mirna uvala ispod izvrsna je za plivanje i ronjenje, a okolica je poznata po jedrenju na dasci i slikovitim biciklističkim stazama. Čuveni stari grad Korčule udaljen je oko 1 km (15–20 minuta hoda), tako da možete lako uživati i u miru i u kulturnim znamenitostima. Gosti u recenzijama neprestano hvale panoramski pogled i miran položaj – mnogi ističu kako su se tijekom boravka u Vivi Sea zaista odmorili, a pohvaljuju i susretljive, prijazne domaćine. Bilo da ste par u potrazi za romantičnim bijegom ili solo putnik koji želi tiho utočište uz more, Viva Sea nudi nezaboravno korčulansko iskustvo.`,
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
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 29,
        bedrooms: [
          {
            name: "Studio",
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
        hasDishwasher: true,
        hasCoffeeMachine: true,
        parkingType: "private",
        parkingDetails: {
          pricePerDay: 8,
          reservationRequired: true
        },
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Beach",
        nameHr: "Plaža",
        descriptionEn: `Apartment Viva Beach is a charming seaside hideaway perfect for a romantic escape or a peaceful retreat for two. Nestled on the ground floor, this one-bedroom apartment boasts its own private courtyard terrace (about 22 m²) surrounded by lush greenery – including fragrant orange and lemon trees that provide natural shade. The cozy interior is thoughtfully arranged, featuring a comfortable double bed, a compact but well-equipped kitchen (with a dishwasher for added convenience), and a modern bathroom with a walk-in shower. The indoor living space seamlessly connects to the outdoor terrace, where you can lounge, sunbathe in privacy, or enjoy al fresco dining with the sound of the sea in the background. A few stone steps lead directly from the property down to a secluded pebble beach known for its crystal-clear water and uncrowded atmosphere – it’s almost like having your own private beach. Despite the tucked-away feel, Korčula’s Old Town is only a short drive or a pleasant 20-minute walk along the coast. Guests often remark in reviews that Apartment Viva Beach’s shady terrace is a highlight of their stay, calling it an “oasis of calm,” and they love the spotless cleanliness and the hospitality of the hosts. If you’re seeking tranquility by the sea with all the comforts of home, Viva Beach delivers an unforgettable experience.`,
        descriptionHr: `Apartman Viva Beach šarmantno je utočište uz more, savršeno za romantičan bijeg ili opuštajući odmor udvoje. Smješten u prizemlju, ovaj jednosobni apartman ima vlastitu privatnu terasu (oko 22 m²) okruženu bujnim zelenilom – mirisna stabla naranče i limuna pružaju prirodan hlad. Ugodan interijer pametno je organiziran te sadrži udoban bračni krevet, kompaktnu ali potpuno opremljenu kuhinju (s perilicom posuđa za dodatnu praktičnost) i modernu kupaonicu s prostranom tuš-kabinom. Unutarnji dnevni prostor neprimjetno se spaja s vanjskom terasom, gdje se možete opustiti, sunčati u privatnosti ili blagovati na otvorenom uz zvuk mora u pozadini. Nekoliko kamenih stuba vodi iz dvorišta izravno do osamljene šljunčane plaže s kristalno čistim morem, koja nije napučena – gotovo kao da imate vlastitu plažu. Unatoč skrovitom ugođaju, stari grad Korčule udaljen je samo kratku vožnju ili ugodnu šetnju od dvadesetak minuta uz obalu. Gosti u recenzijama često ističu da je zasjenjena terasa apartmana Viva Beach vrhunac njihova boravka, opisujući je kao "oazu mira", a hvale i besprijekornu čistoću te gostoljubivost domaćina. Ako tražite spokoj na moru uz sve udobnosti doma, Viva Beach pružit će vam nezaboravno iskustvo.`,
        images: [
          "/images/apartments/beach/living-room.webp",
          "/images/apartments/beach/couch.webp",
          "/images/apartments/beach/balcony.webp",
          "/images/apartments/beach/kitchen.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.812968723878!2d17.130686977090376!3d42.96122627114335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a8c2af613%3A0x2c0e4b2c1db1bff9!2sApartments%20Giuliani!5e0!3m2!1sen!2sit!4v1747665748121!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
        airbnbUrl: "https://airbnb.com/h/apartments-viva-beach",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/11847437.ics?s=6d2cbbdabf0b62bf08a047cf0712d317"
        ],
        basePeakPrice: 110,
        priceMultiplier: "1.25",
        cleaningFee: 60,
        maxGuests: 2,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 33,
        bedrooms: [
          {
            name: "Bedroom 1",
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
        hasBalcony: false,
        hasSeaView: false,
        hasCityView: false,
        hasDishwasher: true,
        hasCoffeeMachine: true,
        parkingType: "private",
        parkingDetails: {
          pricePerDay: 8,
          reservationRequired: true
        },
        hasGarden: true,
        otherAmenities: []
      },
      {
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.7969843822066!2d17.12748487563004!3d42.96148247114323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a516bb56b95d3%3A0x2758c0e472e4450c!2sApartments%20Giuliani!5e0!3m2!1sen!2sit!4v1747665846634!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
        airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-nika",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/27617468.ics?s=e408c51a965bccbbaba29d58295304a6&locale=hr"
        ],
        basePeakPrice: 200,
        priceMultiplier: "1",
        cleaningFee: 80,
        maxGuests: 2,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 65,
        bedrooms: [
          {
            name: "Bedroom 1",
            beds: [
              {
                type: "double",
                count: 1
              }
            ]
          },
          {
            name: "Bedroom 1",
            beds: [
              {
                type: "single",
                count: 2
              }
            ]
          },
          {
            name: "Living room",
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasCityView: true,
        hasDishwasher: true,
        hasCoffeeMachine: true,
        parkingType: "free",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Lara",
        nameHr: "Lara",
        descriptionEn: `Apartment Lara is a cozy Korčula getaway with a delightful local touch. Just a short 10-minute stroll from the Old Town gates (and a few minutes from a small pebble beach), Lara enjoys a peaceful setting and lovely partial sea views. Step outside to your own little patio – the perfect spot to sip morning coffee while gazing at the turquoise Adriatic. Inside, the apartment is clean, bright and outfitted with everything you need. The living area includes a comfortable sofa (ideal for relaxing after a day of exploring) and a flat-screen TV, and opens into a compact kitchen equipped with all the essentials for cooking – from a stovetop and fridge to cookware and a coffee maker. The tranquil bedroom offers a cozy double bed with quality linens to ensure restful nights, and the bathroom is modern, stocked with fresh towels and toiletries. Air-conditioning and free Wi-Fi are provided, and guests of Lara can also use a shared washing machine during longer stays. Tucked in a friendly residential neighborhood just outside the tourist bustle, Apartment Lara lets you experience Korčula like a local – quiet nights, easy walks to town and beach, and authentic charm. Hosts Marija and her family are praised for their warmth and attentiveness; they’ll gladly offer tips on where to eat, swim, and sightsee. Whether you’re enjoying a glass of wine on the patio or unwinding in the comfy living room, Apartment Lara offers charm, comfort, and convenience for your island stay.`,
        descriptionHr: `Apartman Lara pruža ugodno utočište u Korčuli s osebujnim lokalnim šarmom. Nalazi se u mirnom okruženju, oko 10 minuta lagane šetnje od gradskih zidina (i tek nekoliko minuta od male šljunčane plaže). Lara uživa povlašten položaj u tišini stambenog naselja, uz lijep djelomičan pogled na more. Na vlastitoj maloj terasi ispred apartmana možete ispijati jutarnju kavu dok promatrate tirkizno more na obzoru. Unutrašnjost je čista, svijetla i opremljena svime što vam treba. Dnevni boravak nudi udoban kauč za opuštanje nakon istraživanja otoka i TV ravnog ekrana, a spojen je s kompaktnom kuhinjom opremljenom svim potrepštinama za kuhanje – od ploče za kuhanje i hladnjaka do posuđa i aparata za kavu. U mirnoj spavaćoj sobi nalazi se udoban bračni krevet s kvalitetnom posteljinom koja jamči spokojne noći, a kupaonica je moderna, s čistim ručnicima i toaletnim potrepštinama. Na raspolaganju su i klima-uređaj te besplatan Wi-Fi, a gosti Lare mogu koristiti i zajedničku perilicu rublja tijekom duljih boravaka. Smještena izvan vreve turista, u susjedstvu gdje žive lokalni stanovnici, Lara vam omogućuje da doživite Korčulu kao mještanin – mirne noći, lagane šetnje do grada i plaže, te autentičan ugođaj. Domaćini (obitelj Giuliani) poznati su po svojoj srdačnosti i pažnji: rado će vam preporučiti gdje jesti, kupati se ili što posjetiti. Bilo da ispijate čašu vina na terasi u suton ili se odmarate u udobnom dnevnom boravku, Apartman Lara pruža šarm, udobnost i praktičnost za vaš boravak na otoku.`,
        images: [
          "/images/apartments/lara/kitchen.webp",
          "/images/apartments/lara/kitchen-view.webp",
          "/images/apartments/lara/room1.webp",
          "/images/apartments/lara/balcony.webp",
          "/images/apartments/lara/bathroom.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.7969843822066!2d17.12748487563004!3d42.96148247114323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a516bb56b95d3%3A0x2758c0e472e4450c!2sApartments%20Giuliani!5e0!3m2!1sen!2sit!4v1747665953963!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
        airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-lara",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
        ],
        basePeakPrice: 100,
        priceMultiplier: "1",
        cleaningFee: 30,
        maxGuests: 2,
        // New apartment details
        isEntireApartment: true,
        roomSizeM2: 25,
        bedrooms: [
          {
            name: "Studio",
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
        hasSeaView: true,
        hasCityView: false,
        hasDishwasher: false,
        hasCoffeeMachine: false,
        parkingType: "free",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: []
      }
    ];
    
    // Add apartments to storage
    apartmentData.forEach((apartment, index) => {
      this.apartments.set(index + 1, {
        id: index + 1,
        ...apartment
      });
    });
  }
  
  private seedLocations() {
    const locationData: InsertLocation[] = [
      {
        typeEn: "beach",
        typeHr: "plaža",
        nameEn: "Banje Beach",
        nameHr: "Plaža Banje",
        descriptionEn: "One of the most popular beaches in Korčula, with crystal clear water and stunning views of the old town.",
        descriptionHr: "Jedna od najpopularnijih plaža u Korčuli, s kristalno čistom vodom i prekrasnim pogledom na stari grad.",
        image: "/images/locations/banje-beach.webp",
        distanceEn: "7 minutes walk",
        distanceHr: "7 minuta hoda",
        featureEn: "Pebble beach with beach bar",
        featureHr: "Šljunčana plaža s beach barom"
      },
      {
        typeEn: "beach",
        typeHr: "plaža",
        nameEn: "Luka Korčulanska Beach",
        nameHr: "Plaža Luka Korčulanska",
        descriptionEn: "A small beach with shallow water, perfect for families with children.",
        descriptionHr: "Mala plaža s plitkom vodom, savršena za obitelji s djecom.",
        image: "/images/locations/luka-korculanska.webp",
        distanceEn: "5 minutes walk",
        distanceHr: "5 minuta hoda",
        featureEn: "Sandy beach with shade",
        featureHr: "Pješčana plaža s hladom"
      },
      {
        typeEn: "restaurant",
        typeHr: "restoran",
        nameEn: "Konoba Mate",
        nameHr: "Konoba Mate",
        descriptionEn: "Traditional Dalmatian tavern serving fresh seafood and local specialties.",
        descriptionHr: "Tradicionalna dalmatinska konoba koja služi svježu ribu i lokalne specijalitete.",
        image: "/images/locations/konoba-mate.webp",
        distanceEn: "3 minutes walk",
        distanceHr: "3 minute hoda",
        featureEn: "Fresh seafood",
        featureHr: "Svježa riba"
      },
      {
        typeEn: "restaurant",
        typeHr: "restoran",
        nameEn: "Filippi Restaurant",
        nameHr: "Restoran Filippi",
        descriptionEn: "Upscale dining with a terrace overlooking the sea, featuring Mediterranean cuisine.",
        descriptionHr: "Restoran visoke kategorije s terasom s pogledom na more, s mediteranskom kuhinjom.",
        image: "/images/locations/filippi.webp",
        distanceEn: "10 minutes walk",
        distanceHr: "10 minuta hoda",
        featureEn: "Fine dining",
        featureHr: "Vrhunska kuhinja"
      },
      {
        typeEn: "attraction",
        typeHr: "atrakcija",
        nameEn: "Marco Polo House",
        nameHr: "Kuća Marka Pola",
        descriptionEn: "Alleged birthplace of the famous explorer Marco Polo, now a small museum.",
        descriptionHr: "Navodna rodna kuća poznatog istraživača Marka Pola, sada mali muzej.",
        image: "/images/locations/marco-polo.webp",
        distanceEn: "1 minute walk",
        distanceHr: "1 minuta hoda",
        featureEn: "Historical site",
        featureHr: "Povijesno mjesto"
      },
      {
        typeEn: "attraction",
        typeHr: "atrakcija",
        nameEn: "St. Mark's Cathedral",
        nameHr: "Katedrala sv. Marka",
        descriptionEn: "A beautiful Gothic-Renaissance cathedral with stunning stone architecture.",
        descriptionHr: "Prekrasna gotičko-renesansna katedrala s impresivnom kamenom arhitekturom.",
        image: "/images/locations/cathedral.webp",
        distanceEn: "2 minutes walk",
        distanceHr: "2 minute hoda",
        featureEn: "Religious site",
        featureHr: "Vjersko mjesto"
      },
      {
        typeEn: "activity",
        typeHr: "aktivnost",
        nameEn: "Korčula Adventures",
        nameHr: "Korčula Avanture",
        descriptionEn: "Offers kayaking, windsurfing, and boat tours around the island.",
        descriptionHr: "Nudi kajaking, windsurfing i brodske ture oko otoka.",
        image: "/images/locations/korcula-adventures.webp",
        distanceEn: "15 minutes walk",
        distanceHr: "15 minuta hoda",
        featureEn: "Water sports",
        featureHr: "Vodeni sportovi"
      },
      {
        typeEn: "activity",
        typeHr: "aktivnost",
        nameEn: "Moreška Sword Dance",
        nameHr: "Moreška",
        descriptionEn: "Traditional sword dance performance that has been performed in Korčula for centuries.",
        descriptionHr: "Tradicionalni ples s mačevima koji se izvodi u Korčuli već stoljećima.",
        image: "/images/locations/moreska.webp",
        distanceEn: "5 minutes walk",
        distanceHr: "5 minuta hoda",
        featureEn: "Cultural experience",
        featureHr: "Kulturno iskustvo"
      },
      {
        typeEn: "beach",
        typeHr: "plaža",
        nameEn: "Pupnatska Luka",
        nameHr: "Pupnatska Luka",
        descriptionEn: "A beautiful secluded bay with crystal clear water, considered one of the most beautiful beaches on the island.",
        descriptionHr: "Prekrasan skroviti zaljev s kristalno čistom vodom, smatra se jednom od najljepših plaža na otoku.",
        image: "/images/locations/pupnatska-luka.webp",
        distanceEn: "20 minutes by car",
        distanceHr: "20 minuta automobilom",
        featureEn: "Hidden gem",
        featureHr: "Skriveni dragulj"
      },
      {
        typeEn: "restaurant",
        typeHr: "restoran",
        nameEn: "Konoba Belin",
        nameHr: "Konoba Belin",
        descriptionEn: "Family-run tavern in a small village serving authentic local cuisine with ingredients from their own garden.",
        descriptionHr: "Obiteljska konoba u malom selu koja služi autentičnu lokalnu kuhinju sa sastojcima iz vlastitog vrta.",
        image: "/images/locations/belin.webp",
        distanceEn: "15 minutes by car",
        distanceHr: "15 minuta automobilom",
        featureEn: "Farm to table",
        featureHr: "Od polja do stola"
      }
    ];
    
    // Add locations to storage
    locationData.forEach((location, index) => {
      this.locations.set(index + 1, {
        id: index + 1,
        ...location
      });
    });
  }
}

export const storage = new MemStorage();