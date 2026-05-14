import { Router } from "express";
import apartmentsRouter from "./apartments.routes";
import visitRouter from "./visit.routes";
import pricingRouter from "./pricing.routes";

const router = Router();

router.use("/apartments", apartmentsRouter);
router.use("/locations", visitRouter);
router.use("/pricing", pricingRouter);

export default router;
