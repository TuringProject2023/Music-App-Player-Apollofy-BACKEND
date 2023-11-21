
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveNextTracksToLS = (nextTracks: any, userEmail: string) => {

    try {
        const nextTracksLS = JSON.stringify(nextTracks);
        localStorage.setItem(`apollofy${userEmail}`, nextTracksLS);
    } catch (error) {
        console.error('Error while sending to local storage', error);
    }
}


export const loadNextTracksFromLS = (userEmail: string) => {
    try {
        const nextTracksLS = localStorage.getItem(`apollofy${userEmail}`);
        if (nextTracksLS) {
            const nextTracks = JSON.parse(nextTracksLS);
            return nextTracks;
        }
    } catch (error) {
        console.error('Error while getting from local storage:', error);
    }
    return [];
}