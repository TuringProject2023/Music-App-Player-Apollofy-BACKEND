import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import { createPlaylist } from "./playlist.controller";
import fs from "fs-extra";

jest.mock("../utils/cloudinary.ts", () => ({
  uploadImage: jest.fn(() => {
    return Promise.resolve({
      secure_url: "https://example.com/mock-image-url.jpg",
    });
  }),
}));

jest.spyOn(fs, "unlink").mockImplementation((path, callback) => {
  callback(null);
});

const newPlaylist = {
  id: "123456",
  playlistName: "Test Playlist",
  trackId: [
    "65082242e2438c19893c5545",
    "65082697e2438c19893c554b",
    "65082765e2438c19893c554d",
  ],
  genreId: [
    "6501917ed1080d57fa618f57",
    "6501915fd1080d57fa618f56",
    "65017fdfd78b706a5fdf4513",
  ],
  playlistCreatedAt: new Date(),
  playlistUpdatedAt: new Date(),
  playlistLikedById: ["sadad"],
  playlistCreatedById: "sdadasd",
  playlistImage:
    "https://res.cloudinary.com/dg5h08ive/image/upload/v1695032977/apollofyImages/nmfcwzcxdknxbyjn2h2a.jpg",
};

const userUpdated = {
  id: "1",
  userName: "Jorge",
  userEmail: "jorget@test.com",
  userImage: "prueba.png",
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

describe("Create Playlist controller", () => {
  beforeEach(() => {
    prismaMock.user.update.mockResolvedValue(userUpdated);
  });

  test("should return 400 status when playlist image is missing", async () => {
    const req = {
      params: {
        userEmail: "hola@test.com",
      },
      body: {
        playlistName: "",
        trackId: "",
        genreId: "",
        playlistCreatedById: "",
        playlistUpdatedAt: "",
        playlistCreatedAt: "",
        playlistLikedById: "",
      },
      files: {
        // playlistImage: {
        //     timeFilePath: 'uploads/tmp-1-1697627083817'
        // },
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    await createPlaylist(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Image is missing" });
  });

  test("should return 201 status when all variables are sended and playlist creation are correct", async () => {
    const req = {
      params: {
        userEmail: "1",
      },
      body: {
        playlistName: "asdsad",
        tracksId: [
          "65082242e2438c19893c5545",
          "65082697e2438c19893c554b",
          "65082765e2438c19893c554d",
        ],
        genreId: [
          "6501917ed1080d57fa618f57",
          "6501915fd1080d57fa618f56",
          "65017fdfd78b706a5fdf4513",
        ],
        playlistCreatedById: "asdsad",
        playlistLikedById: "asdsad",
        playlistCreatedAt: "dsadsad",
      },
      files: {
        playlistImage: {
          tempFilePath: "uploads/tmp-1-1697627083817",
        },
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    prismaMock.playlist.create.mockResolvedValue(newPlaylist);

    await createPlaylist(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
