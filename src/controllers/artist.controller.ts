import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";

export const createArtist = async (req: Request, res: Response) => {
  const { artistName, popularity } = req.body;
  console.log(req.body);
  try {
    if (!artistName) {
      return res.status(400).send({
        status: "error",
        error: "ArtistName, Popularity are required fields.",
      });
    }

    // Check if the artist already exists in the database
    const artistExist = await prisma.artist.findMany({
      where: { artistName: artistName },
    });

    console.log(artistExist);
    if (artistExist.length === 0) {
      // if the Artist does not exist in the database, create a new Artist
      const newArtist = await prisma.artist.create({
        data: { artistName, popularity },
        include: {
          album: true,
          genre: true,
          track: true,
        },
      });
      return res
        .status(201)
        .send({ message: "Artist created successfully!", Artist: newArtist });
    } else {
      // If the artist already exists, return the data of the existing Artist
      return res.status(200).send({
        status: "success",
        message: "Artist already exists.",
        Artist: artistExist,
      });
    }
  } catch (err) {
    console.error(err); // Log the error to the console for debugging purposes
    // In case of internal error, return an error message with status code 500
    return res.status(500).send({ error: err });
  }
};

export const getArtistById = async (req: Request, res: Response) => {
  const { artistId } = req.params;

  try {
    const ArtistById = await prisma.artist.findUnique({
      where: { id: artistId },
      include: {},
    });

    return res
      .status(200)
      .send({ message: "Artist gotten successfully!", Artist: ArtistById });
  } catch (err) {
    console.error(err); // Log the error to the console for debugging purposes
    // In case of internal error, return an error message with status code 500
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const allArtists = await prisma.artist.findMany({
      include: {},
    });

    return res
      .status(200)
      .send({ message: "Artist created successfully!", Artist: allArtists });
  } catch (err) {
    console.error(err); // Log the error to the console for debugging purposes
    // In case of internal error, return an error message with status code 500
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateArtistById = async (req: Request, res: Response) => {
  const { artistId } = req.params;
  const { artistName, popularity } = req.body;

  try {
    const updateArtist = await prisma.artist.update({
      where: { id: artistId },
      data: { artistName, popularity },
    });

    return res
      .status(200)
      .send({ message: "Artist updated successfully!", Artist: updateArtist });
  } catch (err) {
    console.error(err); // Log the error to the console for debugging purposes
    // In case of internal error, return an error message with status code 500
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteArtistById = async (req: Request, res: Response) => {
  const { ArtistId } = req.params;

  try {
    const deleteArtist = await prisma.artist.delete({
      where: { id: ArtistId },
    });

    return res
      .status(201)
      .send({ message: "Artist deleted successfully!", Artist: deleteArtist });
  } catch (err) {
    console.error(err); // Log the error to the console for debugging purposes
    // In case of internal error, return an error message with status code 500
    return res.status(500).send({ error: "Internal server error" });
  }
};
