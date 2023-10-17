import { prismaMock } from "../mocks/prisma.mock";
import { updateUserById, createUser } from "./user.controller";
import { updateArtistById } from "./artist.controller";
import { Request, Response } from "express";
import { uploadImage } from "../utils/cloudinary";
import fs from "fs-extra";
import { create } from "domain";
import { prisma } from "../db/clientPrisma";

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
jest.mock("../controllers/user.controller.ts", () => {
  return {
    updateUserById: jest.fn(),
  };
});

async function createUserLocal(user: User) {
  if (!user.userEmail) {
    throw new Error("Mail is missing");
  }
  return await prisma.user.create({
    data: { userName: user.userName, userEmail: user.userEmail, id: user.id },
  });
}

// beforeEach(() => {
//   Establece la configuración mock antes de cada prueba
//   jest.resetModules();
//   jest.doMock("../config/config.ts", () => ({
//     cloudinary: {
//       cloud_name: "dg5h08ive",
//       api_key: "655874934627145",
//       api_secret: "mNI1rkahM2ZT9kyjmU2S_PduztI",
//     },
//   }));
// });

describe("Given a createduser function", () => {
  describe("When created user is invoked", () => {
    test("Then should resolved with a given object", async () => {
      const sendUser = {
        id: "2",
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
        album: ["123", "21231", "213123"],
        playlistCreatedId: [""],
        playlistCreated: [""],
      };
      const returnedUser = {
        id: "2",
        userName: "Jorge2",
        userEmail: "@test.com",
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
        album: ["123", "21231", "213123"],
        playlistCreatedId: [""],
        playlistCreated: [""],
      };

      prismaMock.user.create.mockResolvedValue(returnedUser);

      const result = await createUserLocal(sendUser);
      console.log(result);
      expect(result).toEqual(new Error("Internal server error"));
    });
  });
});
// describe("Given a update user function", () => {
//   describe("When update user is invoked", () => {
//     test("Then should the user will be updated", async () => {
//       // const req = new Request()
//       const req = {
//         params: {
//           userId: "1",
//         },
//         body: {
//           userName: "test name",
//           userEmail: "test@test.com",
//         },
//         files: {
//           userImage: {
//             tempFilePath: "/path/to/temp/file",
//           },
//         },
//       } as unknown as Request;

//       const res = {
//         status: jest.fn().mockReturnValue(201),
//         json: jest.fn(),
//       } as unknown as Response;

//       prismaMock.user.update.mockResolvedValue(userUpdated);
//       // (uploadImage as jest.Mock).mockResolvedValue({ secure_url: "hola.png" });

//       // (fs.unlink as any).mockResolvedValue("hola");

//       await updateUserById(req, res);
//       console.log(userUpdated);
//       console.log("Response status:", res.status);

//       expect(res.status).toHaveBeenCalledWith(
//         { userName: req.body.name },
//         { where: { id: 1 } }
//       );
//       expect(res.json).toHaveBeenCalledWith({
//         status: "success",
//         message: "User updated successfully!",
//         user: userUpdated,
//       });
//     });
//   });
// });
