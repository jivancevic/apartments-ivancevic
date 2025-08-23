import { Router } from "express";
import apartmentsRouter from "./apartments.routes";
import visitRouter from "./visit.routes";

const router = Router();

router.use("/apartments", apartmentsRouter);
router.use("/locations", visitRouter);
router.get("/pricing-data", async (_req, res) => {
  const { getPricingData } = await import("../../services/pricingService");
  const data = await getPricingData();
  res.json(data);
});

export default router;
