import { urlUser } from "../global/urls/UrlApi";
import { User } from "../types/data";
urlUser


//id -> User Id recived from app by clicking the logged user in the selection button.
//selection -> Where the user are clicking in the app (playlist or track) --- Crear un ENUM?¿?
//type -> TRUE to add to list, FALSE to delete from list.
export const toggleLiked = async (Id: number, selection: string, selectionId: any, type: string) => {

    try {
        const response = await fetch(`${urlUser}/${Id}`);
        const user: User = await response.json();

        let modifiedPlaylist = [];
        let modifiedTrack = [];
        let modifiedUser: User = user;

        if (type === 'TRUE') {
            switch (selection) {
                case 'playlist':
                    modifiedPlaylist = [...user.favPlaylists, selectionId]
                    modifiedUser = { ...user, favPlaylists: modifiedPlaylist }
                    break;
                case 'track':
                    modifiedTrack = [...user.favTracks, selectionId]
                    modifiedUser = { ...user, favTracks: modifiedTrack }
                    break;
                default: throw new Error('Selection invalid')
            }

        } else if (type === 'FALSE') {
            switch (selection) {
                case 'playlist':
                    modifiedPlaylist = user.favPlaylists.filter((playlistId) => playlistId !== selectionId)
                    modifiedUser = { ...user, favPlaylists: modifiedPlaylist }
                    break;
                case 'track':
                    modifiedTrack = user.favTracks.filter((trackId) => trackId !== selectionId)
                    modifiedUser = { ...user, favTracks: modifiedTrack }
                    break;
            }
        } else {
            throw new Error('Selection invalid')
        }

        await fetch(`${urlUser}/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(modifiedUser)
        });

    }
    catch (error) {
        throw new Error('Error trying to connect to server');
    }
}
