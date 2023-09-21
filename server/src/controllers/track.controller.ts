import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";
import { deleteImage, uploadImage, uploadAudio } from "../utils/cloudinary";
import fs from "fs-extra";


export const createTrack = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const { trackName, trackCreatedAt, genreId, artistId, albumId } = req.body;


  try {

    if (!req.files?.trackImage) {
      return res.status(400).json({ error: "Image is missing" });
    }
    if (!req.files?.trackUrl) {
      return res.status(400).json({ error: "audio is missing" });
    }
    const imageVerefication = req.files?.trackImage;
    const audioFile = req.files?.trackUrl;

    if ("tempFilePath" in imageVerefication) {
      const imageUpload = await uploadImage(imageVerefication.tempFilePath);
      await fs.unlink(imageVerefication.tempFilePath);

      if ("tempFilePath" in audioFile) {
        const audioUpload = await uploadAudio(audioFile.tempFilePath);
        await fs.unlink(audioFile.tempFilePath);

        const newTrack = await prisma.track.create({
          data: {
            trackName,
            trackUrl: audioUpload.secure_url,
            trackImage: imageUpload.secure_url,
            trackCreatedAt,
            genre: genreId ? { connect: { id: genreId } } : undefined,
            artist: artistId ? { connect: { id: artistId } } : undefined,
            album: albumId ? { connect: { id: albumId } } : undefined,
            // post: post ?? null,
            // counter: counter ?? null
            // user: { connect: { id: userId } },
          },
        });

        const newTrackId = newTrack.id;

        const newTrackLiked = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            tracksId: {
              push: newTrackId,
            },
          },
        });
        return res.status(201).send({ message: "Track created successfully", newTrack });
      }
    }
    return res.status(404).send({ message: "File not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getTrackById = async (req: Request, res: Response): Promise<Response> => {
  const { trackId } = req.params;

  try {
    const getTrack = await prisma.track.findUnique({
      where: {
        id: trackId,
      },
      include:{
        artist: true,
        genre: true,
        album: true

      }
    });

    return res.status(200).send({ message: "Track gotten successfully", getTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};


export const getAllTracks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const allTrack = await prisma.track.findMany({
      include: {
        artist: true,
        genre: {
          select: {
            genreName: true
          }
        }
      }
    });

    return res.status(200).send(allTrack);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateTrackById = async (req: Request, res: Response): Promise<Response> => {
  const { trackId } = req.params;
  const { trackName, genreId, artistId, albumId } = req.body;

  try {
    if (!req.files?.trackImage) {
      return res.status(400).json({ error: "Image is missing" });
    }
    const imageVerefication = req.files?.trackImage;
    const audioFile = req.files?.trackUrl;

    if ("tempFilePath" in imageVerefication) {
      const imageUpload = await uploadImage(imageVerefication.tempFilePath);
      await fs.unlink(imageVerefication.tempFilePath);

      if ("tempFilePath" in audioFile) {
        const audioUpload = await uploadImage(audioFile.tempFilePath);
        await fs.unlink(audioFile.tempFilePath);
        const updateTrack = await prisma.track.update({
          where: {
            id: trackId,
          },
          data: {
            trackName,
            trackUrl: audioUpload.secure_url,
            trackImage: imageUpload.secure_url,
            genre: {
              connect: { id: genreId },
            },
            artist: {
              connect: { id: artistId },
            },
            album: {
              connect: { id: albumId },
            },
          },
        });

        return res.status(200).send({ message: "Track updated successfully", updateTrack });
      }
    }
    return res.status(404).send({ message: "File not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const toggleTrackById = async (req: Request, res: Response): Promise<Response> => {
  const { trackId, userId } = req.params;

  try {
    const userToUpdate = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    let arrayTracksUser = userToUpdate?.tracksId || [];
    const index = arrayTracksUser.indexOf(trackId);

    if (index === -1) {
      arrayTracksUser.push(trackId);
    } else {
      arrayTracksUser.splice(index, 1);
    }

    const newTrackLiked = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tracksId: arrayTracksUser,
      },
    });

    return res.status(200).send({ message: "Tracks liked modified successfully", newTrackLiked });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteTrackById = async (req: Request, res: Response): Promise<Response> => {
  const { trackId } = req.params;

  try {
    //Find Track by id
    const track = await prisma.track.findUnique({
      where: { id: trackId }
    });

    if (!track) {
      return res.status(404).send({ status: "Error", msg: "track not found" });
    } else {
      await deleteImage(track.trackImage)

    }

    const deleteTrack = await prisma.track.delete({
      where: {
        id: trackId,
      },
    });

    return res.status(200).send({ message: "Track deleted successfully", deleteTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Crear 4 canciones para probar
// crear playlist vacia
// añadir canciones a playlist pasandole 3 canciones
// crear una segunda playlist pasandole otras 3 canciones
// Tener una cancion en dos playlist diferentes
// Y tener una playlist con canciones en comun con otra playlist.
