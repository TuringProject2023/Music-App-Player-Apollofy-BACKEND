import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";


export const addOneToCounterTrackById = async (req: Request, res: Response) => {

    const { trackId } = req.params

    try {
        const counterTrack = await prisma.counterTrack.findUnique({
            where: {
                trackId: trackId,
            }
        });
        if (counterTrack) {
            await prisma.counterTrack.update({
                where: {
                    id: counterTrack.id,
                },
                data: {
                    trackId: trackId,
                    countListened: counterTrack.countListened + 1,
                }
            })
        } else {
            await prisma.counterTrack.create({
                data: {
                    trackId: trackId,
                    countListened: 1,
                }
            })
        }

        return res.status(200).send({ message: "Track counter updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }


}


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