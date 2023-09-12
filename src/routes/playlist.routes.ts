import { Router } from 'express';
import { createPlaylist } from '../controllers/playlist.controller';


const playlistRoutes = Router();

playlistRoutes
    .post('/:userId', createPlaylist);

export default playlistRoutes;