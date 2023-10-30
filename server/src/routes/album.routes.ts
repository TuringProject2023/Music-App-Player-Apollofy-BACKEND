import { Router } from 'express';
import { createAlbum, deleteAlbumById, getAlbumById, getAllAlbum, updateAlbum, updateAlbumAddTrack } from '../controllers/';


const albumRoutes = Router();

albumRoutes
    .post('/:userId', createAlbum)
    .get('/:albumId', getAlbumById)
    .get('/', getAllAlbum)
    .put('/:albumId', updateAlbum)
    .patch('/patch/:albumId', updateAlbumAddTrack)
    .delete('/:albumId/:userId', deleteAlbumById)


export default albumRoutes;