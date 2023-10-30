import { urlAlbum } from "../global";
import { toast } from "react-toastify";
export type GetTokenFunction = () => Promise<string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let toastLoading: any;
const createLoadingToast = (variable: string) => {
   toastLoading = toast.loading(`The Album is being ${variable}.`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return toastLoading;

}
export const createAlbum = async (formData: FormData, userId: string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    createLoadingToast("created")
    const response = await fetch(`${urlAlbum}/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json();
    toast.update(toastLoading, {render: "The album is created", type: "success", isLoading: false, autoClose: 3000})
  
    
    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    toast.update(toastLoading, {render: "The album is not created", type: "error", isLoading: false, autoClose: 3000})

    throw error;
  } 
};
export const updateAlbumById = async (formData: FormData, albumId: string, getToken: GetTokenFunction) => {
  try {
    const token = await getToken();
    createLoadingToast("updated")

    const response = await fetch(`${urlAlbum}/${albumId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    toast.update(toastLoading, {render: "Album is updated successfully", type: "success", isLoading: false, autoClose: 3000})

    return data;
  } catch (error) {
    console.error("error in the album put request:", error);
    toast.update(toastLoading, {render: "The album is not updated", type: "error", isLoading: false, autoClose: 3000})

    throw error;
  }
};
export const updateAlbumAddTrack = async (trackId: string, albumId: string, getToken: GetTokenFunction) => {
  try {

    const token = await getToken();

    const formData = new FormData();
    formData.append("trackId", trackId);
    createLoadingToast("updated")
    const response = await fetch(`${urlAlbum}/patch/${albumId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    toast.update(toastLoading, {render: "Album is updated successfully", type: "success", isLoading: false, autoClose: 3000})


    return data;
  } catch (error) {
    console.error("error in the track post request:", error);
    toast.update(toastLoading, {render: "The album is not updated", type: "error", isLoading: false, autoClose: 3000})

    throw error;
  }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const albumDelete = async (albumId: string, userId: string, getToken: GetTokenFunction): Promise<unknown> => {
  
  try {
    const token = await getToken();
    createLoadingToast("deleted")
   
    const response = await 
       fetch(`${urlAlbum}/${albumId}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      })
      
    if (!response.ok) {
      
      const errorData = await response.json();
      throw new Error(`Error deleting track: ${errorData.message}`);
    }
    toast.update(toastLoading, {render: "The album is deleted", type: "success", isLoading: false, autoClose: 3000})
   
    return response;
  } catch (error) {
    toast.update(toastLoading, {render: "The album is not deleted", type: "error", isLoading: false, autoClose: 3000})

    console.error("Error deleting track:", error);

    throw error;
  }
};
