import { FC, createContext, useEffect, useState } from "react";
import { getAllGenres } from "../api/genres.fetch";
import { useAuth0 } from "@auth0/auth0-react";

type ChildrenProps = {
    children: React.ReactNode;
}
interface GenresProps {
    id: string,
    genreName: string,
} //TOFIX, atención no se trae las imagenes ya que aún no están en la base de datos...


export const GenresContext = createContext<{ allGenres: GenresProps[], setAllGenres: (newAllGenres: GenresProps[]) => void }>({ allGenres: [], setAllGenres: () => { } });


export const GenresProvider: FC<ChildrenProps> = ({ children }) => {

    const [allGenres, setAllGenres] = useState<GenresProps[]>([])
    const { isAuthenticated } = useAuth0();

    async function getAllGenresLauncher() {
        const newAllGenres = await getAllGenres();
        setAllGenres(newAllGenres);
    }
    useEffect(() => {
        if (isAuthenticated) {
            getAllGenresLauncher();
        }
    }, [isAuthenticated]);


    return (
        <GenresContext.Provider value={{ allGenres, setAllGenres }}>
            {children}
        </GenresContext.Provider>
    )
}



