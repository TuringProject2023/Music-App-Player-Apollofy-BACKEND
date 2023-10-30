import { urlTrack } from "../global";
import { Track } from "../types/data";



export const addReproductions = async (trackId: number) => {

    try {
        const response = await fetch(`${urlTrack}/${trackId}`);
        const track: Track = await response.json();
        const modifiedTrack = {
            ...track,
            reproductions: track.reproductions + 1
        };
        await fetch(`${urlTrack}/${trackId}`, {
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
