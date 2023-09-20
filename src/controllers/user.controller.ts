import { Request, Response } from "express";
import { prisma } from "../db/clientPrisma";
import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";

export const createUser = async (req: Request, res: Response) => {
  const { email, name, picture } = req.body;

  try {
    // Check if all required fields are provided
    if (!name || !email) {
      return res.status(400).send({ status: "error", error: "Name and email are required fields." });
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
                trackUrl: true,
              },
            },
          },
        },
      },
    });

    if (!emailExist) {
      // if the user does not exist in the database, create a new user
      const newUser = await prisma.user.create({
        data: { userName: name, userEmail: email, userImage: picture },
        include: {
          playlistCreated: {
            select: {
              playlistName: true,
              track: {
                select: {
                  trackName: true,
                  trackUrl: true,
                },
              },
            },
          },
        },
      });
      return res.status(201).send({ message: "User created successfully!", user: newUser });
    } else {
      // If the email already exists, return the data of the existing user
      return res.status(200).send({ status: "success", message: "User already exists.", user: emailExist });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getUserByEmailParams = async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  //TOFIX meter protección para que nadie pueda pedir la info de otro usuario pasando el mail. Es decir verificar que el user.mail es el mail que está llegando a params...
  try {
    const userById = await prisma.user.findUnique({
      where: { userEmail: userEmail },
      include: {},
    });

    return res.status(200).send(userById);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getUserByEmailFunction = async (email: string) => {
  const userEmail = email;
  //TOFIX meter protección para que nadie pueda pedir la info de otro usuario pasando el mail. Es decir verificar que el user.mail es el mail que está llegando a params...
  try {
    const userById = await prisma.user.findUnique({
      where: { userEmail: userEmail },
      include: {},
    });

    return userById?.id;

  } catch (err) {
    console.error(err);
    return "Error while finding userEmail/Id";
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();

    return res.status(201).send({ message: "User created successfully!", user: allUsers });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { userName, userEmail } = req.body;

  try {
    if (!req.files?.userImage) {
      return res.status(400).json({ error: "Image is missing" });
    }
    const imageVerefication = req.files?.userImage;

    if ("tempFilePath" in imageVerefication) {
      const upload = await uploadImage(imageVerefication.tempFilePath);
      await fs.unlink(imageVerefication.tempFilePath);
      const updateUser = await prisma.user.update({ where: { id: userId }, data: { userName, userEmail, userImage: upload.secure_url } });

      return res.status(201).send({ status: "success", message: "User updated successfully!", user: updateUser });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateUserLikedByEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.params;
  const { tracksId, albumId, playlistLikedId } = req.body;
  const tracksIdArr = tracksId.split(',').filter(Boolean);
  const albumIdArr = albumId.split(',').filter(Boolean);
  const playlistLikedIdArr = playlistLikedId.split(',').filter(Boolean);

  try {
    const updateUser = await prisma.user.update({
      where: {
        userEmail: userEmail
      },
      data: {
        tracksId: tracksIdArr,
        albumId: albumIdArr,
        playlistLikedId: playlistLikedIdArr,
      }
    });

    return res.status(201).send({ status: "success", message: "User updated successfully!", user: updateUser });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const deleteUser = await prisma.user.delete({ where: { id: userId } });
    if (!deleteUser) {
      return res.status(204).send();
    }

    return res.status(204).send({ message: "User deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getTracksByUserEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.params;

  try {
    const userByEmail = await prisma.user.findUnique({
      where: { userEmail: userEmail },
      select: { tracks: true },
    });

    return res.status(200).send(userByEmail?.tracks);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getPlaylistCreatedByUserEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.params;

  try {
    const userByEmail = await prisma.user.findUnique({
      where: { userEmail: userEmail },
      select: {
        playlistCreated: {
          include: {
            genre: {
              select: {
                genreName: true,
                id: true,
              }
            },
          }
        }
      },
    });

    return res.status(200).send(userByEmail?.playlistCreated);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getAlbumByUserEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.params;

  try {
    const userByEmail = await prisma.user.findUnique({
      where: { userEmail: userEmail },
      select: { album: true },
    });

    return res.status(200).send(userByEmail?.album);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getPlaylistLikedByUserEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.params;

  try {
    const userByEmail = await prisma.user.findUnique({
      where: { userEmail: userEmail },
      select: {
        playlistLiked: {
          include: {
            genre: {
              select: {
                genreName: true,
                id: true,
              }
            },
            track: true,
          }
        }
      },
    });

    return res.status(200).send(userByEmail?.playlistLiked);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};