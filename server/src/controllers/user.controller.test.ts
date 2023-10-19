import { prismaMock } from "../mocks/prisma.mock";
import { updateUserById, createUser } from "./user.controller";
import { Request, Response } from "express";

let uploadImageMock;

beforeEach(() => {
  uploadImageMock = jest.spyOn(require('../utils/cloudinary'), 'uploadImage');
  uploadImageMock.mockImplementation(() => Promise.resolve({ secure_url: 'mocked-url' }));
});


// USER CONTROLLER ---------------------------------------------


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


    await updateUserById(req, res);


    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "Image is missing" });

  });
  it("should return a status 400 when the user's name or email is missing from the request", async () => {
    const req = {
      params: {
        userId: "1",
      },
      body: {
        userName: "test name",
        // userEmail: "test@test.com",
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

    await updateUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "name and email are required fields" });

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
describe("createUser function. Check if the email already exists in the database if the user does not exist in the database create a new user ", () => {

  it("should return a status 400 when the user's name or email is missing from the request", async () => {
    const req = {
      params: {
        userId: "1",
      },
      body: {
        userName: "test name",
        // userEmail: "test@test.com",
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

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      error: "Name and email are required fields.",
    });

  });
  it("if the user does not exist in the database, create a new user and return a status 201", async () => {
    const req = {
      body: {
        name: "Jorge",
        email: "jorget@test.com",
        picture: "user-image.jpg",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    const { email, name, picture  } = req.body;
    const simulatedUserData = {
      id: '1',
      userEmail: email,
      userName: name,
      userImage: picture,
      userCreatedAt: new Date(),
      userUpdatedAt: new Date(),
      playlistLikedId: ['1', '2'],
      tracksId: ['3', '4'],
      postId: ['5', '6'],
      albumId: ['7', '8'],
      playlistCreatedId: ['9', '10'],
    };

    prismaMock.user.create.mockResolvedValue(simulatedUserData);


    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "User created successfully!",
      user:simulatedUserData
    });
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restablece todos los mocks
    jest.clearAllMocks(); // Limpia los registros de llamadas
  });
})




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
