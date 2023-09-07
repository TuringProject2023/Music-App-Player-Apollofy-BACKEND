import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'


export const createUser = async (req: Request, res: Response) => {

    const { email, name} = req.body

    try {
       // Check if all required fields are provided
       if (!name || !email) {
        return res.status(400).send({ status: 'error', error: 'Name and email are required fields.' });
    }

        // Check if the email already exists in the database
        const emailExist = await prisma.user.findUnique({ where: { email: email  },
        include: {
            playlist: {
                select: {
                    playlistName: true,
                    songs: {
                        select: {
                            name: true,
                            url: true
                        }
                    },

                }
            }
        } })

        if(!emailExist) {
            // if the user does not exist in the database, create a new user
            const newUser = await prisma.user.create({data: {  name: name, email: email},
                include: {playlist: {
                    select: {
                        playlistName: true,
                        songs: {
                            select: {
                                name: true,
                                url: true
                            }
                        }
                    }
                    }
                }})
                return res.status(201).send({message: "User created successfully!", user: newUser });
        } else {
             // If the email already exists, return the data of the existing user
             return res.status(200).send({ status: 'success', message: 'User already exists.', user: emailExist });
        }


    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
     return res.status(500).send({ error: 'Internal server error' });
    }
};
