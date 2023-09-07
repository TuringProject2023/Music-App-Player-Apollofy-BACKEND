import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'


export const createPlaylist = async (req: Request, res: Response) => {
    const { playlistName, songs } = req.body
    const { userId } = req.params


    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const newPlaylist = await prisma.playlist.create({
            data: {
                playlistName,
                songs: {
                    connect: songs.map((songId: string) => ({ id: songId }))

                }
                ,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })

        res.status(201).send({ status: 'success', message: 'Movie created successfully', newPlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ status: 'error', error: 'Internal server error' });
    }
};