import { LazyExoticComponent, ComponentType, lazy } from "react";
import styled from "styled-components";
import { SearchBar } from "..";
import { useParams } from "react-router-dom";
import { breakpoints } from "../../styles/breakpoints";
import { useUserMusicContext } from "../../context/UserMusicContext";
import { BiSolidPlaylist } from 'react-icons/bi'
import { useQueuePlayerContext } from "../../context/QueuePlayerContext";

const LazyCards: LazyExoticComponent<ComponentType<any>> = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("../mainLibrary/cards/TracksForLibrary"));
    }, 1500);
  });
});

export const AlbumMainContainer = () => {
  const { id } = useParams();
  const { albums } = useUserMusicContext();
  const { handleListChange } = useQueuePlayerContext();

  const selectedAlbum = albums.find((album) => album.id === id);

  return (
    <>
      <AlbumMainContainerStyles>
        <SearchBar setSearchParams={undefined} searchParams={undefined} handleChangeParams={undefined} query={undefined} />

        <section className="titleDiv">
          <h2 className="titleDiv__h2">{selectedAlbum && selectedAlbum.albumName}<BiSolidPlaylist className="titleDiv__icon" onClick={() => handleListChange(selectedAlbum ? selectedAlbum?.trackId : [])} /> </h2>
        </section>
        <section className="zone-cards">
          {selectedAlbum?.track.map(({ id, trackName, trackUrl, trackImage, trackCreatedAt, artist }) => (
            <LazyCards key={id} id={id} trackName={trackName} trackUrl={trackUrl} trackImage={trackImage} trackCreatedAt={trackCreatedAt} artist={artist} />
          ))}
        </section>
      </AlbumMainContainerStyles>
    </>
  );
};

export const AlbumMainContainerStyles = styled.main`
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
      display: flex;
      font-size: 2rem;
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
