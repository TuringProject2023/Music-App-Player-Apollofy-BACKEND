import { urlPlaylist } from "../global";

export type GetTokenFunction = () => Promise<string>;
export const getAllPlaylist = async (getToken: GetTokenFunction) => {
  const token = await getToken();
  try {
    const response = await fetch(urlPlaylist, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const playlist = await response.json();

      return playlist;
    } else {
      console.error("Error updating user:", response.statusText);
    }
  } catch {
    throw new Error("Error while getting all playlist reference from mongoDB");
  }
};
export const getPlaylistById = async (
  getToken: GetTokenFunction,
  playlistId: string
) => {
  const token = await getToken();
  try {
    const response = await fetch(`${urlPlaylist}/${playlistId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const playlist = await response.json();
      return playlist;
    } else {
      console.error("Error updating user:", response.statusText);
    }
  } catch {
    throw new Error("Error while getting all playlist reference from mongoDB");
  }
};

export const createPlaylist = async (
  userEmail: string,
  formData: FormData,
  getToken: GetTokenFunction
) => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlPlaylist}/${userEmail}`, {
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
    console.error("error in the playlist post request:", error);
    throw error;
  }
};