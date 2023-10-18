import { prismaMock } from "../mocks/prisma.mock";
import { updateUserById, createUser } from "./user.controller";
import { Request, Response } from "express";


jest.mock('../utils/cloudinary', () => ({
  uploadImage: jest.fn(() => {
    return Promise.resolve({ secure_url: 'https://example.com/mock-image-url.jpg' })
  })
}))



const userUpdated = {
  id: "1",
  userName: "Jorge",
  userEmail: "jorget@test.com",
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


describe("updateUserById function", () => {
  it("should return a status 400 when the user's image is missing from the request", async () => {
    const req = {
      params: {
        userId: "1",
      },
      body: {
        userName: "test name",
        userEmail: "test@test.com",
      },
      // files: {
      //   userImage: {
      //     name: 'perfil mejorado cv.jpg',
      //     tempFilePath: 'uploads/tmp-1-1697627083817',
      //   },
      // },

    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const { userId } = req.params;
    const { userName, userEmail } = req.body;


    await prismaMock.user.update({
      where: { id: userId },
      data: { userName, userEmail, userImage: 'mocked-url' },
    });
    // Llama a la función updateUserById
    await updateUserById(req, res);


    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "Image is missing" });

  });
  it("should update user data if all data is provided and return a status 201", async () => {
    const req = {
      params: {
        userId: "65040a1584459ac683af9373",
      },
      body: {
        userName: "Jorge",
        userEmail: "jorget@test.com",
      },
      files: {
        userImage: {
          name: 'perfil mejorado cv.jpg',
          tempFilePath: 'uploads/tmp-1-1697627083817',
        },
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const { userId } = req.params;
    const { userName, userEmail } = req.body;

    const updateUser = await prismaMock.user.update({
      where: { id: userId },
      data: { userName, userEmail, userImage: 'mocked-url' },
    });
    // Llama a la función updateUserById
    await updateUserById(req, res);

    expect(res.send).toHaveBeenCalledWith({
      status: "success", message: "User updated successfully!",
      user: updateUser
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restablece todos los mocks
    jest.clearAllMocks(); // Limpia los registros de llamadas
  });
})


// USER CONTROLLER --------------------------------------------------------------------

// describe('updateUserById Controller', () => {

//   test('should return 400 status when image is missing', async () => {
//     const req = {
//       params: { userId: '1' },
//       body: {
//         userName: 'Jorge',
//         userEmail: 'jorget@test.com'
//       },
//       files: {}
//     }

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     }

//     await updateUserById(req as any, res as any);

//     expect(res.status).toHaveBeenCalledWith(400);

//   });

//   test('should return 201 status when all the variables are sended', async () => {
//     const req = {
//       params: { userId: '1' },
//       body: {
//         userName: 'Jorge',
//         userEmail: 'jorget@test.com'
//       },
//       files: {
//         userImage: {
//           tempFilePath: 'https://chipiti.com/prueba.png'
//         }
//       }
//     }
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//       json: jest.fn()
//     }

//     const pruebaUsuario = prismaMock.user.update.mockResolvedValue(userUpdated)

//     await updateUserById(req as any, res as any);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.send).toHaveBeenCalledWith({
//       status: 'success',
//       message: "User updated successfully!",
//       user: userUpdated,
//     })
//   });
// })
