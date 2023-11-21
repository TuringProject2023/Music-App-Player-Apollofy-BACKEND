import { useContext } from "react";
import { GenresContext } from "../context";

export const useGenresContext = () => {
    const context = useContext(GenresContext);
    if (!context) {
        throw new Error('useUserContext debe ser usado dentro de un UserProvider');
    }
    return context;
};
