import { Router } from 'express';
import { createGenre, deleteGenreByID, getAllGenres, getGenreByID, updateGenreByID } from '../controllers/';


const genreRoutes = Router();

genreRoutes
    .post('/', createGenre)
    .get('/:genreId', getGenreByID)
    .get('/', getAllGenres)
    .put('/:genreId', updateGenreByID)
    .delete('/:genreId', deleteGenreByID)


export default genreRoutes;