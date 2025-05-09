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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.35815949195765!2d17.13583210884043!3d42.96238425612054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a517549e08c53%3A0x20f6b511dabd88db!2sMagical%20Oasis%20for%20two%20in%20Korcula%20Old%20Town!5e0!3m2!1sen!2shr!4v1745508164244!5m2!1sen!2shr",
        bookingUrl: "https://www.booking.com/hotel/hr/magical-old-town-escape-for-two.html",
        airbnbUrl: "https://airbnb.com/h/magical-oasis-for-two-in-old-town-korcula",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e21284eed9fbea95b5d2dcc398220",
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartment%20St.%20Roko!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/old-town-st-roko.html",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e2124eed9fbea95b5d2dcc398220",
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd4cd0dbd2911faab332fcfd90"
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
          "https://www.airbnb.com/calendar/ical/963637876908533485.ics?s=d53e212eed9fbea95b5d2dcc398220",
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7ddcd0dbd2911faab332fcfd90"
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
        nameEn: "Lavander",
        nameHr: "Lavanda",
        descriptionEn: "Spacious, air-conditioned, 4 stars apartment for 5 people (+ sofa): 1 double, 1 twin/double room, 1 single, 2 bathrooms, living room, kitchen, balcony. Equipped with SAT/TV, DVD, washing machine, 2 air-conditioning units and other things.",
        descriptionHr: "Prostrani, klimatizirani apartman s 4 zvjezdice za 5 osoba (+ kauč): 1 bračna soba, 1 soba s odvojenim ili bračnim krevetom, 1 jednokrevetna soba, 2 kupaonice, dnevni boravak, kuhinja, balkon. Opremljen satelitskom TV, DVD uređajem, perilicom rublja, dvjema klima jedinicama i ostalom opremom.",
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
          "/images/apartments/lavender/room3.webp",
          "/images/apartments/lavender/stairs.webp",
          "/images/apartments/lavender/table.webp",
          "/images/apartments/lavender/view.webp",
          "/images/apartments/lavender/view2.webp",
          "/images/apartments/lavender/view3.webp",
          "/images/apartments/lavender/wc1.webp",
          "/images/apartments/lavender/wc2.webp",
          "/images/apartments/lavender/wc3.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.55254234976!2d17.132241975471526!3d42.95820129710443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e1!3m2!1sen!2sit!4v1746808352324!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
        airbnbUrl: "https://airbnb.com/h/apartments-viva-lavander",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/7353092.ics?s=eae1da13782e4b81009bcd64f58bd357"
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
        nameEn: "Sun",
        nameHr: "Sunce",
        descriptionEn: "Our nice and comfortable  two bedrooms apartment has a true city feeling! It comfortably fits four and is centrally located just 20 m from Town park, bus station and ACI marina. Area 57m2 + balcony 6,5m2, living room, kitchen, sat/TV, DVD, 2 AC units.",
        descriptionHr: "Naš ugodan i lijepo uređen dvosobni apartman pruža pravi doživljaj grada! Udobno prima četiri osobe i nalazi se na savršenoj lokaciji – samo 20 m od gradskog parka, autobusnog kolodvora i ACI marine. Površina apartmana je 57 m² + balkon 6,5 m². Sadrži dnevni boravak, kuhinju, satelitsku TV, DVD uređaj i dvije klima jedinice.",
        images: [
          "/images/apartments/sun/balcony-view.webp",
          "/images/apartments/sun/balcony.webp",
          "/images/apartments/sun/dining-room.webp",
          "/images/apartments/sun/exterior.webp",
          "/images/apartments/sun/kitchen.webp",
          "/images/apartments/sun/location.webp",
          "/images/apartments/sun/room2.webp",
          "/images/apartments/sun/table.webp",
          "/images/apartments/sun/view.webp",
          "/images/apartments/sun/view2.webp",
          "/images/apartments/sun/view3.webp",
          "/images/apartments/sun/wc.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.55254234976!2d17.132241975471526!3d42.95820129710443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e1!3m2!1sen!2sit!4v1746808352324!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
        airbnbUrl: "https://airbnb.com/h/apartments-viva-sun",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/3289636.ics?s=3fc4d298685df0c27704199880b09d8c"
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
        nameEn: "Sea",
        nameHr: "More",
        descriptionEn: "Air-conditioned, 3 stars studio apartment for 2 people in the centre of town. Living room - kitchen, balcony. Fitted with satellite/TV, DVD, washing machine and other necessary facilities. Living area 28m2 + balcony 6,5m2.",
        descriptionHr: "Klimatizirani studio apartman s 3 zvjezdice za 2 osobe, u samom centru grada. Dnevni boravak s kuhinjom, balkon. Opremljen satelitskom TV, DVD uređajem, perilicom rublja i svim potrebnim sadržajima. Površina 28 m² + balkon 6,5 m².",
        images: [
          "/images/apartments/sea/balcony.webp",
          "/images/apartments/sea/bedroom.webp",
          "/images/apartments/sea/exterior.webp",
          "/images/apartments/sea/location.webp",
          "/images/apartments/sea/wc.webp",
          "/images/apartments/sea/whole.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.55254234976!2d17.132241975471526!3d42.95820129710443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e1!3m2!1sen!2sit!4v1746808352324!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
        airbnbUrl: "https://airbnb.com/h/apartments-viva-sea",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/19014861.ics?s=f8c3b2e230826d572c35ea739efb6e2a"
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
        nameEn: "Beach",
        nameHr: "Plaža",
        descriptionEn: "Great location on the doorstep of the old town. The apartment is nicely decorated and very modern. It is well equipped in every regard. The patio area is lovely with lavendar flowers.",
        descriptionHr: "Izvrsna lokacija – tik uz vrata starog grada. Apartman je moderno uređen, vrlo ugodan i opremljen svime što vam može zatrebati. Dvorište je posebno šarmantno, s lavandom koja unosi mirisnu toplinu.",
        images: [
          "/images/apartments/beach/terrace.webp",
          "/images/apartments/beach/bedroom.webp",
          "/images/apartments/beach/wc.webp",
          "/images/apartments/beach/garden.webp",
          "/images/apartments/beach/exterior.webp",
          "/images/apartments/beach/location.webp"
        ],
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.55254234976!2d17.132241975471526!3d42.95820129710443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5024e22e58e5%3A0x197355921c559cc4!2sApartments%20Viva!5e1!3m2!1sen!2sit!4v1746808352324!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartments-ivancevic.html",
        airbnbUrl: "https://airbnb.com/h/apartments-viva-beach",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/11847437.ics?s=6d2cbbdabf0b62bf08a047cf0712d317"
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.4167420755093!2d17.127484875471605!3d42.961486396894585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a516bb56b95d3%3A0x2758c0e472e4450c!2sApartments%20Giuliani!5e1!3m2!1sen!2sit!4v1746801360640!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
        airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-nika",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/27617468.ics?s=e408c51a965bccbbaba29d58295304a6&locale=hr"
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
        nameEn: "Lara",
        nameHr: "Lara",
        descriptionEn: "Newly renovated studio apartment with a kitchen, bed, bathroom, terrace, and a view of the sea and the Pelješac Channel.",
        descriptionHr: "Novo adaptirani studio apartman sa kuhinjom, krevetom, kupaonom, terasom i pogledom na more i pelješki kanal.",
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
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.82557484831614!2d17.136164208098933!3d42.96223239916531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a503a094e1455%3A0xa0fbe34d9990f304!2sApartmani%20Ivan%C4%8Devi%C4%87!5e0!3m2!1sen!2sit!4v1746459813494!5m2!1sen!2sit",
        bookingUrl: "https://www.booking.com/hotel/hr/apartmani-lara-i-nika.html",
        airbnbUrl: "https://airbnb.com/h/apartmani-giuliani-lara",
        icalUrls: [
          "https://www.airbnb.com/calendar/ical/948402641830434452.ics?s=4b8b7dd24cd0dbd2911faab332fcfd90"
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
