import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import {
  calculateStayPrice,
  getStayLimits,
  getSeasonalPrices,
} from "../../services/pricingService";
import { storage } from "../../storage";

const router = Router();

const calculateSchema = z.object({
  apartmentId: z.number().int().positive(),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
});

router.post("/calculate", async (req: Request, res: Response) => {
  const result = calculateSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(422)
      .json({ message: fromZodError(result.error).message });
  }
  const { apartmentId, checkIn, checkOut } = result.data;
  const apartment = await storage.getApartment(apartmentId);
  if (!apartment)
    return res.status(404).json({ message: "Apartment not found" });

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  if (
    isNaN(checkInDate.getTime()) ||
    isNaN(checkOutDate.getTime()) ||
    checkOutDate <= checkInDate
  ) {
    return res.status(422).json({ message: "Invalid date range" });
  }

  const summary = calculateStayPrice(apartment.id, checkInDate, checkOutDate);
  res.json(summary);
});

router.get("/limits/:apartmentId", async (req: Request, res: Response) => {
  const id = parseInt(req.params.apartmentId);
  const checkIn = req.query.checkIn as string | undefined;
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const apartment = await storage.getApartment(id);
  if (!apartment)
    return res.status(404).json({ message: "Apartment not found" });

  const date = checkIn ? new Date(checkIn) : new Date();
  const limits = getStayLimits(apartment.id, date);
  res.json(limits);
});

router.get("/seasonal/:apartmentId", async (req: Request, res: Response) => {
  const id = parseInt(req.params.apartmentId);
  if (isNaN(id))
    return res.status(400).json({ message: "Invalid apartment ID" });
  const apartment = await storage.getApartment(id);
  if (!apartment)
    return res.status(404).json({ message: "Apartment not found" });

  const prices = getSeasonalPrices(apartment.id);
  res.json(prices);
});

export default router;
