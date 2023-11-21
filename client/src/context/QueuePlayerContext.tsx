import { FC, PropsWithChildren, createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadNextTracksFromLS, saveNextTracksToLS } from "../utils/nextTracksToLS";
import { useUserMusicContext } from "../hooks";


export interface QueuePlayerContextType {
    currentTrack: TrackInterface | undefined;
    handleCurrentTrackById: (id: string) => void;
    nextTracks: TrackInterface[] | [];
    prevTracks: TrackInterface[] | [];
    handleNextTrackInList: () => void;
    handleDeleteTrackInList: (index: number) => void;
    handleNewTrackInList: (id: string) => void;
    handleListChange: (ids: string[]) => void;
    handlePrevTrackInList: () => void;
}
interface TrackInterface {
    id: string;
    trackName: string;
    trackImage: string;
    trackCreatedAt: string;
    trackUpdatedAt: string;
    trackId: string[];
    trackLikedById: string[];
    trackCreatedById: string[];
    genre: [{ genreName: string }];
    genreId: string[];
    artist: ArtistInterface[];
    artistId: string[];
    trackUrl: string;
    albumId: string;
}
interface ArtistInterface {
    id: string
    artistName: string;
    artistImage: string;
    popularity: number;
    albumId: string[];
    genreId: string[];
    trackId: string[]
}

export const QueuePlayerContext = createContext<QueuePlayerContextType | undefined>(undefined);

export const QueuePlayerProvider: FC<PropsWithChildren> = ({ children }) => {

    const { user, isAuthenticated } = useAuth0();
    const { tracks } = useUserMusicContext();
    const [prevTracks, setPrevTracks] = useState<TrackInterface[]>([]);
    const [currentTrack, setCurrentTrack] = useState<TrackInterface | undefined>();
    const [nextTracks, setNextTracks] = useState<TrackInterface[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            setNextTracks(loadNextTracksFromLS(user?.email as string ))
        }

    }, [isAuthenticated, user?.email])


    const handleCurrentTrackById = (id: string) => {
        const incomingTrack = tracks.find(track => track.id === id);
        if (incomingTrack) {
            setCurrentTrack(incomingTrack);
        }
    }
    const handleNewTrackInList = (id: string) => {
        const incomingTrack = tracks.find(track => track.id === id);
        if (incomingTrack) {
            setNextTracks(prevNextTracks => [...prevNextTracks, incomingTrack]);
            const newNextTracks = [...nextTracks, incomingTrack]
            saveNextTracksToLS(newNextTracks, user?.email as string);
        }
    }
    const handleDeleteTrackInList = (index: number) => {
        const newNextTracks = nextTracks.filter((_track, i) => i !== index);
        setNextTracks(newNextTracks);
        saveNextTracksToLS(newNextTracks, user?.email as string);
    }
    const handleNextTrackInList = () => {
        if (nextTracks && nextTracks?.length > 0) {
            const id = nextTracks[0].id
            if (currentTrack) {
                setPrevTracks(prevTracks => [...prevTracks, currentTrack]);
            }
            const incomingTrack = tracks.find(track => track.id === id);
            if (incomingTrack) {
                setCurrentTrack(incomingTrack);
                setNextTracks(nextTracks.slice(1));
                saveNextTracksToLS(nextTracks.slice(1), user?.email as string);
            }
        }
    }
    const handlePrevTrackInList = () => {
        if (prevTracks && prevTracks?.length > 0) {
            const selectedPrevTrack = prevTracks[prevTracks.length - 1];

            if (currentTrack) {
                const newNextTracks = [currentTrack, ...nextTracks];
                setNextTracks(newNextTracks);
                saveNextTracksToLS(newNextTracks, user?.email as string);
            }
            setCurrentTrack(selectedPrevTrack);

            if (prevTracks && prevTracks.length <= 1) {
                setPrevTracks([])
            } else {
                const index = prevTracks.length - 1
                const newPrevTracks = prevTracks.slice(0, index);
                setPrevTracks(newPrevTracks!);
            }
        }
    }
    const handleListChange = (ids: string[]) => {

        const newNextTracks: TrackInterface[] = [];

        ids.forEach((id) => {
            const selectedTrack = tracks.find(track => track.id === id);
            if (selectedTrack) {
                newNextTracks.push(selectedTrack);
            }
        })
        setCurrentTrack(newNextTracks[0]);
        setNextTracks(newNextTracks.slice(1));
        saveNextTracksToLS(newNextTracks, user?.email as string);
    }


    return (
        <QueuePlayerContext.Provider value={{ currentTrack, handleCurrentTrackById, nextTracks, prevTracks, handleNextTrackInList, handleNewTrackInList, handleDeleteTrackInList, handleListChange, handlePrevTrackInList }}>
            {children}
        </QueuePlayerContext.Provider>
    )
}
