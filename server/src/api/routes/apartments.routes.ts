import { Router } from "express";
import * as ctrl from "../controllers/apartments.controller";

const router = Router();

router.get("/", ctrl.getAllApartments);
router.get("/:id", ctrl.getApartmentById);
router.get("/:id/bookings", ctrl.getBookingsByApartment);
router.get("/:id/ical-bookings", ctrl.getIcalBookingsByApartment);
router.get("/all-bookings", ctrl.getAllBookings);
router.post("/inquiries", ctrl.createInquiry);

export default router;
