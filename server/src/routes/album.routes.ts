import { Router } from 'express';
import { createAlbum, deleteAlbumById, getAlbumById, getAllAlbum, updateAlbum, updateAlbumAddTrack } from '../controllers/';


const albumRoutes = Router();

albumRoutes
    .post('/', createAlbum)
    .get('/:albumId', getAlbumById)
    .get('/', getAllAlbum)
    .put('/:albumId', updateAlbum)
    .patch('/patch/:albumId', updateAlbumAddTrack)
    .delete('/:albumId', deleteAlbumById)


export default albumRoutes;