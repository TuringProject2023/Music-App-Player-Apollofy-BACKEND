import { Router } from 'express';
import { createAlbum, deleteAlbumById, getAlbumById, getAllAlbum, updateAlbum } from '../controllers/';


const albumRoutes = Router();

albumRoutes
    .post('/', createAlbum)
    .get('/:albumId', getAlbumById)
    .get('/', getAllAlbum)
    .put('/:albumId', updateAlbum)
    .delete('/:albumId', deleteAlbumById)


export default albumRoutes;