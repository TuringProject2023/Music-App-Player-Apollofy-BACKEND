import { Router } from 'express';
import { createAlbum,createAlbumByUserId, deleteAlbumById, getAlbumById, getAllAlbum, updateAlbum } from '../controllers/';


const albumRoutes = Router();

albumRoutes
    .post('/', createAlbum)
    .post('/:userId', createAlbumByUserId)
    .get('/:albumId', getAlbumById)
    .get('/', getAllAlbum)
    .put('/:albumId', updateAlbum)
    .delete('/:albumId', deleteAlbumById)


export default albumRoutes;