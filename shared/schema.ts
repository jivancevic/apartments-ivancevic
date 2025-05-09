import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define Apartment schema
export const apartments = pgTable("apartments", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameHr: text("name_hr").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionHr: text("description_hr").notNull(),
  images: text("images").array().notNull(),
  location: text("location").notNull(),
  basePeakPrice: integer("base_peak_price").notNull().default(110),
  priceMultiplier: text("price_multiplier").notNull().default("1.0"),
  cleaningFee: integer("cleaning_fee").notNull().default(40),
  bookingUrl: text("booking_url"),
  airbnbUrl: text("airbnb_url"),
  hasWifi: boolean("has_wifi").notNull().default(true),
  hasKitchen: boolean("has_kitchen").notNull().default(true),
  hasAC: boolean("has_ac").notNull().default(true),
  hasTV: boolean("has_tv").notNull().default(true),
  hasBalcony: boolean("has_balcony").notNull().default(false),
  hasSeaView: boolean("has_sea_view").notNull().default(false),
  hasParking: boolean("has_parking").notNull().default(true),
  hasGarden: boolean("has_garden").notNull().default(false),
  otherAmenities: text("other_amenities").array(),
  icalUrls: text("ical_urls").array(),
});

// Define Booking schema
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  apartmentId: integer("apartment_id").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
});

// Define Inquiry schema
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  apartmentId: integer("apartment_id"),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define Location schema
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  typeEn: text("type_en").notNull(), // 'beach', 'restaurant', 'attraction', 'activity'
  typeHr: text("type_hr").notNull(),
  nameEn: text("name_en").notNull(),
  nameHr: text("name_hr").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionHr: text("description_hr").notNull(),
  image: text("image").notNull(),
  distanceEn: text("distance_en"),
  distanceHr: text("distance_hr"),
  featureEn: text("feature_en"),
  featureHr: text("feature_hr"),
});

// Insert schemas using drizzle-zod
export const insertApartmentSchema = createInsertSchema(apartments);
export const insertBookingSchema = createInsertSchema(bookings);
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export const insertLocationSchema = createInsertSchema(locations);

// Schema with validation for inquiries form
export const inquiryFormSchema = insertInquirySchema.extend({
  email: z.string().email({ message: "Please enter a valid email address" }),
  checkIn: z.date().refine(date => date >= new Date(), {
    message: "Check-in date must be in the future"
  }),
  checkOut: z.date().refine(date => date >= new Date(), {
    message: "Check-out date must be in the future"
  }),
});

// Ensure check-out date is after check-in date
export const inquiryWithDateValidationSchema = inquiryFormSchema.refine(
  data => data.checkOut > data.checkIn,
  {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"]
  }
);

// Types
export type Apartment = typeof apartments.$inferSelect;
export type InsertApartment = typeof apartments.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;
