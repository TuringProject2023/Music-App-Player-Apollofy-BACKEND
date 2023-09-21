import { urlAlbum, urlArtist, urlTrack, urlUser } from "../global";
import { User } from "@auth0/auth0-react";
export type GetTokenFunction = () => Promise<string>;

export const userPost = async (user: User | undefined, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error updating user:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const userGet = async (userEmail: string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlUser}/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      console.error("Error updating user:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const UserPatch = async (userUpdate: FormData, userId: string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response: Response = await fetch(`${urlUser}/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: userUpdate,
    });
      const data = await response.json();
      return data;
   
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const UserPatchLiked = async (incomingTrackId: string[], incomingAlbumId: string[], incomingPlaylistLikedId: string[], userEmail: string, getToken: GetTokenFunction) => {
  const tracksId = incomingTrackId.join(",");
  const albumId = incomingAlbumId.join(",");
  const playlistLikedId = incomingPlaylistLikedId.join(",");

  try {
    const token = await getToken();
    const response: Response = await fetch(`${urlUser}/liked/${userEmail}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tracksId, albumId, playlistLikedId }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorMessage = `Error updating user: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const userDelete = async (userId: string, getToken: GetTokenFunction) => {
  try {
    const token = getToken();
    const response: Response = await fetch(`${urlUser}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error deleting user: ${errorData.message}`);
    }

    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const userPlaylistsCreatedGet = async (userEmail: string, getToken: GetTokenFunction) => {
  try {
    const token = getToken();
    const response = await fetch(`${urlUser}/playlistCreated/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData.message}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error getting user playlists:", error);
    throw error;
  }
};

export const userPlaylistsLikedGet = async (userEmail: string, getToken: GetTokenFunction) => {
  try {
    const token = getToken();
    const response = await fetch(`${urlUser}/playlistLiked/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData.message}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error getting user playlists:", error);
    throw error;
  }
};

export const userAlbumsGet = async (getToken: GetTokenFunction) => {
  try {
    const token = getToken();
    const response = await fetch(urlAlbum, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData.message}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error getting user albums:", error);
    throw error;
  }
};

export const userTracksGet = async (getToken: GetTokenFunction) => {
  try {
    const token = getToken();
    const response = await fetch(urlTrack, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData.message}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error getting user tracks:", error);
    throw error;
  }
};

export const createArtist = async (formData: FormData, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response = await fetch(urlArtist, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    throw error;
  }
};

export const createTrack = async (userId: string, formData: FormData, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlTrack}/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    throw error;
  }
};

export const createAlbum = async (formData: FormData,userId:string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlAlbum}/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });    

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    throw error;
  }
};

export const toggleLikedPlaylist = async (userEmail: string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response: Response = await fetch(`${urlUser}/${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      const errorMessage = `Error updating user: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const artistGet = async (getToken: GetTokenFunction) => {
  try {
    const token = getToken();
    const response = await fetch(urlArtist, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error connecting to DB: ${errorData.message}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error getting artist:", error);
    throw error;
  }
};
