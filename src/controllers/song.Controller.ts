import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'


export const createSong = async (req: Request, res: Response) => {

    const { name, url } = req.body

    try {
        const newSong = await prisma.song.create({
            data: { name, url }
        })

        return res.status(201).send({ status: 'success', message: 'Genre created successfully', newSong });

    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ status: 'error', error: 'Internal server error' });
    }
};

// Crear 4 canciones para probar
// crear playlist vacia
// añadir canciones a playlist pasandole 3 canciones
// crear una segunda playlist pasandole otras 3 canciones
// Tener una cancion en dos playlist diferentes
// Y tener una playlist con canciones en comun con otra playlist.