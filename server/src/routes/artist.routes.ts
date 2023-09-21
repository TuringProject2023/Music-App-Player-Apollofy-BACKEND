import { Router } from 'express';
import {  } from '../controllers/';
import { createArtist, getArtistById, deleteArtistById, updateArtistById, getAllArtists } from '../controllers/artist.controller';


const ArtistRoutes = Router();

ArtistRoutes
    .post('/', createArtist)
    .get('/:artistId', getArtistById)
    .get('/', getAllArtists)
    .put('/:artistId', updateArtistById)
    .delete('/:artistId', deleteArtistById)


export default ArtistRoutes;