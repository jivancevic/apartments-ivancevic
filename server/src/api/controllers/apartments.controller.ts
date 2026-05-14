import type { Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { inquirySchema } from "../../validation/inquiry";
import {
  getAvailability,
  searchApartments,
  createInquiry as createInquiryService,
} from "../../services/apartmentService";
import { storage } from "../../storage";
import {
  sendOwnerNotification,
  sendCustomerConfirmation,
} from "../../services/emailService";

const searchSchema = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.coerce.number().int().min(1).max(20).default(1),
});

export async function getAllApartments(req: Request, res: Response) {
  const { checkIn, checkOut } = req.query;
  if (checkIn || checkOut) {
    const result = searchSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(422).json({ message: fromZodError(result.error).message });
    }
    const { checkIn: ci, checkOut: co, guests } = result.data;
    if (co <= ci) {
      return res.status(422).json({ message: "checkOut must be after checkIn" });
    }
    return res.json(await searchApartments(ci, co, guests));
  }
  res.json(await storage.getApartments());
}

export async function getApartmentById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const apt = await storage.getApartment(id);
  if (!apt) return res.status(404).json({ message: "Apartment not found" });
  res.json(apt);
}

export async function getAllBookings(_req: Request, res: Response) {
  const bookings = await storage.getBookings();
  res.json(bookings);
}

export async function getBookingsByApartment(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const bookings = await getAvailability(id);
  res.json(bookings);
}

export async function createInquiry(req: Request, res: Response) {
  const result = inquirySchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(422)
      .json({ message: fromZodError(result.error).message });
  }
  try {
    const inquiry = await createInquiryService(result.data);
    res.status(201).json(inquiry);

    const apartment = result.data.apartmentId
      ? await storage.getApartment(result.data.apartmentId)
      : undefined;
    sendOwnerNotification(result.data, apartment).catch(() => {});
    sendCustomerConfirmation(result.data, apartment).catch(() => {});
  } catch (e: any) {
    res.status(400).json({ message: e?.message || "Invalid payload" });
  }
}
