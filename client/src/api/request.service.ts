import { VITE_API } from "../global";

export type GetTokenFunction = () => Promise<string>;
export const getDataApi = async (endpoint: string,) => {
    // const token = await getToken();
    
    try {
      const response = await fetch(endpoint,  { method: "GET"  } );
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw new Error("error fetching data");
    }
}
