import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import { createPlaylist } from "./playlist.controller";

jest.mock("../utils/cloudinary.ts", () => ({
  uploadImage: jest.fn(() => {
    return Promise.resolve({
      secure_url: "https://example.com/mock-image-url.jpg",
    });
  }),
}));

describe("Create Playlist controller", () => {
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

    await createPlaylist(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Image is missing" });
  });

  test("should return 201 status when all variables are sended and playlist creation are correct", async () => {
    const req = {
      params: {
        userId: "1",
      },
      body: {
        id: 123,
        playlistName: "asdsad",
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
        playlistCreatedById: "asdsad",
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

    const { userId } = req.params;
    const { playlistName, id } = req.body;
    let { trackId, genreId } = req.body;

    const newPlaylist = await prismaMock.playlist.create({
      data: {
        playlistName,
        playlistImage: "uploads/tmp-1-1697627083817",
        trackId: trackId,
        genreId: genreId,
        playlistCreatedById: userId,
      },
    });
    await createPlaylist(req, res);

    expect(res.send).toHaveBeenCalledWith(newPlaylist);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
});
