export interface Root {
  playlists: Playlist[];
  tracks: Track[];
  user: User[];
  albums: Album[];
  artists: Artist[];
  genres: Genre[];
}

export interface Playlist {
  id: number;
  name: string;
  isFollowed?: boolean;
  thumbnail: string;
  description?: string;
  publicAccessible?: boolean;
  primaryColor?: string;
  tracksList?: number[];
  liked?: boolean;
}

export interface Track {
  id: number;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string;
  liked: boolean;
  reproductions: number;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profilePicture: string;
  isLoggedin: boolean;
  favTracks: number[];
  favPlaylists: number[];
  id: string;
  userEmail: string;
  userName: string;
  userImage: string;
  userCreatedAt: DateTime;
  userUpdatedAt: DateTime;
  playlistLikedId: string[];
  playlistLiked: Playlist[];
  tracksId: string[];
  tracks: Track[];
  postId: string[];
  post: Post[];
  albumId: string[];
  album: Album[];
  albumCreatedId: string[];
  albumCreated: Album[];
  playlistCreatedId: string[];
  playlistCreated: Playlist[];
}

export interface Album {
  id: number;
  name: string;
  imageUrl: string;
  artist: string;
}

export interface Artist {
  id: number;
  name: string;
  genres: string[];
  popularity: number;
  photoUrl: string;
}

export interface Genre {
  id: number;
  name: string;
}

export type Props = {
  children: ReactNode;
};
