import { Router } from "express";
import { getShowtimes } from "../controllers/showtimes.controller";

const router = Router();

router.get("/:id", getShowtimes);

export default router;