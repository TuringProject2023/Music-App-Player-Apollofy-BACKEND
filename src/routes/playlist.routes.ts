import { Router } from 'express';
import { createPlaylist } from '../controllers/playlist.Controller';


const playlistRoutes = Router();

playlistRoutes
    .post('/:userId', createPlaylist);

export default playlistRoutes;