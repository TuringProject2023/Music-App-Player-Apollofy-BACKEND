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
  test("should return a status 400 when the user's image is missing from the request", async () => {
    const req = {
      params: { userId: '1' },
      body: {
        userName: "test name",
        userEmail: "test@test.com",
      },
      files: {}
    } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    } as unknown as Response

    await updateUserById(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
  });
  test("should return a status 400 when the user's name or email is missing from the request", async () => {
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
  test('should update user data if all data is provided and return a status 201', async () => {
    const req = {
      params: { userId: '1' },
      body: {
        userName: "test name",
        userEmail: "test@test.com",
      },
      files: {
        userImage: {
          tempFilePath: 'https://chipiti.com/prueba.png'
        }
      }
    } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    } as unknown as Response
    const { userId } = req.params;
    const { userName, userEmail } = req.body;
    const simulatedUserData = {
      id: userId,
      userEmail: userEmail,
      userName: userName,
      userImage: 'user-imagen',
      userCreatedAt: new Date(),
      userUpdatedAt: new Date(),
      playlistLikedId: ['1', '2'],
      tracksId: ['3', '4'],
      postId: ['5', '6'],
      albumId: ['7', '8'],
      playlistCreatedId: ['9', '10'],
    };

    prismaMock.user.update.mockResolvedValue(simulatedUserData);

    await updateUserById(req, res);
    expect(res.send).toHaveBeenCalledWith({
      status: "success", message: "User updated successfully!",
      user: simulatedUserData
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
})
describe("createUser function. Check if the email already exists in the database if the user does not exist in the database create a new user ", () => {
  test("should return a status 400 when the user's name or email is missing from the request", async () => {
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
  test("if the user does not exist in the database, create a new user and return a status 201", async () => {
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
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
})
