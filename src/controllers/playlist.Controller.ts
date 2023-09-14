import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'


export const createPlaylist = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { playlistName, playlistImage, track, genre } = req.body


    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const newPlaylist = await prisma.playlist.create({
            data: {
                playlistName,
                playlistImage,
                track: {
                    connect: track.map((trackId: string) => {
                        id: trackId
                    })
                },
                genre: {
                    connect: genre.map((genreId: string) => {
                        id: genreId
                    })
                },
                // playlistCreatedBy: {
                //     connect: {
                //         id: userId,
                //     }
                // },
                // playlistLikedBy: {
                //     connect: {
                //         id: userId,
                //     }
                // }
            }
        })

        res.status(201).send({message: 'playlist created successfully', newPlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({error: 'Internal server error' });
    }
};