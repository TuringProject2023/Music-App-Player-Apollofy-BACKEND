import { Router } from 'express';
import { createUser, deleteUserById, getAlbumByUserEmail, getAllUsers, getPlaylistLikedByUserEmail, getPlaylistCreatedByUserEmail, getTracksByUserEmail, getUserByEmailParams, updateUserById, updateUserLikedByEmail } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .get('/', getAllUsers)
    .get('/playlistCreated/:userEmail', getPlaylistCreatedByUserEmail)
    .get('/playlistLiked/:userEmail', getPlaylistLikedByUserEmail)
    .get('/album/:userEmail', getAlbumByUserEmail)
    .get('/track/:userEmail', getTracksByUserEmail)
    // .get('/artist/:userEmail', getArtistsByUserEmail)//TOFIX - FALTA AÑADIR LA PETICIÓN DE ARTISTAS
    .patch('/:userId', updateUserById)
    .patch('/liked/:userEmail', updateUserLikedByEmail)
    .delete('/:userId', deleteUserById);

export default userRoutes;