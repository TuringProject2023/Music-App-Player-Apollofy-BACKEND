import { prismaMock } from "../mocks/prisma.mock";
import { createPlaylist } from "./playlist.controller";
import { Request, Response } from "express";

let uploadImageMock;

const simulatedUserData = {
    id: '1', // Simulando un ID específico
    userEmail: 'example@example.com',
    userName: 'John Doe',
    userImage: 'user-image.jpg',
    userCreatedAt: new Date(),
    userUpdatedAt: new Date(),
    playlistLikedId: ['1', '2'], // IDs de playlists que le gustan al usuario
    tracksId: ['3', '4'], // IDs de las pistas del usuario
    postId: ['5', '6'], // IDs de las publicaciones del usuario
    albumId: ['7', '8'], // IDs de los álbumes del usuario
    playlistCreatedId: ['9', '10'], // IDs de playlists creadas por el usuario
  };
beforeEach(() => {
    uploadImageMock = jest.spyOn(require('../utils/cloudinary'), 'uploadImage');
    uploadImageMock.mockImplementation(() => Promise.resolve({ secure_url: 'mocked-url' }));
});

// Playlist test CONTROLLER ---------------------------------------------

describe("createPlaylist function. ", () => {
    it("create a new playlist and return a status 201", async () => {
        prismaMock.playlist.create.mockRestore();
        const req = {
            params: {
                userEmail: 'hora28py@gmail.com'
            },
            body: {
                playlistName: 'horacio4',
                playlistCreatedById: 'hora28py@gmail.com',
                trackId: [
                    '65082506e2438c19893c5548',
                    '65082242e2438c19893c5545',
                    '65082697e2438c19893c554b'
                ],
                genreId: [
                    '6501915fd1080d57fa618f56',
                    '6501917ed1080d57fa618f57',
                    '65019188d1080d57fa618f58'
                ]
            },
            files: {
                playlistImage: {
                    name: 'perfil mejorado cv.jpg',
                    tempFilePath: 'uploads/tmp-1-1697627083817',
                },
            },
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;


        prismaMock.playlist.create.mockResolvedValue({
            id: "12",
            playlistName: req.body.playlistName,
            playlistImage: "url-mock",
            trackId: req.body.trackId,
            genreId: req.body.genreId,
            playlistCreatedAt: new Date(),
            playlistUpdatedAt: new Date(),
            playlistLikedById: [],
            playlistCreatedById: '23',
        });
        prismaMock.user.update.mockResolvedValue(simulatedUserData)

        await createPlaylist(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ 'newPlaylistLiked':simulatedUserData});
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restablece todos los mocks
        jest.clearAllMocks(); // Limpia los registros de llamadas
    });
})
