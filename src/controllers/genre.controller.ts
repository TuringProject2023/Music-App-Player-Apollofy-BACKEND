import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";
import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";

export const createGenre = async (req: Request, res: Response) => {
  const { genreName } = req.body;

  try {
    if (!req.files?.genreImage) {
      return res.status(400).json({ error: "Image is missing" });
    }
    const imageVerefication = req.files?.genreImage;
    if ("tempFilePath" in imageVerefication) {
      const upload = await  uploadImage(imageVerefication.tempFilePath);
      await fs.unlink(imageVerefication.tempFilePath);
      const newGenre = await prisma.genre.create({
        data: { genreName, genreImage: upload.secure_url },
      });
      res.status(201).send(newGenre);
    }
    return res.status(404).send({ message: "File not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const allGenres = await prisma.genre.findMany();
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getGenreByID = async (req: Request, res: Response) => {
  const { genreId } = req.params;
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id: genreId,
      },
    });
    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateGenreByID = async (req: Request, res: Response): Promise<Response> => {
  const { genreId } = req.params;
  const { genreName } = req.body;
  try {
    if (!genreName) {
      return res.status(404).send({ msg: "Genres not found" });
    }
    if (!req.files?.genreImage) {
      return res.status(400).json({ error: "Image is missing" });
    }
    const imageVerefication = req.files?.genreImage;
    if ("tempFilePath" in imageVerefication) {
      const upload = await uploadImage(imageVerefication.tempFilePath);
      await fs.unlink(imageVerefication.tempFilePath);
      const genreFound = await prisma.genre.update({
        where: {
          id: genreId,
        },
        data: { genreName, genreImage: upload.secure_url },
      });

      return res.status(200).send(genreFound);
    }
    return res.status(404).send({ message: "File not found" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteGenreByID = async (req: Request, res: Response): Promise<Response> => {
  const { genreId } = req.params;
  try {
    const deleteGenre = await prisma.genre.delete({
      where: { id: genreId },
    });

    return res.status(200).send({ msg: "Genre deleted successfully", deleteGenre });
  } catch (error) {
    return res.status(500).send(error);
  }
};
