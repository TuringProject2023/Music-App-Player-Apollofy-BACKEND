import { useContext } from "react";
import { UserContext, UserContextType } from "../context";

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserContext debe ser usado dentro de un UserProvider");
    }
    return context;
  };