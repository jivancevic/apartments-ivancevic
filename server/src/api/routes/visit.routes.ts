import { Router } from "express";
import * as ctrl from "../controllers/visit.controller";

const router = Router();

router.get("/", ctrl.getLocations);

export default router;
