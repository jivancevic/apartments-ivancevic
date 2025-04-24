import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  const apiRouter = app.route('/api');
  
  // Get all apartments
  app.get('/api/apartments', async (req: Request, res: Response) => {
    try {
      const apartments = await storage.getApartments();
      res.json(apartments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching apartments' });
    }
  });
  
  // Get a specific apartment by ID
  app.get('/api/apartments/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid apartment ID' });
      }
      
      const apartment = await storage.getApartment(id);
      if (!apartment) {
        return res.status(404).json({ message: 'Apartment not found' });
      }
      
      res.json(apartment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching apartment' });
    }
  });
  
  // Get bookings for a specific apartment
  app.get('/api/apartments/:id/bookings', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid apartment ID' });
      }
      
      const bookings = await storage.getBookingsByApartment(id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  });
  
  // Get all locations (optionally filtered by type)
  app.get('/api/locations', async (req: Request, res: Response) => {
    try {
      const type = req.query.type as string | undefined;
      
      if (type) {
        const locations = await storage.getLocationsByType(type);
        return res.json(locations);
      }
      
      const locations = await storage.getLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching locations' });
    }
  });
  
  // Submit an inquiry
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    try {
      // Parse dates from strings to Date objects
      if (typeof req.body.checkIn === 'string') {
        req.body.checkIn = new Date(req.body.checkIn);
      }
      
      if (typeof req.body.checkOut === 'string') {
        req.body.checkOut = new Date(req.body.checkOut);
      }
      
      // Validate request body
      const result = insertInquirySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid inquiry data',
          errors: result.error.errors 
        });
      }
      
      // Check if check-out date is after check-in date
      if (result.data.checkOut <= result.data.checkIn) {
        return res.status(400).json({ 
          message: 'Check-out date must be after check-in date' 
        });
      }
      
      const inquiry = await storage.createInquiry(result.data);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(500).json({ message: 'Error submitting inquiry' });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
