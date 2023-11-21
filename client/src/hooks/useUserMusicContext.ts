import { useContext } from "react";
import { UserMusicContext, UserMusicContextType } from "../context";

export const useUserMusicContext = (): UserMusicContextType => {
    const context = useContext(UserMusicContext);
    if (!context) {
      throw new Error("useUserMusicContext debe ser utilizado dentro de un UserMusicProvider");
    }
    return context;
  };