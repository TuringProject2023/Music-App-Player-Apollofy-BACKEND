import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";
import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";

export const createArtist = async (req: Request, res: Response) => {
  const { artistName, popularity } = req.body;

  let { genreId } = req.body;
  // Convert popularity to an integer
  const popularityAsInt = parseInt(popularity, 10);

  if (typeof genreId === "string") {
    genreId = Array.from(genreId.split(","));
  }

  try {
    if (!artistName) {
      return res.status(400).send({
        status: "error",
        error: "ArtistName, Popularity are required fields.",
      });
    }

    // Check if the conversion was successful
    if (isNaN(popularityAsInt)) {
      return res.status(400).json({ error: "Invalid popularity value. Must be a number." });
    }

    // Check if the artist already exists in the database
    const artistExist = await prisma.artist.findMany({
      where: { artistName: artistName },
    });

    if (artistExist.length === 0) {
      // if the Artist does not exist in the database, create a new Artist
      if (!req.files?.artistImage) {
        return res.status(400).json({ error: "Image is missing" });
      }
      const imageVerefication = req.files?.artistImage;
      if ("tempFilePath" in imageVerefication) {
        const upload = await uploadImage(imageVerefication.tempFilePath);
        await fs.unlink(imageVerefication.tempFilePath);
        const newArtist = await prisma.artist.create({
          data: { artistName, popularity: popularityAsInt, artistImage: upload.secure_url, genreId: genreId },
          include: {
            album: true,
            genre: true,
            track: true,
          },
        });
        return res.status(201).send({ message: "Artist created successfully!", Artist: newArtist });
      } else {
        // If the artist already exists, return the data of the existing Artist
        return res.status(200).send({
          status: "success",
          message: "Artist already exists.",
          Artist: artistExist,
        });
      }
    }
  } catch (err) {
    console.error(err);
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

    return res.status(200).send({ message: "Artist gotten successfully!", Artist: ArtistById });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const allArtists = await prisma.artist.findMany();

    return res.status(200).send(allArtists);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateArtistById = async (req: Request, res: Response) => {
  const { artistId } = req.params;
  const { artistName, popularity } = req.body;

  try {
    if (!req.files?.artistImage) {
      return res.status(400).json({ error: "Image is missing" });
    }
    const imageVerefication = req.files?.artistImage;
    if ("tempFilePath" in imageVerefication) {
      const upload = await uploadImage(imageVerefication.tempFilePath);
      await fs.unlink(imageVerefication.tempFilePath);
      const updateArtist = await prisma.artist.update({
        where: { id: artistId },
        data: { artistName, popularity, artistImage: upload.secure_url },
      });

      return res.status(200).send({ message: "Artist updated successfully!", Artist: updateArtist });
    }
    return res.status(404).send({ message: "File not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteArtistById = async (req: Request, res: Response) => {
  const { ArtistId } = req.params;

  try {
    const deleteArtist = await prisma.artist.delete({
      where: { id: ArtistId },
    });

    return res.status(201).send({ message: "Artist deleted successfully!", Artist: deleteArtist });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
