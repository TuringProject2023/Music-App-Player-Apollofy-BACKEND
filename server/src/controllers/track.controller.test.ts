import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import fs from 'fs-extra'
import { createTrack, updateTrackById } from './track.controller'


jest.mock('../utils/cloudinary', () => ({
    uploadImage: jest.fn(() => {
        return Promise.resolve({ secure_url: 'https://example.com/mock-image-url.jpg' })
    }),
    uploadAudio: jest.fn(() => {
        return Promise.resolve({ secure_url: 'https://example.com/mock-track-url.mp3' })
    }),
}))

jest.spyOn(fs, 'unlink').mockImplementation((path, callback) => {
    callback(null);
})

const newTrack = {
    id: "65082697e2438c19893c554b",
    trackName: "La mujer de verde",
    trackUrl: "https://res.cloudinary.com/dg5h08ive/video/upload/v1695032983/apollofyAudio/uofbduyk1ickaq462shn.mp3",
    trackImage: "https://res.cloudinary.com/dg5h08ive/image/upload/v1695032977/apollofyImages/nmfcwzcxdknxbyjn2h2a.jpg",
    trackCreatedAt: "2012",
    playlistId: [''],
    trackLikedBy: [''],
    artistId: ["65081c34132d489251bbf55c"],
    albumId: ["65082618e2438c19893c5549"],
    genreId: ["65017fdfd78b706a5fdf4513"]
}

describe('createTrack Controller', () => {

    test('should return 400 status when cover image is missing', async () => {
        const req = {
            params: {
                userId: '1'
            },
            body: {
                trackName: '',
                trackCreatedAt: '',
                genreId: '',
                artistId: '',
                albumId: ''
            },
            files: {
                trackImage: {},
                // trackUrl: {}
            }
        } as unknown as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        } as unknown as Response

        await createTrack(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'audio is missing'
        });

    })

    test('should return 201 status when all variables are sended and track creation are correct', async () => {
        const req = {
            params: {
                userId: '1'
            },
            body: {
                trackName: 'asdf',
                trackCreatedAt: 'asdf',
                genreId: 'asdf',
                artistId: 'asdf',
                albumId: 'asdf'
            },
            files: {
                trackImage: {
                    tempFilePath: 'helper/5238242.jpg'
                },
                trackUrl: {
                    tempFilePath: 'helper/5238242.jpg'
                }
            }
        } as unknown as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        } as unknown as Response

        prismaMock.track.create.mockResolvedValue(newTrack)

        await createTrack(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Track created successfully',
            newTrack
        });
    })

})

describe('updateTrack Controller', () => {

    test('should return 400 status when a key variable is missing', async () => {
        const req = {
            params: {
                trackId: '1'
            },
            body: {
                trackName: '',
                genreId: '',
                artistId: '',
                albumId: ''
            },
            files: {
                trackImage: {},
                // trackUrl: {}
            }
        } as unknown as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        } as unknown as Response

        prismaMock.track.update.mockResolvedValue(newTrack);

        await updateTrackById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'audio is missing'
        });

    })

    test('should return 201 status when all variables are sended and track creation are correct', async () => {
        const req = {
            params: {
                userId: '1'
            },
            body: {
                trackName: 'asdf',
                trackCreatedAt: 'asdf',
                genreId: 'asdf',
                artistId: 'asdf',
                albumId: 'asdf'
            },
            files: {
                trackImage: {
                    tempFilePath: 'helper/5238242.jpg'
                },
                trackUrl: {
                    tempFilePath: 'helper/5238242.jpg'
                }
            }
        } as unknown as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        } as unknown as Response

        prismaMock.track.create.mockResolvedValue(newTrack)

        await createTrack(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Track created successfully',
            newTrack
        });
    })

})