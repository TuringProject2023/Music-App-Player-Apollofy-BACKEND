import { useContext, createContext, FC, ReactNode, useState, useEffect } from 'react';
import { urlTrack } from '../global/urls/UrlApi';
import { getAllTracks } from '../api/track.service';


interface Genre {
    genreName: string
}
interface TrackItemProps {
    id: string;
    trackName: string;
    trackUrl: string;
    trackImage: string;
    trackCreatedAt: string;
    genre: Genre[];
    counter?: number;
    allTrack: []
}
interface TrackProps {
    tracks: TrackItemProps[] | undefined;
    setTracks: React.Dispatch<React.SetStateAction<TrackItemProps[] | undefined>>
    children?: ReactNode
    fetchTracks: () => Promise<void>
}

const TrackContext = createContext<TrackProps>({} as TrackProps);

export const TrackProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [tracks, setTracks] = useState<TrackItemProps[] | undefined>([]);


    const getUrlTrack: string = urlTrack;

    const fetchTracks = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const getTracks = await getAllTracks(getUrlTrack);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data = await getTracks;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setTracks(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        void fetchTracks()
    }, [setTracks])

    return (
        <TrackContext.Provider value={{ tracks, setTracks, fetchTracks }}>
            {children}
        </TrackContext.Provider>
    )
}

export const useTrack = () => {
    const trackContext = useContext(TrackContext);
    if (!trackContext) {
        throw new Error('trackContext has to be used within TrackContext')
    }
    return trackContext
}