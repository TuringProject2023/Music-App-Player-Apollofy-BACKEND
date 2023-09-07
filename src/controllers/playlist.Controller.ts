// import { Request, Response } from 'express'
// import { prisma } from '../db/clientPrisma'


// export const createPlaylist = async (req: Request, res: Response) => {

//     const { userId } = req.params

//     const { playlistName, playlistSongs } = req.body

//     try {
//         // if () {
//         //     return res.status(400).json({ error: 'Missing requiered input email.' })
//         // }
//         const newPlaylist = await prisma.playlist.create({
//             data: {
//                 playlistName,
//                 songs: {
//                     connect: {
//                         id:
//                     }
//                 }

//                 ,
//                 user: {
//                     connect: {
//                         id: userId,
//                     }
//                 }
//             }
//         })

//         return res.status(201).send(newPlaylist);

//     } catch (error) {
//         return res.status(500).json(error); //TOFIX
//     }
// }
