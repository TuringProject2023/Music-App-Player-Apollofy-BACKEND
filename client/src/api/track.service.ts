import { urlTrack } from "../global";
export type GetTokenFunction = () => Promise<string>;

export const getAllTracks = async (url: string): Promise<any> => {
  try {
    const tracks = await fetch(url);
    const data = await tracks.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const trackPatch = async (
  trackData: FormData,
  id: string,
  getToken: GetTokenFunction
) => {
  try {
    const token = await getToken();
    const response: Response = await fetch(`${urlTrack}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: trackData,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorMessage = `Error updating track: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error updating track:", error);
    throw error;
  }
};




export const trackDelete = async (
  trackId: string,
  getToken: GetTokenFunction
) => {
  try {
    const token = await getToken();
    const response: Response = await fetch(`${urlTrack}/${trackId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error deleting track: ${errorData.message}`);
    }

    return response;
  } catch (error) {
    console.error("Error deleting track:", error);
    throw error;
  }
};
