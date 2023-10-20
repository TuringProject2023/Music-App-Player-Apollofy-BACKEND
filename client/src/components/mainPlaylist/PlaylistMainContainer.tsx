import { LazyExoticComponent, ComponentType, lazy } from "react";
import styled from "styled-components";
import { SearchBar } from "..";
import { useParams, useSearchParams } from "react-router-dom";
import { breakpoints } from "../../styles/breakpoints";
import { useUserMusicContext } from "../../context/UserMusicContext";
import { BiSolidPlaylist } from "react-icons/bi";
import { useQueuePlayerContext } from "../../context/QueuePlayerContext";
import { TrackProps } from '../mainLibrary/cards/TracksForLibrary';


const LazyCards: LazyExoticComponent<ComponentType<TrackProps>> = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("../mainLibrary/cards/TracksForLibrary"));
    }, 1500);
  });
});

export const PlaylistMainContainer = () => {
  const { id } = useParams();
  const { playlistsAll } = useUserMusicContext();
  const { handleListChange } = useQueuePlayerContext();

  const selectedPlaylist = playlistsAll.find((playlist) => playlist.id === id);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleChangeParams = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: target.value });
  };

  return (
    <>
      <PlaylistMainContainerStyles>
        <SearchBar setSearchParams={undefined} searchParams={undefined} handleChangeParams={handleChangeParams} query={query} />

        <section className="titleDiv">
          <h2 className="titleDiv__h2">
            {selectedPlaylist && selectedPlaylist.playlistName} <BiSolidPlaylist className="titleDiv__icon" onClick={() => handleListChange(selectedPlaylist ? selectedPlaylist?.trackId : [])} />{" "}
          </h2>
        </section>
        <section className="zone-cards">
          {selectedPlaylist?.track.map(({ id, trackName, trackUrl, trackImage, trackCreatedAt, artist, trackCreatedById, trackLikedById, trackUpdatedAt, albumId, artistId, genre, genreId }) => (
            <LazyCards key={id} id={id} trackName={trackName} trackUrl={trackUrl} trackImage={trackImage} trackCreatedAt={trackCreatedAt} artist={artist} albumId={albumId} artistId={artistId} genre={ genre} genreId={genreId} trackCreatedById={trackCreatedById}  trackId="" trackLikedById={trackLikedById} trackUpdatedAt={trackUpdatedAt}  />
          ))}
        </section>
      </PlaylistMainContainerStyles>
    </>
  );
};

export const PlaylistMainContainerStyles = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;

  background: linear-gradient(#340034, #000);
  border-radius: 0.25rem;

  .titleDiv {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 0.5vh;
    color: white;
    &__h2 {
      font-size: 2rem;
      display: flex;
    }
    &__icon {
      display: flex;
      font-size: 2.5rem;
      cursor: grabbing;
      margin-left: 1rem;
    }
  }
  .selections {
    cursor: pointer;
  }
  .selection-active {
    color: var(--color-text-pink);
  }
  .zone-cards {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding: 2rem;
    gap: 1rem;
  }

  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    grid-area: 1 / 1 / 5 / 7;

    .zone-selector {
      font-size: 3vw;
    }
  }

  @media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
    grid-area: 1 / 1 / 5 / 7;

    .zone-selector {
      font-size: 3vw;
    }
  }

  @media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
    grid-area: 1 / 2 / 5 / 7;

    .zone-selector {
      font-size: 2vw;
    }
  }

  @media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
    grid-area: 1 / 2 / 5 / 7;

    .zone-selector {
      font-size: 2vw;
    }
  }

  @media (width > ${breakpoints.desktopMax}px) {
    grid-area: 1 / 2 / 5 / 7;

    .zone-selector {
      font-size: 2vw;
    }
  }
`;
