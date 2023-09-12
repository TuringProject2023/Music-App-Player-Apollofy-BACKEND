import { Request, Response } from 'express'
import { prisma } from '../db/clientPrisma'


export const createUser = async (req: Request, res: Response) => {

    const { email, name, userAvatar } = req.body

    try {
        // Check if all required fields are provided
        if (!name || !email) {
            return res.status(400).send({ status: 'error', error: 'Name and email are required fields.' });
        }

        // Check if the email already exists in the database
        const emailExist = await prisma.user.findUnique({
            where: { userEmail: email },
            include: {
                playlistCreated: {
                    select: {
                        playlistName: true,
                        track: {
                            select: {
                                trackName: true,
                                trackUrl: true
                            }
                        },

                    }
                }
            }
        })

        if (!emailExist) {
            // if the user does not exist in the database, create a new user
            const newUser = await prisma.user.create({
                data: { userName: name, userEmail: email, userImage: userAvatar },
                include: {
                    playlistCreated: {
                        select: {
                            playlistName: true,
                            track: {
                                select: {
                                    trackName: true,
                                    trackUrl: true
                                }
                            }
                        }
                    }
                }
            })
            return res.status(201).send({ message: "User created successfully!", user: newUser });
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

export const getUserById = async (req: Request, res: Response) => {

    const { userId } = req.params

    try {


        const userById = await prisma.user.findUnique({
            where: { userEmail: userId },
            include: {

            }
        })

        return res.status(201).send({ message: "User created successfully!", user: userById });



    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const getAllUsers = async (req: Request, res: Response) => {


    try {


        const allUsers = await prisma.user.findMany({
            include: {

            }
        })

        return res.status(201).send({ message: "User created successfully!", user: allUsers });



    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};

export const updateUserById = async (req: Request, res: Response) => {

    const { userId } = req.params
    const { userName, userEmail } = req.body

    try {

        const updateUser = await prisma.user.update({ where: { id: userId }, data: { userName, userEmail } })

        return res.status(201).send({ message: "User updated successfully!", user: updateUser });



    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {

    const { userId } = req.params
   
    try {

        const deleteUser = await prisma.user.delete({ where: {id: userId} })

        return res.status(201).send({ message: "User updated successfully!", user: deleteUser });



    } catch (err) {
        console.error(err); // Log the error to the console for debugging purposes
        // In case of internal error, return an error message with status code 500
        return res.status(500).send({ error: 'Internal server error' });
    }
};




