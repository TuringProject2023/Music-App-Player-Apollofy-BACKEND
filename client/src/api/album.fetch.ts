import { urlAlbum } from "../global";
import { toast } from "react-toastify";
export type GetTokenFunction = () => Promise<string>;

export const createAlbum = async (formData: FormData, userId: string, getToken: GetTokenFunction) => {
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
    toast.success("Album created successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    toast.error("Album was not created succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    throw error;
  }
};
export const updateAlbumById = async (formData: FormData, albumId: string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlAlbum}/${albumId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error in the album put request:", error);
    throw error;
  }
};
export const updateAlbumAddTrack = async (trackId: string, albumId: string) => {
  try {
    const formData = new FormData();
    formData.append("trackId", trackId);
    const response = await fetch(`${urlAlbum}/patch/${albumId}`, {
      method: "PATCH",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    console.log("llega hasta aqui");

    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const albumDelete = async (albumId: string, userId: string, getToken: GetTokenFunction): Promise<any> => {
  try {
    const token = await getToken();
    const response = await fetch(`${urlAlbum}/${albumId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      toast.error("Album was not deleted succesfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const errorData = await response.json();
      throw new Error(`Error deleting track: ${errorData.message}`);
    }
    toast.success("Album deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return response;
  } catch (error) {
    console.error("Error deleting track:", error);
    throw error;
  }
};
