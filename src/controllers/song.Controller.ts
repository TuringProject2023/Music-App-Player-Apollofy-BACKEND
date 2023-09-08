import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";

export const createSong = async (req: Request, res: Response) => {
  const { name, url } = req.body;

  try {
    const newSong = await prisma.song.create({
      data: {
        name,
        url,
      },
    });

    return res
      .status(201)
      .send({ message: "Song created successfully", newSong });
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
