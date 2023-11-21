import { useContext } from "react";
import { QueuePlayerContext, QueuePlayerContextType } from "../context";

export const useQueuePlayerContext = (): QueuePlayerContextType => {
    const context = useContext(QueuePlayerContext);
    if (!context) {
        throw new Error("useUserMusicContext will be used inside UserMusicProvider");
    }
    return context;
};