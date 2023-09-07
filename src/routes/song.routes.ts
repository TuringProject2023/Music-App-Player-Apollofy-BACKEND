import { Router } from 'express';
import { createSong } from '../controllers/song.Controller';


const songRoutes = Router();

songRoutes
    .post('/:userId', createSong);

export default songRoutes;