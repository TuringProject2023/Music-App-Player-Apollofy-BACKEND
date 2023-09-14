import { Router } from 'express';
import { createUser, deleteUserById, getAlbumByUserEmail, getAllUsers, getLikedPlaylistByUserEmail, getPlaylistByUserEmail, getTracksByUserEmail, getUserByEmailParams, updateUserById } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .get('/', getAllUsers)
    .get('/track/:userEmail', getTracksByUserEmail)
    .get('/playlistCreated/:userEmail', getPlaylistByUserEmail)
    .get('/album/:userEmail', getAlbumByUserEmail)
    .get('/playlistLiked/:userEmail', getLikedPlaylistByUserEmail)
    .patch('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;