import type { Request, Response } from "express";
import { visitService } from "../../services/visitService";

export async function getLocations(req: Request, res: Response) {
  const type = req.query.type as string | undefined;
  const category = req.query.category as string | undefined;
  const data = await visitService.getLocations({ type, category });
  res.json(data);
}
