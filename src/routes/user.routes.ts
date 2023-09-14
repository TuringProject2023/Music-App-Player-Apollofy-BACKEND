import { Router } from 'express';
<<<<<<< HEAD
import { createUser, deleteUserById, getAllUsers, getUserByEmailParams, updateUserById } from '../controllers/';
=======
import { createUser, deleteUserById, getAlbumByUserEmail, getAllUsers, getLikedPlaylistByUserEmail, getPlaylistByUserEmail, getTracksByUserEmail, getUserByEmail, updateUserById } from '../controllers/';
>>>>>>> cf8db10700bcc5975d0985dde299f66f513d4a64


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .get('/', getAllUsers)
    .get('/track/:userEmail', getTracksByUserEmail )
    .get('/playlist/:userEmail', getPlaylistByUserEmail )
    .get('/album/:userEmail', getAlbumByUserEmail )
    .get('/playlistLiked/:userEmail', getLikedPlaylistByUserEmail )
    .put('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;