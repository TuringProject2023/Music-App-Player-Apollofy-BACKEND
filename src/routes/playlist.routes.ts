import { Router } from 'express';
import { createPlaylist, deletePlaylistById, getAllPlaylist, getPlaylistById, updatePlaylist } from '../controllers';


const playlistRoutes = Router();

playlistRoutes
    .post('/:userId', createPlaylist)
    .get('/:playlistId', getPlaylistById)
    .get('/', getAllPlaylist)
    .put('/:playlistId', updatePlaylist)
    .delete('/:playlistId', deletePlaylistById)


export default playlistRoutes;