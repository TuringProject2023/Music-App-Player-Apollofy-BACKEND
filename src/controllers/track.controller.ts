import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";


export const createTrack = async (req: Request, res: Response): Promise <Response> => {
  const { trackName, trackUrl } = req.body;

  try {

    if(!trackName || !trackUrl) return res.status(400).send({error:"Missing Required Fields"});

    const newTrack = await prisma.track.create({
      data: {
        trackName,
        trackUrl,
      },
    });

    return res
      .status(201)
      .send({ message: "Song created successfully", newTrack });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};


export const getTrackById = async (req: Request, res: Response): Promise <Response> => {

  const { trackId } = req.params;

  try {

    
    const getTrack = await prisma.track.findUnique({

      where: {

        id: trackId
       
      },
    });

    return res.status(201).send({ message: "Song created successfully", getTrack });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getAllTracks = async (req: Request, res: Response): Promise <Response> => {


  try {

    
    const allTrack = await prisma.track.findMany({

     
    });

    return res.status(201).send({ message: "Song created successfully", allTrack });
    
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateTrackById = async (req: Request, res: Response): Promise <Response> => {

  const { trackId } = req.params;
  const {} = req.body

  try {

    
    const getTrack = await prisma.track.update({

      where: {

        id: trackId,
        
      },

      data: {}
    });

    return res.status(201).send({ message: "Song created successfully", getTrack });

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
