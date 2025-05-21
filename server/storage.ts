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
    const apartmentData: InsertApartment[] = [
      {
        nameEn: "Magical Oasis",
        nameHr: "Magical Oasis",
        descriptionEn: "Magical Oasis for two in Old Town Korčula is a charming apartment in the heart of the old town, just steps from St. Mark's Cathedral. This beautifully designed studio with a mezzanine sleeping area features stylish finishes, a comfortable double bed, a modern kitchenette, and a luxurious bathroom with a shower. Enjoy breathtaking sea views from the apartment, and discover the many cafes, restaurants, galleries, and historic sites just moments from your door. The apartment's prime location provides easy access to beaches, water sports, and tour operators.",
        descriptionHr: "Smješten u srcu starog grada, nadohvat katedrale sv. Marka, ovaj šarmantni studio apartman s galerijom i pogledom na more kombinira autentičnost s modernim udobnostima. Uživajte u dvokrevetnom apartmanu s kuhinjom i luksuznom kupaonicom. Idealno smješten pokraj brojnih kafića, restorana, galerija i povijesnih znamenitosti, s lakim pristupom plažama i sportovima na vodi.",
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.35815949195765!2d17.13583210884043!3d42.96238425612054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517549e08c53%3A0x20f6b511dabd88db!2sMagical%20Oasis%20for%20two%20in%20Korcula%20Old%20Town!5e0!3m2!1sen!2shr!4v1745508164244!5m2!1sen!2shr",
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
        parkingType: "none",
        parkingDetails: null,
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d403.7613683333374!2d17.135865071753455!3d42.96278344428222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5091a8dfba33%3A0x5f8d82eebee50fa0!2sApartment%20st%20Roko!5e0!3m2!1sen!2shr!4v1745508323704!5m2!1sen!2shr",
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
        parkingType: "none",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: ["Patio Furniture"]
      },
      {
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d414.28494504583205!2d17.13522756990842!3d42.96152961092943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a6c1cbb5f%3A0x2849d1dc0357a5b5!2sUl.%20Ismaelli%205%2C%2020260%2C%20Kor%C4%8Dula%2C%20Croatia!5e1!3m2!1sen!2sit!4v1746768250275!5m2!1sen!2sit",
        airbnbUrl: "airbnb.com/h/korcula-old-town-palace-sunset-flat",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
        ],
        basePeakPrice: 110,
        priceMultiplier: "4.00",
        cleaningFee: 80,
        maxGuests: 5,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        parkingType: "none",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Lavander",
        nameHr: "Lavanda",
        descriptionEn: "Spacious, air-conditioned, 4 stars apartment for 5 people (+ sofa): 1 double, 1 twin/double room, 1 single, 2 bathrooms, living room, kitchen, balcony. Equipped with SAT/TV, DVD, washing machine, 2 air-conditioning units and other things.",
        descriptionHr: "Prostrani, klimatizirani apartman s 4 zvjezdice za 5 osoba (+ kauč): 1 bračna soba, 1 soba s odvojenim ili bračnim krevetom, 1 jednokrevetna soba, 2 kupaonice, dnevni boravak, kuhinja, balkon. Opremljen satelitskom TV, DVD uređajem, perilicom rublja, dvjema klima jedinicama i ostalom opremom.",
        images: [
          "/images/apartments/lavander/balcony.webp",
          "/images/apartments/lavander/balcony2.webp",
          "/images/apartments/lavander/balcony3.webp",
          "/images/apartments/lavander/books.webp",
          "/images/apartments/lavander/dining-room.webp",
          "/images/apartments/lavander/entrance.webp",
          "/images/apartments/lavander/exterior.webp",
          "/images/apartments/lavander/kitchen.webp",
          "/images/apartments/lavander/living-room.webp",
          "/images/apartments/lavander/location.webp",
          "/images/apartments/lavander/room1.webp",
          "/images/apartments/lavander/room1-2.webp",
          "/images/apartments/lavander/room2.webp",
          "/images/apartments/lavander/room2-2.webp",
          "/images/apartments/lavander/room3.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.27957913747578!2d17.134640899881172!3d42.95822117073364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e0!3m2!1sen!2sit!4v1747665668512!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
        airbnbUrl: "https://airbnb.com/h/lavanda-apartment-korcula",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/7353092.ics?s=eae1da13782e4b81009bcd64f58bd357"
        ],
        basePeakPrice: 110,
        priceMultiplier: "2.75",
        cleaningFee: 80,
        maxGuests: 6,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: false,
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
        descriptionEn: "Modern, air-conditioned, 4 stars apartment for 4 people: 1 double, 1 twin/double room, 1 bathroom, living room, kitchen, balcony. Equipped with satellite/TV, DVD, washing machine and other necessary facilities.",
        descriptionHr: "Moderni, klimatizirani apartman s 4 zvjezdice za 4 osobe: 1 bračna soba, 1 soba s odvojenim ili bračnim krevetom, 1 kupaonica, dnevni boravak, kuhinja, balkon. Opremljen satelitskom TV, DVD, perilicom rublja i drugim potrebnim sadržajima.",
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: false,
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: false,
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
        descriptionEn: "Great location on the doorstep of the old town. The apartment is nicely decorated and very modern. It is well equipped in every regard. The patio area is lovely with lavendar flowers.",
        descriptionHr: "Izvrsna lokacija – tik uz vrata starog grada. Apartman je moderno uređen, vrlo ugodan i opremljen svime što vam može zatrebati. Dvorište je posebno šarmantno, s lavandom koja unosi mirisnu toplinu.",
        images: [
          "/images/apartments/beach/living-room.webp",
          "/images/apartments/beach/couch.webp",
          "/images/apartments/beach/balcony.webp",
          "/images/apartments/beach/kitchen.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.812968723878!2d17.130686977090376!3d42.96122627114335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a8c2af613%3A0x2c0e4b2c1db1bff9!2sApartments%20Giuliani!5e0!3m2!1sen!2sit!4v1747665748121!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
        airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-beach",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/11847437.ics?s=6d2cbbdabf0b62bf08a047cf0712d317"
        ],
        basePeakPrice: 110,
        priceMultiplier: "1.25",
        cleaningFee: 60,
        maxGuests: 3,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: false,
        hasSeaView: false,
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
        descriptionEn: "Beautiful sea view and close proximity to the old town center.",
        descriptionHr: "Pogled i blizina starge gradske jezgre, pogled na more.",
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
        maxGuests: 4,
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
        parkingType: "free",
        parkingDetails: null,
        hasGarden: false,
        otherAmenities: []
      },
      {
        nameEn: "Lara",
        nameHr: "Lara",
        descriptionEn: "Air-conditioned, 3 stars apartment in the center of town for 4 people: 1 double, 1 twin room, 1 bathroom, living room, kitchen, balcony. Fitted with satellite/TV, DVD, washing machine and other necessary facilities.",
        descriptionHr: "Klimatizirani apartman s 3 zvjezdice u centru grada za 4 osobe: 1 bračna soba, 1 soba s odvojenim krevetima, 1 kupaonica, dnevni boravak, kuhinja, balkon. Opremljen satelitskom TV, DVD, perilicom rublja i svim potrebnim sadržajima.",
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
        hasWifi: true,
        hasKitchen: true,
        hasAC: true,
        hasTV: true,
        hasBalcony: true,
        hasSeaView: true,
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