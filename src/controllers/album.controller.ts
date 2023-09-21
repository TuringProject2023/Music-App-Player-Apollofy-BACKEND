import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'
import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";


export const createAlbum = async (req: Request, res: Response): Promise<Response> => {
    const { albumName, albumCreatedAt } = req.body
    let { trackId, genreId,artistId } = req.body

    if (typeof trackId === "string") { trackId = Array.from(trackId.split(",")); }
    if (typeof genreId === "string") { genreId = Array.from(genreId.split(",")); }
    if (typeof artistId === "string") { artistId = Array.from(artistId.split(",")); }

    try {
        if (!req.files?.albumImage) {
            return res.status(400).json({ error: "Image is missing" });
          }
        const imageVerefication = req.files?.albumImage;

        if ("tempFilePath" in imageVerefication) {
            const upload = await uploadImage(imageVerefication.tempFilePath);
            await fs.unlink(imageVerefication.tempFilePath);
            const newAlbum = await prisma.album.create({
                data: {
                    albumName,
                    albumImage: upload.secure_url,
                    albumCreatedAt,
                    trackId: trackId,
                    genreId: genreId,
                    artistId: artistId,
                    
                }
            })
            
            return res.status(201).send(newAlbum);
        }
        return res.status(404).send({ message: 'tempFilePath property not found' });
    } catch (err) {
        console.error(err); 
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const { albumId } = req.params

    try {
        
        const gottenAlbum = await prisma.album.findUnique({
            where: {
                id: albumId
            },
            include: {
                track: true,
                artist: true,
                genre: true
            }
        })

        return res.status(200).send({ message: 'Album gotten successfully', gottenAlbum });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const updateAlbum = async (req: Request, res: Response): Promise<Response> => {
    const { albumId } = req.params //TOFIX posibilidad de modificar solo el creador del album
    const { albumName, albumCreatedAt } = req.body
    let { trackId, genreId } = req.body

    if (typeof trackId === "string") { trackId = Array.from(trackId.split(",")); }
    if (typeof genreId === "string") { genreId = Array.from(genreId.split(",")); }

    try {
        const albumById = await prisma.album.findUnique({
            where: {
                id: albumId
            }
        })
        if (!albumById) {
            return res.status(404).json({ error: 'Album not found.' })
        }
        if (!req.files?.albumImage) {
            return res.status(404).json({ error: "Image is missing" });
        }
        const imageVerefication = req.files?.albumImage;
        if ("tempFilePath" in imageVerefication) {
            const upload = await uploadImage(imageVerefication.tempFilePath);
            await fs.unlink(imageVerefication.tempFilePath);
            const updateAlbum = await prisma.album.update({
                where: {
                    id: albumId
                },
                data: {
                    albumName,
                    albumImage: upload.secure_url,
                    trackId: trackId,
                    genreId: genreId
                },
            }
            )

            return res.status(200).send({ message: 'Album updated successfully', updateAlbum });
        }
        return res.status(404).send({ message: 'tempFilePath property not found' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const toggleAlbumById = async (req: Request, res: Response): Promise<Response> => {
    const { albumId, userId } = req.params;

    try {
        const userToUpdate = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });

        let arrayAlbumsUser = userToUpdate?.tracksId || [];
        const index = arrayAlbumsUser.indexOf(albumId);

        if (index === -1) {
            arrayAlbumsUser.push(albumId);
        } else {
            arrayAlbumsUser.splice(index, 1);
        }

        const newAlbumLiked = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                tracksId: arrayAlbumsUser
            }
        })

        return res
            .status(200)
            .send({ message: "Tracks liked modified successfully", newAlbumLiked });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
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
        console.error(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getAllAlbum = async (req: Request, res: Response): Promise<Response> => {

    try {

        const gottenAllAlbum = await prisma.album.findMany({
            include:{
                track: true,
                artist: true,
                genre: true
            }})

        return res.status(200).send(gottenAllAlbum);

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
};