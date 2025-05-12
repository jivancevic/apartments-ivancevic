import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import fetch from "node-fetch";
import ical from 'ical';
import { sendOwnerNotification, sendCustomerConfirmation } from './email';

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
  
  // Get iCal bookings for a specific apartment
  app.get('/api/apartments/:id/ical-bookings', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid apartment ID' });
      }
      
      const apartment = await storage.getApartment(id);
      if (!apartment) {
        return res.status(404).json({ message: 'Apartment not found' });
      }
      
      // Check if apartment has icalUrls property and it has items
      const icalUrls = (apartment as any).icalUrls;
      if (!icalUrls || !Array.isArray(icalUrls) || icalUrls.length === 0) {
        return res.json([]);
      }
      
      try {
        const allBookings = [];
      
        for (const url of icalUrls) {
          try {
            // Fetch the iCal feed using our proxy to avoid CORS issues
            console.log(`Fetching iCal feed for apartment ${id} from ${url}`);
            
            // Use a regular fetch without AbortController to avoid TypeScript errors
            const response = await fetch(url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
              }
            });
            
            if (!response.ok) {
              console.error(`Failed to fetch iCal feed for apartment ${id} from ${url}: ${response.statusText}`);
              continue; // Skip this feed but continue with others
            }
            
            const data = await response.text();
            
            // Use the globally imported ical module
            const parsedCal = ical.parseICS(data);
            
            for (const key in parsedCal) {
              const event = parsedCal[key];
              if (event.type === 'VEVENT' && event.start && event.end) {
                allBookings.push({
                  id: Math.floor(Math.random() * 1000000), 
                  apartmentId: id,
                  startDate: event.start.toISOString(),
                  endDate: event.end.toISOString()
                });
              }
            }
          } catch (fetchError: any) {
            console.error(`Error with iCal feed for apartment ${id} from ${url}:`, fetchError.message);
            // Continue with other feeds even if this one fails
          }
        }
        
        res.json(allBookings);
      } catch (error: any) {
        console.error(`Error processing iCal bookings for apartment ${id}:`, error.message);
        res.status(500).json({ 
          message: 'Error processing iCal bookings',
          error: error.message 
        });
      }
    } catch (error) {
      console.error(`Error fetching iCal bookings for apartment ${req.params.id}:`, error);
      res.status(500).json({ message: 'Error fetching iCal bookings' });
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
      console.log('Raw inquiry data:', JSON.stringify(req.body, null, 2));
      
      // Create a new object with parsed dates for database storage
      const dbData = { 
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || null,
        apartmentId: req.body.apartmentId ? parseInt(req.body.apartmentId) : null,
        message: req.body.message || null,
        checkIn: new Date(req.body.checkIn),
        checkOut: new Date(req.body.checkOut),
      };
      
      console.log('Processed inquiry data for DB:', JSON.stringify(dbData, null, 2));
      
      // Check if dates are valid
      if (isNaN(dbData.checkIn.getTime()) || isNaN(dbData.checkOut.getTime())) {
        return res.status(400).json({ 
          message: 'Invalid dates provided' 
        });
      }
      
      // Check if check-out date is after check-in date
      if (dbData.checkOut <= dbData.checkIn) {
        return res.status(400).json({ 
          message: 'Check-out date must be after check-in date' 
        });
      }
      
      // Save inquiry to storage
      const inquiry = await storage.createInquiry(dbData);
      
      // If apartment ID is provided, get apartment details
      let apartment = undefined;
      if (dbData.apartmentId) {
        apartment = await storage.getApartment(dbData.apartmentId);
      }
      
      // Send emails asynchronously (don't await)
      try {
        // Email data can use the raw data directly
        const emailData = {
          ...req.body,
          apartmentId: req.body.apartmentId ? parseInt(req.body.apartmentId) : null
        };
        
        // Send notification to the property owner
        sendOwnerNotification(emailData, apartment)
          .then(success => {
            if (!success) console.error('Failed to send owner notification email');
            else console.log('Owner notification email sent successfully');
          })
          .catch(error => {
            console.error('Error in owner notification email:', error);
          });
          
        // Send confirmation to the customer
        sendCustomerConfirmation(emailData, apartment)
          .then(success => {
            if (!success) console.error('Failed to send customer confirmation email');
            else console.log('Customer confirmation email sent successfully');
          })
          .catch(error => {
            console.error('Error in customer confirmation email:', error);
          });
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Continue processing - don't fail the API call if emails fail
      }
      
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(500).json({ message: 'Error submitting inquiry' });
    }
  });
  
  // Proxy for iCal feeds to avoid CORS issues
  app.get('/api/proxy-ical', async (req: Request, res: Response) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ message: 'Missing URL parameter' });
      }
      
      console.log(`Proxying iCal feed from: ${url}`);
      
      try {
        // Using regular fetch without AbortController to avoid TypeScript errors
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          console.error(`Failed to fetch iCal feed: ${response.status} ${response.statusText}`);
          return res.status(response.status).json({ 
            message: `Failed to fetch iCal feed: ${response.statusText}` 
          });
        }
        
        const data = await response.text();
        res.type('text/calendar').send(data);
      } catch (fetchError: any) {
        console.error('Error fetching iCal feed:', fetchError.message);
        res.status(500).json({ 
          message: 'Failed to fetch iCal feed',
          error: fetchError.message
        });
      }
    } catch (error: any) {
      console.error('Error proxying iCal feed:', error.message);
      res.status(500).json({ message: 'Failed to proxy iCal feed' });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
