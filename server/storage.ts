import { 
  apartments, type Apartment, type InsertApartment,
  bookings, type Booking, type InsertBooking,
  inquiries, type Inquiry, type InsertInquiry,
  locations, type Location, type InsertLocation
} from "@shared/schema";

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
    
    this.apartmentId = 1;
    this.bookingId = 1;
    this.inquiryId = 1;
    this.locationId = 1;
    
    // Seed with some initial apartment data
    this.seedApartments();
    this.seedLocations();
  }
  
  // Apartment methods
  async getApartments(): Promise<Apartment[]> {
    return Array.from(this.apartments.values());
  }
  
  async getApartment(id: number): Promise<Apartment | undefined> {
    return this.apartments.get(id);
  }
  
  async createApartment(apartment: InsertApartment): Promise<Apartment> {
    const id = this.apartmentId++;
    // Ensure required fields are set to null when undefined
    const bookingUrl = apartment.bookingUrl === undefined ? null : apartment.bookingUrl;
    const airbnbUrl = apartment.airbnbUrl === undefined ? null : apartment.airbnbUrl;
    const otherAmenities = apartment.otherAmenities === undefined ? null : apartment.otherAmenities;
    
    const newApartment = { 
      ...apartment, 
      id,
      bookingUrl,
      airbnbUrl,
      otherAmenities
    };
    
    this.apartments.set(id, newApartment);
    return newApartment;
  }
  
  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBookingsByApartment(apartmentId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.apartmentId === apartmentId
    );
  }
  
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);
    return newBooking;
  }
  
  // Inquiry methods
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const createdAt = new Date();
    
    // Ensure optional fields are set to null when undefined
    const apartmentId = inquiry.apartmentId === undefined ? null : inquiry.apartmentId;
    const phone = inquiry.phone === undefined ? null : inquiry.phone;
    const message = inquiry.message === undefined ? null : inquiry.message;
    
    const newInquiry = { 
      ...inquiry, 
      id, 
      createdAt,
      apartmentId,
      phone,
      message
    };
    
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
  
  // Location methods
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }
  
  async getLocationsByType(type: string): Promise<Location[]> {
    return Array.from(this.locations.values()).filter(
      location => location.typeEn === type || location.typeHr === type
    );
  }
  
  async createLocation(location: InsertLocation): Promise<Location> {
    const id = this.locationId++;
    
    // Ensure optional fields are set to null when undefined
    const distanceEn = location.distanceEn === undefined ? null : location.distanceEn;
    const distanceHr = location.distanceHr === undefined ? null : location.distanceHr;
    const featureEn = location.featureEn === undefined ? null : location.featureEn;
    const featureHr = location.featureHr === undefined ? null : location.featureHr;
    
    const newLocation = { 
      ...location, 
      id,
      distanceEn,
      distanceHr,
      featureEn,
      featureHr
    };
    
    this.locations.set(id, newLocation);
    return newLocation;
  }
  
  // Seed methods to populate initial data
  private seedApartments() {
    const sampleApartments: InsertApartment[] = [
      {
        nameEn: "Magical Oasis",
        nameHr: "Magical Oasis",
        descriptionEn: "Discover a blend of ancient allure and modern luxury in our 35m² Korčula apartment. Nestled in the heart of the Old Town, right beside the storied Kanavelic Tower, this charming space boasts authentic stone walls, evoking tales of yesteryears. Though it radiates old-world charm, rest assured, it's equipped with contemporary comforts: 2 ACs,  2 TVs, BT soundbar, dishwasher, washer, and dryer. Dive into Korčula's rich past while indulging in today's conveniences in this enchanting retreat.",
        descriptionHr: "Otkrij spoj drevnog šarma i moderne udobnosti u našem apartmanu od 35 m² u Korčuli. Smješten u srcu Starog grada, odmah pokraj povijesne Kule Kanavelić, ovaj šarmantni prostor krase autentični kameni zidovi koji prizivaju priče prošlih vremena. Iako odiše duhom starine, opremljen je svim suvremenim pogodnostima: 2 klima uređaja, 2 televizora, Bluetooth zvučnici, perilica posuđa, perilica i sušilica rublja. Uživajte u bogatoj prošlosti Korčule uz udobnosti današnjice u ovom očaravajućem kutku.",
        images: [
          "/images/apartments/magical-oasis/1.png",
          "/images/apartments/magical-oasis/2.png",
          "/images/apartments/magical-oasis/3.png",
          "/images/apartments/magical-oasis/4.png",
          "/images/apartments/magical-oasis/5.png",
          "/images/apartments/magical-oasis/6.png"
        ],
        bookingUrl: "https://www.booking.com/hotel/hr/magical-old-town-escape-for-two.html",
        airbnbUrl: "https://airbnb.com/h/magical-oasis-for-two-in-old-town-korcula",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e21284eed9fbea95b5d2dcc398220",
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.35815949195765!2d17.13583210884043!3d42.96238425612054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517549e08c53%3A0x20f6b511dabd88db!2sMagical%20Oasis%20for%20two%20in%20Korcula%20Old%20Town!5e0!3m2!1sen!2shr!4v1745508164244!5m2!1sen!2shr",
        price: 80,
        priceHigh: 120,
        pricePeak: 150,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasParking: true,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Saint Roko",
        nameHr: "Sveti Roko",
        descriptionEn: `Old town St. Roko offers accommodations in Korčula, a few steps from Marco Polo Birth House and a 1-minute walk from St. Marc Cathedral in Korcula. This apartment provides air-conditioned accommodations with free Wifi. The property is a few steps from Beach Zakerjan and within 70 yards of the city center.

The apartment features 1 bedroom, a fully equipped kitchen with a microwave, a washing machine, and 1 bathroom with a hair dryer and free toiletries. Towels and bed linen are featured in the apartment. For added privacy, the accommodation has a private entrance and soundproofing.`,
        descriptionHr: `Apartman Sveti Roko nudi smještaj u Korčuli, na nekoliko koraka od kuće Marka Pola i jednu minutu hoda od katedrale sv. Marka. Apartman je klimatiziran i ima besplatan WiFi. Nalazi se svega nekoliko koraka od plaže Zakerjan i unutar 70 metara od samog centra grada.

Apartman ima jednu spavaću sobu, potpuno opremljenu kuhinju s mikrovalnom pećnicom, perilicu rublja te kupaonicu s fenom za kosu. Ručnici i posteljina su osigurani. Za dodatnu privatnost, smještaj ima zaseban ulaz i zvučnu izolaciju.`,
        images: [
          "/images/apartments/st-roko/1.jpg",
          "/images/apartments/st-roko/2.jpg",
          "/images/apartments/st-roko/3.jpg",
          "/images/apartments/st-roko/4.jpg",
          "/images/apartments/st-roko/5.jpg",
          "/images/apartments/st-roko/6.jpg",
          "/images/apartments/st-roko/4.jpg",
          "/images/apartments/st-roko/5.jpg",
          "/images/apartments/st-roko/6.jpg"
        ],
        bookingUrl: "https://www.booking.com/hotel/hr/apartment-st-roko-korcula.html",
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartment%20St.%20Roko!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        price: 70,
        priceHigh: 110,
        pricePeak: 140,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
        hasParking: true,
        hasGarden: true,
        otherAmenities: ["Patio Furniture"]
      },
      {
        nameEn: "Ismaelli Palace",
        nameHr: "Palača Ismaelli",
        descriptionEn: "Discover magical moments in the Old Town Palace Sunset Flat apartment, located in the historic Ismaelli Palace. From its windows, as well as from the spacious terrace, there is a spectacular sea view of the sunset. Two comfortable bedrooms, kitchen, living room, renovated bathroom and terrace on more than 110m². The location is perfect - just a step away from the cathedral. Experience the authentic atmosphere of this wonderful place and create unforgettable memories in this unique retro ambience.",
        descriptionHr: "Doživite čarobne trenutke u apartmanu Old Town Palace Sunset Flat, smještenom u povijesnoj palači Ismaelli. S prozora, kao i s prostrane terase, pruža se spektakularan pogled na more i zalazak sunca. Dvije udobne spavaće sobe, kuhinja, dnevni boravak, renovirana kupaonica i terasa na više od 110 m². Lokacija je savršena – samo korak od katedrale. Osjetite autentičnu atmosferu ovog prekrasnog mjesta i stvorite nezaboravne uspomene u ovom jedinstvenom retro ambijentu.",
        images: [
          "/images/apartments/apt3/1.jpg",
          "/images/apartments/apt3/2.jpg",
          "/images/apartments/apt3/3.jpg",
          "/images/apartments/apt3/4.jpg",
          "/images/apartments/apt3/5.jpg"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d414.28494504583205!2d17.13522756990842!3d42.96152961092943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a6c1cbb5f%3A0x2849d1dc0357a5b5!2sUl.%20Ismaelli%205%2C%2020260%2C%20Kor%C4%8Dula%2C%20Croatia!5e1!3m2!1sen!2sit!4v1746768250275!5m2!1sen!2sit",
        airbnbUrl: "airbnb.com/h/korcula-old-town-palace-sunset-flat",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
        ],
        price: 75,
        priceHigh: 115,
        pricePeak: 145,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: false,
        hasParking: true,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Apartment 4 (Family)",
        nameHr: "Apartman 4 (Obiteljski)",
        descriptionEn: "A spacious family apartment with two bedrooms, ideal for families or groups looking for extra space and comfort during their vacation.",
        descriptionHr: "Prostrani obiteljski apartman s dvije spavaće sobe, idealan za obitelji ili grupe koje traže dodatni prostor i udobnost tijekom odmora.",
        images: [
          "/images/apartments/apt4/1.jpg",
          "/images/apartments/apt4/2.jpg",
          "/images/apartments/apt4/3.jpg",
          "/images/apartments/apt4/4.jpg",
          "/images/apartments/apt4/5.jpg",
          "/images/apartments/apt4/6.jpg"
        ],
        bookingUrl: "https://www.booking.com/hotel/hr/apartment-family.html",
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        price: 90,
        priceHigh: 130,
        pricePeak: 160,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasParking: true,
        hasGarden: false,
        otherAmenities: ["Bunk beds", "Two bathrooms"]
      },
      {
        nameEn: "Apartment 5 (Studio)",
        nameHr: "Apartman 5 (Studio)",
        descriptionEn: "A cozy studio apartment perfect for solo travelers or couples who want a comfortable base for exploring the island of Korčula.",
        descriptionHr: "Udoban studio apartman savršen za samostalne putnike ili parove koji žele udobnu bazu za istraživanje otoka Korčule.",
        images: [
          "/images/apartments/apt5/1.jpg",
          "/images/apartments/apt5/2.jpg",
          "/images/apartments/apt5/3.jpg",
          "/images/apartments/apt5/4.jpg"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        airbnbUrl: "https://www.airbnb.com/rooms/56789012",
        price: 60,
        priceHigh: 90,
        pricePeak: 120,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
        hasParking: true,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Apartment 6 (Deluxe)",
        nameHr: "Apartman 6 (Deluxe)",
        descriptionEn: "Our premium offering with luxury amenities, spacious living areas, and panoramic sea views for the most discerning travelers.",
        descriptionHr: "Naša premium ponuda s luksuznim sadržajima, prostranim dnevnim boravkom i panoramskim pogledom na more za najzahtjevnije putnike.",
        images: [
          "/images/apartments/apt6/1.jpg",
          "/images/apartments/apt6/2.jpg",
          "/images/apartments/apt6/3.jpg",
          "/images/apartments/apt6/4.jpg",
          "/images/apartments/apt6/5.jpg",
          "/images/apartments/apt6/6.jpg",
          "/images/apartments/apt6/7.jpg"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartment-deluxe.html",
        price: 100,
        priceHigh: 150,
        pricePeak: 180,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasParking: true,
        hasGarden: true,
        otherAmenities: ["Premium Furniture", "Coffee Machine", "Smart Home System"]
      },
      {
        nameEn: "Apartment 7 (Romantic)",
        nameHr: "Apartman 7 (Romantični)",
        descriptionEn: "Specially designed for couples, this intimate apartment offers romance and privacy with a private terrace perfect for sunset dinners.",
        descriptionHr: "Posebno dizajniran za parove, ovaj intimni apartman nudi romantiku i privatnost s privatnom terasom savršenom za večere uz zalazak sunca.",
        images: [
          "/images/apartments/apt7/1.jpg",
          "/images/apartments/apt7/2.jpg",
          "/images/apartments/apt7/3.jpg",
          "/images/apartments/apt7/4.jpg",
          "/images/apartments/apt7/5.jpg"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        airbnbUrl: "https://www.airbnb.com/rooms/67890123",
        price: 85,
        priceHigh: 125,
        pricePeak: 155,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasParking: true,
        hasGarden: false,
        otherAmenities: ["Romantic Lighting", "Wine Cooler"]
      },
      {
        nameEn: "Apartment 8 (Attic)",
        nameHr: "Apartman 8 (Potkrovlje)",
        descriptionEn: "Charming attic apartment with unique architecture, skylights, and a cozy atmosphere perfect for those seeking something different.",
        descriptionHr: "Šarmantni potkrovni apartman s jedinstvenom arhitekturom, krovnim prozorima i ugodnom atmosferom savršen za one koji traže nešto drugačije.",
        images: [
          "/images/apartments/apt8/1.jpg",
          "/images/apartments/apt8/2.jpg",
          "/images/apartments/apt8/3.jpg",
          "/images/apartments/apt8/4.jpg"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartment-attic.html",
        price: 70,
        priceHigh: 110,
        pricePeak: 140,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
        hasParking: true,
        hasGarden: false,
        otherAmenities: ["Reading Nook", "Skylights"]
      },
      {
        nameEn: "Apartment 9 (Economy)",
        nameHr: "Apartman 9 (Ekonomski)",
        descriptionEn: "Budget-friendly option with all essential amenities and comfortable furnishings, perfect for travelers watching their spending.",
        descriptionHr: "Opcija prilagođena budžetu sa svim osnovnim sadržajima i udobnim namještajem, savršena za putnike koji paze na potrošnju.",
        images: [
          "/images/apartments/apt9/1.jpg",
          "/images/apartments/apt9/2.jpg",
          "/images/apartments/apt9/3.jpg",
          "/images/apartments/apt9/4.jpg"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        airbnbUrl: "https://www.airbnb.com/rooms/78901234",
        price: 55,
        priceHigh: 85,
        pricePeak: 115,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
        hasParking: true,
        hasGarden: false,
        otherAmenities: []
      }
    ];
    
    sampleApartments.forEach(apartment => {
      this.createApartment(apartment);
    });
    
    // Add some sample bookings
    const now = new Date();
    
    // Sample booking for Apartment 1
    this.createBooking({
      apartmentId: 1,
      startDate: new Date(now.getFullYear(), now.getMonth(), 11).toISOString().split('T')[0],
      endDate: new Date(now.getFullYear(), now.getMonth(), 20).toISOString().split('T')[0]
    });
  }
  
  private seedLocations() {
    const sampleLocations: InsertLocation[] = [
      // Beaches
      {
        typeEn: "beach",
        typeHr: "plaža",
        nameEn: "Pupnatska Luka Beach",
        nameHr: "Plaža Pupnatska Luka",
        descriptionEn: "A hidden gem with crystal clear water, surrounded by pine trees. One of the most beautiful beaches on the island.",
        descriptionHr: "Skriveni dragulj s kristalno čistom vodom, okružen borovima. Jedna od najljepših plaža na otoku.",
        image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "15 min drive",
        distanceHr: "15 min vožnje",
        featureEn: "Beach bar",
        featureHr: "Plažni bar"
      },
      {
        typeEn: "beach",
        typeHr: "plaža",
        nameEn: "Vela Pržina Beach",
        nameHr: "Plaža Vela Pržina",
        descriptionEn: "Sandy beach with shallow water, perfect for families with children. Offers stunning views of the nearby islands.",
        descriptionHr: "Pješčana plaža s plitkom vodom, savršena za obitelji s djecom. Nudi prekrasan pogled na obližnje otoke.",
        image: "https://images.unsplash.com/photo-1621789098261-166e6f869583?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "20 min drive",
        distanceHr: "20 min vožnje",
        featureEn: "Sunbeds available",
        featureHr: "Dostupni ležaljke"
      },
      {
        typeEn: "beach",
        typeHr: "plaža",
        nameEn: "Banje Beach",
        nameHr: "Plaža Banje",
        descriptionEn: "Located in Korčula Town, this popular beach offers easy access to restaurants and historical attractions.",
        descriptionHr: "Smještena u gradu Korčuli, ova popularna plaža nudi jednostavan pristup restoranima i povijesnim atrakcijama.",
        image: "https://images.unsplash.com/photo-1566475955255-71f4364b5f53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "5 min walk",
        distanceHr: "5 min hoda",
        featureEn: "Beach bar & restaurant",
        featureHr: "Plažni bar i restoran"
      },
      
      // Restaurants
      {
        typeEn: "restaurant",
        typeHr: "restoran",
        nameEn: "Konoba Mate",
        nameHr: "Konoba Mate",
        descriptionEn: "Traditional Dalmatian cuisine with local ingredients and family recipes passed down for generations.",
        descriptionHr: "Tradicionalna dalmatinska kuhinja s lokalnim sastojcima i obiteljskim receptima koji se prenose generacijama.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "10 min drive",
        distanceHr: "10 min vožnje",
        featureEn: "Local favorite",
        featureHr: "Lokalni favorit"
      },
      {
        typeEn: "restaurant",
        typeHr: "restoran",
        nameEn: "LD Restaurant",
        nameHr: "LD Restoran",
        descriptionEn: "Upscale dining with traditional Dalmatian cuisine and an extensive wine list. Stunning sea views.",
        descriptionHr: "Vrhunska gastronomija s tradicionalnom dalmatinskom kuhinjom i bogatom vinskom kartom. Prekrasan pogled na more.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "10 min walk",
        distanceHr: "10 min hoda",
        featureEn: "Local favorite",
        featureHr: "Lokalni favorit"
      },
      
      // Attractions
      {
        typeEn: "attraction",
        typeHr: "atrakcija",
        nameEn: "Korčula Old Town",
        nameHr: "Stari grad Korčula",
        descriptionEn: "Historic town with medieval walls, narrow streets, and Marco Polo's alleged birthplace.",
        descriptionHr: "Povijesni grad s srednjovjekovnim zidinama, uskim ulicama i navodnim rodnim mjestom Marka Pola.",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "15 min drive",
        distanceHr: "15 min vožnje",
        featureEn: "Historical site",
        featureHr: "Povijesno mjesto"
      },
      {
        typeEn: "attraction",
        typeHr: "atrakcija",
        nameEn: "St. Mark's Cathedral",
        nameHr: "Katedrala sv. Marka",
        descriptionEn: "Gothic-Renaissance cathedral with beautiful artwork and a treasury of religious artifacts.",
        descriptionHr: "Gotičko-renesansna katedrala s prekrasnim umjetničkim djelima i riznicom vjerskih artefakata.",
        image: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "15 min drive",
        distanceHr: "15 min vožnje",
        featureEn: "Religious site",
        featureHr: "Vjersko mjesto"
      },
      
      // Activities
      {
        typeEn: "activity",
        typeHr: "aktivnost",
        nameEn: "Korčula Windsurfing",
        nameHr: "Korčula Windsurfing",
        descriptionEn: "Excellent windsurfing conditions with equipment rental and lessons for beginners and advanced surfers.",
        descriptionHr: "Odlični uvjeti za windsurfing s najamom opreme i lekcijama za početnike i napredne surfere.",
        image: "https://images.unsplash.com/photo-1531201890851-5f39adebc6e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "20 min drive",
        distanceHr: "20 min vožnje",
        featureEn: "Equipment rental",
        featureHr: "Najam opreme"
      },
      {
        typeEn: "activity",
        typeHr: "aktivnost",
        nameEn: "Island Boat Tours",
        nameHr: "Otočke ture brodom",
        descriptionEn: "Explore the beautiful archipelago around Korčula, with swimming stops in secluded bays.",
        descriptionHr: "Istražite prekrasan arhipelag oko Korčule, sa stajanjem za kupanje u skrivenim uvalama.",
        image: "https://images.unsplash.com/photo-1569263900347-06b1e8c825ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        distanceEn: "Departs from town",
        distanceHr: "Polazi iz grada",
        featureEn: "Full-day tours",
        featureHr: "Cjelodnevne ture"
      }
    ];
    
    sampleLocations.forEach(location => {
      this.createLocation(location);
    });
  }
}

export const storage = new MemStorage();
