import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import { updateUserById } from './user.controller';

jest.mock('../utils/cloudinary', () => ({
  uploadImage: jest.fn(() => {
    return Promise.resolve({ secure_url: 'https://example.com/mock-image-url.jpg' })
  })
}))

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userImage: string;
  userCreatedAt: object;
  userUpdatedAt: object;
  playlistLikedId: string[];
  playlistLiked: string[];
  tracksId: string[];
  tracks: string[];
  postId: string[];
  post: string[];
  albumId: string[];
  album: string[];
  playlistCreatedId: string[];
  playlistCreated: string[];
}
const userUpdated = {
  id: "1",
  userName: "Jorge",
  userEmail: "jorget@test.com",
  userImage: "sdadasd.pgn",
  userCreatedAt: new Date(Date.now()),
  userUpdatedAt: new Date(Date.now()),
  playlistLikedId: [""],
  playlistLiked: [""],
  tracksId: [""],
  tracks: [""],
  postId: [""],
  post: [""],
  albumId: [""],
  album: ["aSs", "SASDAS", "sdasd"],
  playlistCreatedId: [""],
  playlistCreated: [""],
};


// USER CONTROLLER --------------------------------------------------------------------

describe('updateUserById Controller', () => {

  test('should return 400 status when image is missing', async () => {
    const req = {
      params: { userId: '1' },
      body: {
        userName: 'Jorge',
        userEmail: 'jorget@test.com'
      },
      files: {}
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await updateUserById(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);

  });

  test('should return 201 status when all the variables are sended', async () => {
    const req = {
      params: { userId: '1' },
      body: {
        userName: 'Jorge',
        userEmail: 'jorget@test.com'
      },
      files: {
        userImage: {
          tempFilePath: 'https://chipiti.com/prueba.png'
        }
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    }

    const pruebaUsuario = prismaMock.user.update.mockResolvedValue(userUpdated)

    await updateUserById(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      status: 'success',
      message: "User updated successfully!",
      user: userUpdated,
    })
  });
})