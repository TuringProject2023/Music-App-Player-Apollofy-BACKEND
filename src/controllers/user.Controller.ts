// import { Request, Response } from 'express'
// import { prisma } from '../db/clientPrisma'


// export const createUser = async (req: Request, res: Response) => {

//     const { email, name, playlist } = req.body

//     try {
//         if (!email) {
//             return res.status(400).json({ error: 'Missing requiered input email.' })
//         }
//         const newUser = await prisma.user.create({
//             data: {
//                 email: email,
//                 name: name,
//             }
//         })

//         return res.status(201).json(newUser);

//     } catch (error) {
//         return res.status(500).json(error); //TOFIX
//     }
// }
