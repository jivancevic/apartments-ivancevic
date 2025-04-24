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
    const newApartment = { ...apartment, id };
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
    const newInquiry = { ...inquiry, id, createdAt };
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
    const newLocation = { ...location, id };
    this.locations.set(id, newLocation);
    return newLocation;
  }
  
  // Seed methods to populate initial data
  private seedApartments() {
    const sampleApartments: InsertApartment[] = [
      {
        nameEn: "Apartment 1 (Sea View)",
        nameHr: "Apartman 1 (Pogled na more)",
        descriptionEn: "A beautiful apartment with stunning sea views from the private balcony. Perfect for couples or small families looking for comfort and tranquility.",
        descriptionHr: "Prekrasan apartman s nevjerojatnim pogledom na more s privatnog balkona. Savršen za parove ili manje obitelji koje traže udobnost i mir.",
        mainImage: "/images/apartments/apt1-main.jpg",
        images: [
          "/images/apartments/apt1-1.jpg",
          "/images/apartments/apt1-2.jpg",
          "/images/apartments/apt1-3.jpg",
          "/images/apartments/apt1-4.jpg"
        ],
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
        nameEn: "Apartment 2 (Garden)",
        nameHr: "Apartman 2 (Vrt)",
        descriptionEn: "A charming apartment with private garden access, perfect for families or groups who want to enjoy outdoor space during their stay.",
        descriptionHr: "Šarmantan apartman s pristupom privatnom vrtu, savršen za obitelji ili grupe koje žele uživati u vanjskom prostoru tijekom boravka.",
        mainImage: "/images/apartments/apt2-main.jpg",
        images: [
          "/images/apartments/apt2-1.jpg",
          "/images/apartments/apt2-2.jpg",
          "/images/apartments/apt2-3.jpg",
          "/images/apartments/apt2-4.jpg"
        ],
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
        nameEn: "Apartment 3 (Balcony)",
        nameHr: "Apartman 3 (Balkon)",
        descriptionEn: "Spacious apartment with a large balcony, perfect for enjoying morning coffee or evening drinks with a beautiful view.",
        descriptionHr: "Prostrani apartman s velikim balkonom, savršen za uživanje u jutarnjoj kavi ili večernjem piću s prekrasnim pogledom.",
        mainImage: "/images/apartments/apt3-main.jpg",
        images: [
          "/images/apartments/apt3-1.jpg",
          "/images/apartments/apt3-2.jpg",
          "/images/apartments/apt3-3.jpg",
          "/images/apartments/apt3-4.jpg"
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
        mainImage: "/images/apartments/apt4-main.jpg",
        images: [
          "/images/apartments/apt4-1.jpg",
          "/images/apartments/apt4-2.jpg",
          "/images/apartments/apt4-3.jpg",
          "/images/apartments/apt4-4.jpg"
        ],
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
        mainImage: "/images/apartments/apt5-main.jpg",
        images: [
          "/images/apartments/apt5-1.jpg",
          "/images/apartments/apt5-2.jpg",
          "/images/apartments/apt5-3.jpg",
          "/images/apartments/apt5-4.jpg"
        ],
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
        mainImage: "/images/apartments/apt6-main.jpg",
        images: [
          "/images/apartments/apt6-1.jpg",
          "/images/apartments/apt6-2.jpg",
          "/images/apartments/apt6-3.jpg",
          "/images/apartments/apt6-4.jpg"
        ],
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
        mainImage: "/images/apartments/apt7-main.jpg",
        images: [
          "/images/apartments/apt7-1.jpg",
          "/images/apartments/apt7-2.jpg",
          "/images/apartments/apt7-3.jpg",
          "/images/apartments/apt7-4.jpg"
        ],
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
        mainImage: "/images/apartments/apt8-main.jpg",
        images: [
          "/images/apartments/apt8-1.jpg",
          "/images/apartments/apt8-2.jpg",
          "/images/apartments/apt8-3.jpg",
          "/images/apartments/apt8-4.jpg"
        ],
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
        mainImage: "/images/apartments/apt9-main.jpg",
        images: [
          "/images/apartments/apt9-1.jpg",
          "/images/apartments/apt9-2.jpg",
          "/images/apartments/apt9-3.jpg",
          "/images/apartments/apt9-4.jpg"
        ],
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
      startDate: new Date(now.getFullYear(), now.getMonth(), 11),
      endDate: new Date(now.getFullYear(), now.getMonth(), 20)
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
