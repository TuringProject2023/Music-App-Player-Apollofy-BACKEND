/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyExoticComponent, ComponentType, lazy, useState } from "react";
import styled from "styled-components";
import { AlbumCreateForm, Modal, PlaylistCreateForm, SearchBar, TracksCreateForm } from "..";
import { useSearchParams } from "react-router-dom";
import { breakpoints } from "../../styles/breakpoints";
import { useUserMusicContext } from "../../context/UserMusicContext";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useModal } from "../../hooks/useModal";
import { AddDropdownMenu } from "../dropdownMenu/AddDropdownMenu";
import { useHover } from "../../hooks/useHover";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LazyPlaylistCards: LazyExoticComponent<ComponentType<any>> = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("./cards/PlaylistForLibrary"));
    }, 500);
  });
});
const LazyAlbumCards: LazyExoticComponent<ComponentType<any>> = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("./cards/AlbumForLibrary"));
    }, 500);
  });
});
const LazyTrackCards: LazyExoticComponent<ComponentType<any>> = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("./cards/TracksForLibrary"));
    }, 500);
  });
});

export const LibraryMainContainer = () => {
  const { playlistsAll, albums, tracks, playlistsCreated } = useUserMusicContext();
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);
  const [isOpenModal3, openModal3, closeModal3] = useModal(false);
  const [zoneSelected, setZoneSelected] = useState("playlists");
  const [isDropdownVisible, handleProfileHover, handleProfileLeave] = useHover();
  const [isDropdownVisible2, handleProfileHover2, handleProfileLeave2] = useHover();
  const [isDropdownVisible3, handleProfileHover3, handleProfileLeave3] = useHover();
  const handleChangeZoneSelected = (selection: string) => {
    setZoneSelected(selection);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleChangeParams = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: target.value });
  };

  
  return (
    <>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <PlaylistCreateForm closeModal={closeModal1} />
      </Modal>
      <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
        <AlbumCreateForm closeModal={closeModal2} />
      </Modal>
      <Modal isOpen={isOpenModal3} closeModal={closeModal3}>
        <TracksCreateForm closeModal={closeModal3} />
      </Modal>
      <div className="toasterContainer">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
      <LibraryMainContainerStyles>
        <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} query={query} handleChangeParams={handleChangeParams} />

        <section className="zone-selector">
          <span className={`selections ${zoneSelected === "playlists" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("playlists")}>
            Playlists
          </span>

          <span className={`selections ${zoneSelected === "myPlaylists" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("myPlaylists")}>
            <li
              className="button-icon"
              onMouseEnter={handleProfileHover} // Mostrar el menú cuando se hace hover
              onMouseLeave={handleProfileLeave} // Ocultar el menú cuando se deja de hacer hover
            >
              <IoEllipsisVerticalSharp />
              <ul className={`ul_second ${isDropdownVisible ? "visible" : ""}`}>{isDropdownVisible && <AddDropdownMenu isDropdownVisible={isDropdownVisible} openModal1={openModal1} />}</ul>
            </li>
            My Playlists
          </span>
          <span className={`selections ${zoneSelected === "albums" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("albums")}>
            <li
              className="button-icon"
              onMouseEnter={handleProfileHover2} // Mostrar el menú cuando se hace hover
              onMouseLeave={handleProfileLeave2} // Ocultar el menú cuando se deja de hacer hover
            >
              <IoEllipsisVerticalSharp />
              <ul className={`ul_second ${isDropdownVisible2 ? "visible" : ""}`}>{isDropdownVisible2 && <AddDropdownMenu isDropdownVisible={isDropdownVisible2} openModal1={openModal2} />}</ul>
            </li>
            Albums
          </span>
          <span className={`selections ${zoneSelected === "tracks" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("tracks")}>
            <li
              className="button-icon"
              onMouseEnter={handleProfileHover3} // Mostrar el menú cuando se hace hover
              onMouseLeave={handleProfileLeave3} // Ocultar el menú cuando se deja de hacer hover
            >
              <IoEllipsisVerticalSharp />
              <ul className={`ul_second ${isDropdownVisible3 ? "visible" : ""}`}>{isDropdownVisible3 && <AddDropdownMenu isDropdownVisible={isDropdownVisible3} openModal1={openModal3} />}</ul>
            </li>
            Tracks
          </span>
        </section>
        <section className="zone-cards">
          {zoneSelected === "playlists" &&
            playlistsAll &&
            playlistsAll
              .filter(({ playlistName }) => {
                if (!query) return true;
                if (query) {
                  const nameLowerCase = playlistName.toLowerCase();
                  return nameLowerCase.includes(query.toLowerCase());
                }
              })
              .map(({ id, playlistName, playlistImage, playlistCreatedById, trackId, artist, genre }) => (
                <LazyPlaylistCards
                  key={id}
                  id={id}
                  playlistName={playlistName}
                  playlistImage={playlistImage}
                  playlistCreatedById={playlistCreatedById}
                  trackId={trackId}
                  artist={artist}
                  genre={genre}
                />
              ))}

          {zoneSelected === "myPlaylists" &&
            playlistsCreated &&
            playlistsCreated
              .filter(({ playlistName }) => {
                if (!query) return true;
                if (query) {
                  const nameLowerCase = playlistName.toLowerCase();
                  return nameLowerCase.includes(query.toLowerCase());
                }
              })
              .map(({ id, playlistName, playlistImage, playlistCreatedById, trackId, artist, genre }) => (
                <LazyPlaylistCards
                  key={id}
                  id={id}
                  playlistName={playlistName}
                  playlistImage={playlistImage}
                  playlistCreatedById={playlistCreatedById}
                  trackId={trackId}
                  artist={artist}
                  genre={genre}
                />
              ))}

          {zoneSelected === "albums" &&
            albums &&
            albums
              .filter(({ albumName }) => {
                if (!query) return true;
                if (query) {
                  const nameLowerCase = albumName.toLowerCase();
                  return nameLowerCase.includes(query.toLowerCase());
                }
              })
              .map(({ id, albumName, albumImage, albumCreatedAt, artist, trackId, artistId, genre }) => (
                <LazyAlbumCards key={id} id={id} albumName={albumName} albumImage={albumImage} albumCreatedAt={albumCreatedAt} artist={artist} trackId={trackId} artistId={artistId} genre={genre} />
              ))}

          {zoneSelected === "tracks" &&
            tracks &&
            tracks
              .filter(({ trackName }) => {
                if (!query) return true;
                if (query) {
                  const nameLowerCase = trackName.toLowerCase();
                  return nameLowerCase.includes(query.toLowerCase());
                }
              })
              .map(({ id, trackName, trackUrl, trackImage, trackCreatedAt, artist, genreId, genre, artistId, albumId }) => (
                <LazyTrackCards
                  key={id}
                  id={id}
                  trackName={trackName}
                  trackUrl={trackUrl}
                  trackImage={trackImage}
                  trackCreatedAt={trackCreatedAt}
                  artist={artist}
                  trackUpdatedAt={""}
                  trackLikedById={[]}
                  trackCreatedById={[]}
                  genre={genre}
                  genreId={genreId}
                  artistId={artistId}
                  albumId={albumId}
                  trackId={id}
                />
              ))}
        </section>
      </LibraryMainContainerStyles>
    </>
  );
};

const LibraryMainContainerStyles = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;

  background: linear-gradient(#340034, #000);
  border-radius: 0.25rem;

  .toasterContainer {
    position: fixed;
    top: 10%; /* Centra verticalmente */
    left: 50%; /* Centra horizontalmente */
    transform: translate(-50%, -50%); /* Ajusta el centro */
    font-family: system-ui, "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif;
    width: 320px;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background: #84d65a;
    border-radius: 8px;
    box-shadow: 0px 0px 5px -3px #111;
  }
  .zone-selector {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 0.5vh;
    color: white;
  }
  .selections {
    display: flex;
    align-items: center;
    justify-content: center;
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
  .button-icon {
    position: relative;
    display: inline-block;
    position: relative;
    font-size: 1.2rem;
    background-color: transparent;
    border: none;
    transition: all 0.2s linear;
    cursor: pointer;
  }
  & svg {
    font-size: clamp(0.8rem, 2.3rem, 3rem);
    color: var(--color-text-pink);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  .ul_second {
    position: absolute;
    left: -9rem;
    top: 0rem;
    opacity: 0; /* Inicialmente oculto */
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease; /* Transiciones suaves en el menú desplegable */
  }

  /* Añade un retraso de 0.5s al ocultar el menú desplegable */
  .ul_second:not(.visible) {
    transition: opacity 0.3s ease 0.5s, transform 0.3s ease 0.5s;
  }

  .ul_second.visible {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.3s;
  }

  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    grid-area: 1 / 1 / 5 / 7;

    .zone-selector {
      font-size: 3vw;
    }
    /* .ul_second {
      position: absolute;
      right: 2.5rem;
      top: 0.5rem;
      
      transform: translateY(20px);
     
      transition: opacity 0.5s ease, transform 0.5s ease;
      
    }

    .ul_second.visible {
      opacity: 1;
     
      transition-duration: 0.5s;
      transform: translateY(0);
      
    } */
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
