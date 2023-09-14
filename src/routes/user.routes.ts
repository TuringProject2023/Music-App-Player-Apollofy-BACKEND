import { Router } from 'express';
import { createUser, deleteUserById, getAlbumByUserEmail, getAllUsers, getLikedPlaylistByUserEmail, getPlaylistByUserEmail, getTracksByUserEmail, getUserByEmail, updateUserById } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmail)
    .get('/', getAllUsers)
    .get('/track/:userEmail', getTracksByUserEmail )
    .get('/playlist/:userEmail', getPlaylistByUserEmail )
    .get('/album/:userEmail', getAlbumByUserEmail )
    .get('/playlistLiked/:userEmail', getLikedPlaylistByUserEmail )
    .put('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;