import { createContext, FC, useState, ReactNode, useContext, useEffect } from "react";
import {
  userPlaylistsCreatedGet, userPlaylistsLikedGet, userAlbumsGet,
  userTracksGet, createTrack, createArtist, createAlbum, artistGet
} from "../api/user.fetch";
import { useAuth0 } from "@auth0/auth0-react";
import { createPlaylist, getAllPlaylist } from "../api/playlist.fetch";
import { trackDelete, trackPatch } from "../api/track.service";


interface UserMusicContextType {
  playlistsCreated: PlaylistInterface[];
  playlistsLiked: PlaylistInterface[];
  playlistsAll: PlaylistInterface[];
  albums: AlbumInterface[];
  albumCreated: albumCreateInteface[];
  tracks: TrackInterface[];
  deleteTrack: TrackInterface[];
  artistCreated: CreateArtistType[];
  artists: ArtistInterface[];
  tracksCreated: CreateTrackType[];
  newPlaylistCreated: PlaylistCreateInteface[];
  handleUserPlaylistsCreated: (userEmail: string) => Promise<void>;
  handleUserPlaylistsLiked: (userEmail: string) => Promise<void>;
  handlePlaylistsAll: () => Promise<void>;
  handleUserAlbums: (userEmail: string) => Promise<void>;
  handleUserTracks: (userEmail: string) => Promise<void>;
  handleDeleteTrack: (trackId: string) => Promise<void>;
  createUserTracks: (userId: string, trackData: FormData) => Promise<Response>;
  modifyTrack: (trackId: string, trackData: FormData) => Promise<Response>;
  createNewArtist: (formData: FormData) => Promise<Response>;
  createNewAlbum: (formData: FormData,userId:string) => Promise<Response>;
  createNewPlaylist: (userEmail: string, formData: FormData) => Promise<Response>;
  getArtists: () => Promise<Response>;
}
interface PlaylistInterface {
  id: string;
  playlistName: string;
  playlistImage: string;
  playlistCreatedAt: string;
  playlistUpdatedAt: string;
  trackId: string[];
  track: TrackInterface[];
  playlistLikedById: string[];
  playlistCreatedById: string[];
  genreId: string[];
  genre: [{ genreName: string; id: string }];
  artist: ArtistInterface[];
}

interface PlaylistCreateInteface {
  playlistName: string,
  playlistImage: string;
  playlistCreatedById: string;
  genreId: string[],
  trackId: string[],
}
interface AlbumInterface {
  id: string;
  albumName: string;
  albumImage: string;
  albumCreatedAt: string;
  albumUpdatedAt: string;
  trackId: string[];
  track: TrackInterface[];
  albumLikedById: string[];
  albumCreatedById: string[];
  genreId: string[];
  artist: ArtistInterface[];
  artistId: string[];
  genre: GenreInterface[];
}
interface GenreInterface {
  id: string,
  genreName: string,
}

interface albumCreateInteface {
  albumName: string;
  albumImage: string;
  albumCreatedAt: string;
  genreId: string[];
  artistId: string[];
  trackId: string[];
  artist: ArtistInterface[];
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

interface CreateTrackType {
  trackName: string;
  trackUrl: string;
  trackImage: string;
  trackCreatedAt: string;
  genreId: string[];
  artistId: string[];
  albumId: string[];
}
interface CreateArtistType {
  artistName: string;
  artistImage: string;
  popularity: string;
  albumId: string[];
  genreId: string[];
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

const UserMusicContext = createContext<UserMusicContextType | undefined>(undefined);

export const UserMusicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [playlistsCreated, setPlaylistsCreated] = useState<PlaylistInterface[]>([]);
  const [playlistsLiked, setPlaylistsLiked] = useState<PlaylistInterface[]>([]);
  const [playlistsAll, setPlaylistsAll] = useState<PlaylistInterface[]>([]);
  const [albums, setAlbums] = useState<AlbumInterface[]>([]);
  const [tracks, setTracks] = useState<TrackInterface[]>([]);
  const [deleteTrack, setDeleteTrack] = useState<TrackInterface[]>([]);
  const [artists, setArtist] = useState<ArtistInterface[]>([]);
  const [tracksCreated, setTracksCreated] = useState<CreateTrackType[]>([]);
  const [artistCreated, setArtistCreated] = useState<CreateArtistType[]>([]);
  const [albumCreated, setAlbumCreated] = useState<albumCreateInteface[]>([]);
  const [newPlaylistCreated, setPlaylistCreated] = useState<PlaylistCreateInteface[]>([]);
  const userEmail = user?.email || "";


  useEffect(() => {
    if (isAuthenticated && userEmail) {
      async function getAllMusicLauncher() {
        await handleUserPlaylistsCreated(userEmail);
        await handleUserPlaylistsLiked(userEmail);
        await handleUserAlbums();
        await handleUserTracks();
        await handlePlaylistsAll();
        await getArtists();
      }
      getAllMusicLauncher();
    }
  }, [isAuthenticated,albumCreated]);

  const handleUserPlaylistsCreated = async (userEmail: string) => {
    try {
      const response = await userPlaylistsCreatedGet(userEmail, getAccessTokenSilently);
      setPlaylistsCreated(response);
    } catch (error) {
      console.error("Error getting created playlists:", error);
      throw error;
    }
  };

  const handleUserPlaylistsLiked = async (userEmail: string) => {
    try {
      const response = await userPlaylistsLikedGet(userEmail, getAccessTokenSilently);
      setPlaylistsLiked(response);
    } catch (error) {
      console.error("Error getting liked playlists:", error);
      throw error;
    }
  };
  const handlePlaylistsAll = async () => {
    try {
      const response = await getAllPlaylist(getAccessTokenSilently);
      setPlaylistsAll(response);
    } catch (error) {
      console.error("Error getting liked playlists:", error);
      throw error;
    }
  };

  const handleUserAlbums = async () => {
    try {
      const response = await userAlbumsGet(getAccessTokenSilently);
      setAlbums(response);
      return response
    } catch (error) {
      console.error("Error getting albums:", error);
      throw error;
    }
  };

  const handleUserTracks = async () => {
    try {
      const response = await userTracksGet(getAccessTokenSilently);
      setTracks(response);
    } catch (error) {
      console.error("Error getting tracks:", error);
      throw error;
    }
  };
  const handleDeleteTrack = async (trackId: string) => {
    try {

      const responseDelete = await trackDelete(trackId, getAccessTokenSilently);
      setTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId));
      const response = await userTracksGet(getAccessTokenSilently);
      setTracks(response);
    } catch (error) {
      console.error("Error getting tracks:", error);
      throw error;
    }
  };
  const createUserTracks = async (userId: string, trackData: FormData): Promise<Response> => {
    try {
      const response = await createTrack(userId, trackData, getAccessTokenSilently);
      setTracksCreated(response);
      handleUserTracks()
      return response;
    } catch (error) {
      console.error("Error getting tracks:", error);
      throw error;
    }
  };
  const modifyTrack = async (trackId: string, trackData: FormData): Promise<Response> => {
    try {
      const response = await trackPatch(trackData, trackId, getAccessTokenSilently);
      setTracks(response);
      return response;
    } catch (error) {
      console.error("Error getting tracks:", error);
      throw error;
    }
  };
  const getArtists = async (): Promise<Response> => {
    try {
      const response = await artistGet(getAccessTokenSilently);
      setArtist(response);
      return response;
    } catch (error) {
      console.error("Error getting artist:", error);
      throw error;
    }
  };
  const createNewArtist = async (formData: FormData): Promise<Response> => {
    try {
      const response = await createArtist(formData, getAccessTokenSilently);
      setArtistCreated(response);
      return response;
    } catch (error) {
      console.error("Error getting artist:", error);
      throw error;
    }
  };

  
  const createNewAlbum = async (formData: FormData,userId:string): Promise<Response> => {
    try {
      const response = await createAlbum(formData, userId, getAccessTokenSilently);
      setAlbumCreated(response);
      return response;
    } catch (error) {
      console.error("Error getting albums:", error);
      throw error;
    }
  };
  const createNewPlaylist = async (userEmail: string, formData: FormData): Promise<Response> => {
    try {
      const response = await createPlaylist(userEmail, formData, getAccessTokenSilently)
      setPlaylistCreated(response);
      handleUserPlaylistsCreated(userEmail)
      return response;
    } catch (error) {
      console.error("Error getting albums:", error);
      throw error;
    }
  };


  return (
    <UserMusicContext.Provider
      value={{
        playlistsCreated,
        newPlaylistCreated,
        playlistsLiked,
        playlistsAll,
        albums,
        tracks,
        deleteTrack,
        tracksCreated,
        artistCreated,
        albumCreated,
        artists,
        handleUserPlaylistsCreated,
        handleUserPlaylistsLiked,
        handlePlaylistsAll,
        handleUserAlbums,
        handleUserTracks,
        handleDeleteTrack,
        createUserTracks,
        modifyTrack,
        createNewArtist,
        getArtists,
        createNewAlbum,
        createNewPlaylist
      }}>
      {children}
    </UserMusicContext.Provider>
  );
};

export const useUserMusicContext = (): UserMusicContextType => {
  const context = useContext(UserMusicContext);
  if (!context) {
    throw new Error("useUserMusicContext debe ser utilizado dentro de un UserMusicProvider");
  }
  return context;
};
