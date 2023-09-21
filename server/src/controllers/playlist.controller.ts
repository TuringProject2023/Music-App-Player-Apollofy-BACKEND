import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";
import { getUserByEmailFunction } from "./user.controller";

import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";


//Incoming data:
//body: playlistName-string ; playlistImage-string ; userId-string ; genreId-string("id1,id2,id3,id4")
export const createPlaylist = async (req: Request, res: Response): Promise<Response> => {
    const { userEmail } = req.params
    const userId = await getUserByEmailFunction(userEmail)
    const { playlistName } = req.body;
    let { trackId, genreId } = req.body;

    if (typeof trackId === "string") { trackId = Array.from(trackId.split(",")); }
    if (typeof genreId === "string") { genreId = Array.from(genreId.split(",")); }

    try {
        
        if (!req.files?.playlistImage) {
            return res.status(400).json({ error: "Image is missing" });
        }
        const imageVerefication = req.files?.playlistImage;
        if ("tempFilePath" in imageVerefication) {
            const upload = await uploadImage(imageVerefication.tempFilePath);
            await fs.unlink(imageVerefication.tempFilePath);
            const newPlaylist = await prisma.playlist.create({
                data: {
                    playlistName,
                    playlistImage: upload.secure_url,
                    trackId: trackId,
                    genreId: genreId,
                    playlistCreatedById: userId,
                    
                },
            });

            const newPlaylistId = newPlaylist.id;

            if (newPlaylistId) {
                const newPlaylistLiked = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        playlistLikedId: {
                            push: newPlaylistId,
                        },
                    },
                });
                return res.status(201).send({ newPlaylistLiked });
            }
            return res.status(201).send({ newPlaylist });
        }
        return res.status(404).send({ message: "File not found" });
    } catch (err) {
        console.error(err); 
        return res.status(500).send({ err, error: "Internal server error" });
    }
};

export const getPlaylistById = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId } = req.params;

    try {
        const gottenPlaylist = await prisma.playlist.findUnique({
            where: {
                id: playlistId,
            },
            include: {
                track: true
            }
        });

        return res.status(200).send({ message: "playlist gotten successfully", gottenPlaylist });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const getAllPlaylist = async (req: Request, res: Response): Promise<Response> => {
    try {       
        const gottenAllPlaylist = await prisma.playlist.findMany({
            include: {
                track: true,
                genre: true
            }
        });

        return res.status(200).send(gottenAllPlaylist);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const updatePlaylist = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId } = req.params; 
    const { playlistName } = req.body;
    let { trackId, genreId } = req.body;

    if (typeof trackId === "string") {
        trackId = Array.from(trackId.split(","));
    }
    if (typeof genreId === "string") {
        genreId = Array.from(genreId.split(","));
    }

    try {
        const playlistById = await prisma.playlist.findUnique({
            where: {
                id: playlistId,
            },
        });
        if (!playlistById) {
            return res.status(404).json({ error: "Playlist not found." });
        }

        if (!req.files?.playlistImage) {
            return res.status(400).json({ error: "Image is missing" });
        }
        const imageVerefication = req.files?.playlistImage;
        if ("tempFilePath" in imageVerefication) {
            const upload = await uploadImage(imageVerefication.tempFilePath);
            await fs.unlink(imageVerefication.tempFilePath);
            const updatePlaylist = await prisma.playlist.update({
                where: {
                    id: playlistId,
                },
                data: {
                    playlistName,
                    playlistImage: upload.secure_url,
                    track: {
                        connect: trackId.map((trackId: string) => {
                            id: trackId;
                        }),
                    },
                    genre: {
                        connect: genreId.map((genreId: string) => {
                            id: genreId;
                        }),
                    },
                },
            });
            return res.status(200).send({ message: "Playlist updated successfully", updatePlaylist });
        }
        return res.status(404).send({ message: "File not found" });
    } catch (err) {
        console.error(err); 
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const togglePlaylistById = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId, userId } = req.params;

    try {
        const userToUpdate = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        let arrayPlaylistLikedUser = userToUpdate?.tracksId || [];
        const index = arrayPlaylistLikedUser.indexOf(playlistId);

        if (index === -1) {
            arrayPlaylistLikedUser.push(playlistId);
        } else {
            arrayPlaylistLikedUser.splice(index, 1);
        }

        const newPlaylistLiked = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                playlistLikedId: arrayPlaylistLikedUser,
            },
        });

        return res.status(200).send({ message: "Playlist liked modified successfully", newPlaylistLiked });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const deletePlaylistById = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId } = req.params;

    try {
        if (!playlistId) {
            return res.status(404).json({ error: "Missing requiered playlistId." });
        }
        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id: playlistId,
            },
        });

        return res.status(200).send({ message: "Playlist deleted successfully", deletedPlaylist });
    } catch (err) {
        console.error(err); 
        return res.status(500).send({ error: "Internal server error" });
    }
};
