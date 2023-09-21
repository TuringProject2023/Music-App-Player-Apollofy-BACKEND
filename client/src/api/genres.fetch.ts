import { urlGenre } from "../global";





export const getAllGenres = async () => {
    try {
        const response = await fetch(urlGenre);
        const genres = await response.json();
        return genres;
        
    }
    catch {
        throw new Error("Error while getting all genres reference from mongoDB");
    }
};