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
        mainImage: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
          "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
        mainImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1610983916324-3d2c11f18cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
        mainImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
        nameEn: "Apartment 4 (Deluxe)",
        nameHr: "Apartman 4 (Deluxe)",
        descriptionEn: "Our premium apartment with top-quality furnishings, ample space, and the best sea views. Perfect for those seeking a luxury experience.",
        descriptionHr: "Naš premium apartman s visokokvalitetnim namještajem, velikim prostorom i najboljim pogledom na more. Savršen za one koji traže luksuzno iskustvo.",
        mainImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
          "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        price: 100,
        priceHigh: 150,
        pricePeak: 190,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        hasParking: true,
        hasGarden: false,
        otherAmenities: ["Premium Bedding", "Coffee Machine"]
      },
      {
        nameEn: "Apartment 5",
        nameHr: "Apartman 5",
        descriptionEn: "Cozy and comfortable apartment perfect for couples, with all essential amenities for a pleasant stay.",
        descriptionHr: "Ugodan i komforan apartman savršen za parove, sa svim osnovnim sadržajima za ugodan boravak.",
        mainImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
          "https://images.unsplash.com/photo-1536399026617-d75510e4e23b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ],
        price: 65,
        priceHigh: 100,
        pricePeak: 130,
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
