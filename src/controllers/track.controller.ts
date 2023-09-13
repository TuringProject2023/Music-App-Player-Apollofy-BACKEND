import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";

export const createTrack = async (req: Request, res: Response): Promise<Response> => {
  const {
    trackName,
    trackUrl,
    trackImage,
    // trackCreatedAt,
    genreId,
    artistId,
    albumId,
  } = req.body;

  console.log(req.body);
  try {

    if (!trackName || !trackUrl)
      return res.status(400).send({ error: "Missing Required Fields" });

    const newTrack = await prisma.track.create({
      data: {
        trackName,
        trackUrl,
        trackImage,
        // trackCreatedAt,
        genre: genreId ?
          { connect: { id: genreId } }
          : undefined,
        artist: artistId ?
          { connect: { id: artistId } }
          : undefined,
        album: albumId ?
          { connect: { id: albumId } }
          : undefined
      },
    });

    return res
      .status(201)
      .send({ message: "Track created successfully", newTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getTrackById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { trackId } = req.params;

  try {
    const getTrack = await prisma.track.findUnique({
      where: {
        id: trackId,
      },
    });

    return res
      .status(200)
      .send({ message: "Track getted successfully", getTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

//TOFIX getTrackByAlbumId

export const getAllTracks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allTrack = await prisma.track.findMany({});

    return res
      .status(200)
      .send({ message: "Track getted successfully", allTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateTrackById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { trackId } = req.params;
  const { trackName, trackUrl, trackImage, genreId, artistId, albumId } =
    req.body;

  try {
    const updateTrack = await prisma.track.update({
      where: {
        id: trackId,
      },
      data: {
        trackName,
        trackUrl,
        trackImage,
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

    return res
      .status(200)
      .send({ message: "Track updated successfully", updateTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteTrackById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { trackId } = req.params;

  try {
    const deleteTrack = await prisma.track.delete({
      where: {
        id: trackId,
      },
    });

    return res
      .status(200)
      .send({ message: "Track deleted successfully", deleteTrack });
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
