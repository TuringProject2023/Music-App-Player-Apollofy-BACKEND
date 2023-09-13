import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";


export const getCounterTrackById = async (req: Request, res: Response) => {

    try {

        const getTopCounterTrack = await prisma.counterTrack.findMany({

            orderBy: {
                countListened: 'desc',
            },
            take: 10,
            include: {
                track: true,
            },
        });

        return getTopCounterTrack;

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
};