// import { prismaMock } from "../mocks/prisma.mock";
// import { createTrack } from './track.controller'
// import fs, { unlink } from 'fs'


// jest.mock('../utils/cloudinary', () => ({
//     uploadImage: jest.fn(() => {
//         return Promise.resolve({ secure_url: 'https://example.com/mock-image-url.jpg' })
//     }),
//     uploadAudio: jest.fn(() => {
//         return Promise.resolve({ secure_url: 'https://example.com/mock-track-url.mp3' })
//     }),
// }))

// jest.mock('fs');

// const newTrack = {
//     id: "65082697e2438c19893c554b",
//     trackName: "La mujer de verde",
//     trackUrl: "https://res.cloudinary.com/dg5h08ive/video/upload/v1695032983/apollofyAudio/uofbduyk1ickaq462shn.mp3",
//     trackImage: "https://res.cloudinary.com/dg5h08ive/image/upload/v1695032977/apollofyImages/nmfcwzcxdknxbyjn2h2a.jpg",
//     trackCreatedAt: "2012",
//     playlistId: [''],
//     trackLikedBy: [''],
//     artistId: ["65081c34132d489251bbf55c"],
//     albumId: ["65082618e2438c19893c5549"],
//     genreId: ["65017fdfd78b706a5fdf4513"]
// }

// describe('createTrack Controller', () => {

//     test('should return 400 status when cover image is missing', async () => {
//         const req = {
//             params: {
//                 userId: '1'
//             },
//             body: {
//                 trackName: '',
//                 trackCreatedAt: '',
//                 genreId: '',
//                 artistId: '',
//                 albumId: ''
//             },
//             files: {
//                 trackImage: {},
//                 // trackUrl: {}
//             }
//         }

//         const res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//             send: jest.fn()
//         }

//         await createTrack(req as any, res as any);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.json).toHaveBeenCalledWith({
//             error: 'audio is missing'
//         });

//     })

//     test.only('should return 201 status when all variables are sended and track creation are correct', async () => {
//         const req = {
//             params: {
//                 userId: '1'
//             },
//             body: {
//                 trackName: 'asdf',
//                 trackCreatedAt: 'asdf',
//                 genreId: 'asdf',
//                 artistId: 'asdf',
//                 albumId: 'asdf'
//             },
//             files: {
//                 trackImage: {
//                     tempFilePath: 'https://chipiti.com/prueba.png'
//                 },
//                 trackUrl: {
//                     tempFilePath: 'https://chipiti.com/prueba.mp3'
//                 }
//             }
//         }

//         const res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//             send: jest.fn()
//         }

//         const unlinkMock = jest.fn();
//         jest.spyOn(fs.promises, 'unlink').mockImplementation(unlinkMock);

//         prismaMock.track.create.mockResolvedValue(newTrack)

//         await createTrack(req as any, res as any);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.send).toHaveBeenCalledWith({
//             message: 'Track created successfully'
//         });

//     })

// })