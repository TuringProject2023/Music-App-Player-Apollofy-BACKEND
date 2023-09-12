import {Request, Response} from 'express';
import {prisma} from '../db/clientPrisma';

export const createGenre = async (req: Request, res: Response) => {
	const {genreName} = req.body;

	try {
		const newGenre = await prisma.genre.create({
			data: {genreName},
		});
		res.status(201).send(newGenre);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const getAllGenres = async (req: Request, res: Response) => {
	try {
		const allGenres = await prisma.genre.findMany();
		res.status(200).json(allGenres);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getGenreByID = async (req: Request, res: Response) => {
	const {genreId} = req.params;
	try {
		const genre = await prisma.genre.findUnique({
			where: {
				id: genreId,
			},
		});
		res.status(200).send(genre);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const updateGenreByID = async (req: Request, res: Response): Promise<Response> => {
	const {genreId} = req.params;
	const {genre} = req.body;
	try {
		if (!genre) {
			return res.status(404).send({msg: 'Genres not found'});
		}
		const genreFound = await prisma.genre.update({
			where: {
				id: genreId,
			},
			data: {genre},
		});

		return res.status(200).send(genreFound);
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const deleteGenreByID = async (req: Request, res: Response): Promise<Response> => {
	const {genreId} = req.params;
	try {
		const deleteGenre = await prisma.genre.delete({
			where: {id: genreId},
		});

		return res.status(200).send({msg: 'Genre deleted successfully', deleteGenre});
	} catch (error) {
		return res.status(500).send(error);
	}
};