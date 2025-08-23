import type { Request, Response } from "express";
import { apartmentService } from "../../services/apartmentService";
import { getIcalBookings } from "../../services/apartmentService";
import { createInquiry as createInquiryService } from "../../services/apartmentService";

export async function getAllApartments(_req: Request, res: Response) {
  const apartments = await apartmentService.getAll();
  res.json(apartments);
}

export async function getApartmentById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const apt = await apartmentService.getById(id);
  if (!apt) return res.status(404).json({ message: "Apartment not found" });
  res.json(apt);
}

export async function getAllBookings(_req: Request, res: Response) {
  const bookings = await apartmentService.getAllBookings();
  res.json(bookings);
}

export async function getBookingsByApartment(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const bookings = await apartmentService.getBookingsByApartment(id);
  res.json(bookings);
}

export async function getIcalBookingsByApartment(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const data = await getIcalBookings(id);
  res.json(data);
}

export async function createInquiry(req: Request, res: Response) {
  try {
    const inquiry = await createInquiryService(req.body);
    res.status(201).json(inquiry);
  } catch (e: any) {
    res.status(400).json({ message: e?.message || "Invalid payload" });
  }
}
