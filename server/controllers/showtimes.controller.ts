import {Request, Response} from "express";
import { prisma } from "../lib/prisma";
    
export const getShowtimes = async (req: Request, res: Response) => {
  try{
    const tmdbId = parseInt(req.params.id ?? '0');
    const showtimes = await prisma.showtime.findMany({
      where: { tmdbId },
      include: {
        hall: true,
      }
    });

    res.json(showtimes);
  } catch(e){
    console.error(e);
    res.status(500).json({ error: "Failed to fetch showtimes" })
  }
}