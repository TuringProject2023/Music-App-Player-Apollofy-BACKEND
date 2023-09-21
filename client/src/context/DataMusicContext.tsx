import { createContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { Playlist, Album, Genre, Track, Artist } from '../types/data';


export interface MusicContextProps {
  data: any;
  playlist: Playlist[] | null;
  album: Album[] | null;
  genre: Genre[] | null;
  track: Track[] | null;
  artist: Artist[] | null;
  currentTrack: Track | null;
  handleCurrentTrack: (incomingCurrentTrack: Track) => void;
}

export const DataMusicContext = createContext<MusicContextProps>({} as MusicContextProps);

export const DataMusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MusicContextProps | null>({
    playlist: null,
    album: null,
    genre: null,
    track: null,
    artist: null,
    currentTrack: null,
    handleCurrentTrack: () => null
  });
  const [currentTrack, setCurrentTrack] = useState<Track>();

  const handleCurrentTrack = useCallback((incomingCurrentTrack: Track): void => {
    setCurrentTrack(incomingCurrentTrack);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistResponse = await fetch(urlPlaylist);
        const playlists: Playlist[] = await playlistResponse.json() as Playlist[];

        const albumResponse = await fetch(urlAlbum);
        const albums: Album[] = await albumResponse.json() as Album[];

        const genreResponse = await fetch(urlGenre);
        const genres: Genre[] = await genreResponse.json() as Genre[];

        const trackResponse = await fetch(urlTrack);
        const tracks: Track[] = await trackResponse.json() as Track[];

        const artistResponse = await fetch(urlArtis);
        const artists: Artist[] = await artistResponse.json() as Artist[];

        setData({
          playlist,
          album,
          genre,
          track,
          artist,
          currentTrack: null,
          handleCurrentTrack: (): undefined => undefined
        });
      } catch (error) {
        console.error(error);
      }
    };
    void fetchData();

  }, []);

  const updateData = useCallback(function (data: MusicContextProps): void {
    setData(data)
  }, [])

  const value: MusicContextProps = useMemo(() => ({
    data,
    updateData,
    handleCurrentTrack,
    currentTrack
  }), [data, updateData, handleCurrentTrack, currentTrack])


  return (
    <DataMusicContext.Provider value={value}>
      {children}
    </DataMusicContext.Provider>
  );
};
