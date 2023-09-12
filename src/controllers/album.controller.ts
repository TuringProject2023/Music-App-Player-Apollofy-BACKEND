import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'


export const createAlbum = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params
    const { albumName, albumImage, track, genre, albumCreatedAt } = req.body


    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const newAlbum = await prisma.album.create({
            data: {
                albumName,
                albumImage,
                albumCreatedAt,
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
                // AlbumLikedBy: {
                //     connect: {
                //         id: userId,
                //     }
                // }
            }
        })

       return res.status(201).send({ message: 'Album created successfully', newAlbum });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const { albumId } = req.params


    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const gettedAlbum = await prisma.album.findUnique({
            where: {
                id: albumId,

            }
        })

       return res.status(200).send({ message: 'Album getted successfully', gettedAlbum });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const updateAlbum = async (req: Request, res: Response): Promise<Response> => {
    const { albumId } = req.params //TOFIX posibilidad de modificar solo el creador de la album
    const { albumName, albumImage, track, genre } = req.body


    try {
        const albumById = await prisma.album.findUnique({
            where: {
                id: albumId
            }
        })
        if (!albumById) {
            return res.status(404).json({ error: 'Album not found.' })
        }
        const updateAlbum = await prisma.album.update({
            where: {
                id: albumId
            },
            data: {
                albumName,
                albumImage,
                track: {
                    connect: track.map((trackId: string) => {
                        id: trackId
                    })
                },
                genre: {
                    connect: genre.map((genreId: string) => {
                        id: genreId
                    })
                }
            },
        }
        )

       return res.status(200).send({ message: 'Album updated successfully', updateAlbum });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const deleteAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const { AlbumId } = req.params


    try {
        if (!AlbumId) {
            return res.status(404).json({ error: 'Missing requiered AlbumId.' })
        }
        const deletedAlbum = await prisma.album.delete({
            where: {
                id: AlbumId,
            }
        })

       return res.status(200).send({ message: 'Album deleted successfully', deletedAlbum });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getAllAlbum = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const gettedAllAlbum = await prisma.album.findMany({})

       return res.status(200).send({ message: 'All Albums getted successfully', gettedAllAlbum });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};