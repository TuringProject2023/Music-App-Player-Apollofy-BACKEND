import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";



//Incoming data:
//body: playlistName-string ; playlistImage-string ; userId-string ; genreId-string("id1,id2,id3,id4")
export const createPlaylist = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params
    const { playlistName, playlistImage } = req.body;
    let { trackId, genreId } = req.body;

    if (typeof trackId === 'string') { trackId = Array.from(trackId.split(',')) }
    if (typeof genreId === 'string') { genreId = Array.from(genreId.split(',')) }

    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const newPlaylist = await prisma.playlist.create({
            data: {
                playlistName,
                playlistImage,
                trackId: trackId,
                genreId: genreId,//TOFIX ojo al tipo de dato, está pasado como string?
                playlistCreatedById: userId,
                // playlistLikedById: [userId],
            }
        });

        const newPlaylistId = newPlaylist.id

        const newPlaylistLiked = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                playlistLikedId: {
                    push: newPlaylistId
                }
            }
        })

        return res.status(201).send({ message: 'playlist created successfully', newPlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getPlaylistById = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId } = req.params;

    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const gottenPlaylist = await prisma.playlist.findUnique({
            where: {
                id: playlistId,

            }
        })

        return res.status(200).send({ message: 'playlist gotten successfully', gottenPlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getAllPlaylist = async (req: Request, res: Response): Promise<Response> => {

    try {
        // if () {
        //     return res.status(400).json({ error: 'Missing requiered input email.' })
        // }
        const gottenAllPlaylist = await prisma.playlist.findMany({})

        return res.status(200).send({ message: 'All playlists gotten successfully', gottenAllPlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const updatePlaylist = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId } = req.params; //TOFIX posibilidad de modificar solo el creador de la playlist
    const { playlistName, playlistImage, track, genre } = req.body;

    try {
        const playlistById = await prisma.playlist.findUnique({
            where: {
                id: playlistId
            }
        })
        if (!playlistById) {
            return res.status(404).json({ error: 'Playlist not found.' })
        }
        const updatePlaylist = await prisma.playlist.update({
            where: {
                id: playlistId
            },
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
                }
            },
        }
        )

        return res.status(200).send({ message: 'Playlist updated successfully', updatePlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const togglePlaylistById = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId, userId } = req.params;

    try {
        const userToUpdate = await prisma.user.findUnique({
            where: {
                id: userId,
            }
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
                id: userId
            },
            data: {
                playlistLikedId: arrayPlaylistLikedUser
            }
        })

        return res
            .status(200)
            .send({ message: "Playlist liked modified successfully", newPlaylistLiked });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
};


export const deletePlaylistById = async (req: Request, res: Response): Promise<Response> => {
    const { playlistId } = req.params;

    try {
        if (!playlistId) {
            return res.status(404).json({ error: 'Missing requiered playlistId.' })
        }
        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id: playlistId,
            }
        })

        return res.status(200).send({ message: 'Playlist deleted successfully', deletedPlaylist });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};
