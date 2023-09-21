import { Track } from "../types/data";
import { urlTracks } from "../context";


export const addReproductions = async (trackId: number) => {

    try {
        const response = await fetch(`${urlTracks}/${trackId}`);
        const track: Track = await response.json();
        const modifiedTrack = {
            ...track,
            reproductions: track.reproductions + 1
        };
        await fetch(`${urlTracks}/${trackId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(modifiedTrack)
        });
    }
    catch (error) {
        throw new Error('Error trying to connect to server');
    }
}
