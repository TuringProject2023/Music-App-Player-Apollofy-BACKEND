// import { Request, Response } from 'express'
// import { prisma } from '../db/clientPrisma'


// export const createSong = async (req: Request, res: Response) => {

//     const { userId } = req.params

//     const { name, url, playlistId } = req.body

//     try {
//         // if () {
//         //     return res.status(400).json({ error: 'Missing requiered input email.' })
//         // }
//         const newSong = await prisma.song.create({
//             data: {
//                 name,
//                 url,
//                 playlist: {
//                     connect: {
//                         id: playlistId
//                     }
//                 }
//             },
//         })

//         return res.status(201).send(newSong);

//     } catch (error) {
//         return res.status(500).json(error); //TOFIX
//     }
// }

// Crear 4 canciones para probar
// crear playlist vacia
// añadir canciones a playlist pasandole 3 canciones
// crear una segunda playlist pasandole otras 3 canciones
// Tener una cancion en dos playlist diferentes
// Y tener una playlist con canciones en comun con otra playlist.