import { LazyExoticComponent, ComponentType, lazy, useState } from "react";
import styled from "styled-components";
import { AlbumCreateForm, Modal, PlaylistCreateForm, SearchBar, TracksCreateForm } from "..";
import { useSearchParams } from "react-router-dom";
import { breakpoints } from "../../styles/breakpoints";
import { useUserMusicContext } from "../../context/UserMusicContext";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useModal } from "../../hooks/useModal";
import { useUserContext } from "../../context";
import { AddDropdownMenu } from "../dropdownMenu/AddDropdownMenu";
import { useHover } from "../../hooks/useHover";


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
  const { userData } = useUserContext();
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
      <LibraryMainContainerStyles>
        <SearchBar setSearchParams={undefined} searchParams={undefined} handleChangeParams={undefined} query={undefined} />

        <section className="zone-selector">
          <span className={`selections ${zoneSelected === "playlists" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("playlists")}>
            Playlists
          </span>

          <span className={`selections ${zoneSelected === "myPlaylists" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("myPlaylists")}
          >
            My Playlists
            <li className='button-icon'
              onMouseEnter={handleProfileHover} // Mostrar el menú cuando se hace hover
              onMouseLeave={handleProfileLeave} // Ocultar el menú cuando se deja de hacer hover
            >
              <IoEllipsisVerticalSharp />
              <ul className={`ul_second ${isDropdownVisible ? 'visible' : ''}`}>
                {isDropdownVisible && <AddDropdownMenu isDropdownVisible={isDropdownVisible}
                  openModal1={openModal1} />}
              </ul>
            </li>
          </span>
          <span className={`selections ${zoneSelected === "albums" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("albums")}>
            Albums
            <li className='button-icon'
              onMouseEnter={handleProfileHover2} // Mostrar el menú cuando se hace hover
              onMouseLeave={handleProfileLeave2} // Ocultar el menú cuando se deja de hacer hover
            >
              <IoEllipsisVerticalSharp />
              <ul className={`ul_second ${isDropdownVisible2 ? 'visible' : ''}`}>
                {isDropdownVisible2 && <AddDropdownMenu isDropdownVisible={isDropdownVisible2}
                  openModal1={openModal2} />}
              </ul>
            </li>
          </span>
          <span className={`selections ${zoneSelected === "tracks" ? "selection-active" : ""}`} onClick={() => handleChangeZoneSelected("tracks")}>
            Tracks
            <li className='button-icon'
              onMouseEnter={handleProfileHover3} // Mostrar el menú cuando se hace hover
              onMouseLeave={handleProfileLeave3} // Ocultar el menú cuando se deja de hacer hover
            >
              <IoEllipsisVerticalSharp />
              <ul className={`ul_second ${isDropdownVisible3 ? 'visible' : ''}`}>
                {isDropdownVisible3 && <AddDropdownMenu isDropdownVisible={isDropdownVisible3}
                  openModal1={openModal3} />}
              </ul>
            </li>
          </span>
        </section>
        <section className="zone-cards">
          {zoneSelected === "playlists" &&
            playlistsAll &&
            playlistsAll
              .filter((playlist) => userData?.playlistLikedId.includes(playlist.id))
              .map(({ id, playlistName, playlistImage, playlistCreatedById, trackId, artist, genre }) => (
                <LazyPlaylistCards key={id} id={id} playlistName={playlistName} playlistImage={playlistImage} playlistCreatedById={playlistCreatedById} trackId={trackId} artist={artist} genre={genre} />
              ))}

          {zoneSelected === "myPlaylists" &&
            playlistsCreated &&
            playlistsCreated
              .map(({ id, playlistName, playlistImage, playlistCreatedById, trackId, artist, genre }) => (
                <LazyPlaylistCards key={id} id={id} playlistName={playlistName} playlistImage={playlistImage} playlistCreatedById={playlistCreatedById} trackId={trackId} artist={artist} genre={genre} />
              ))}

          {zoneSelected === "albums" &&
            albums &&
            albums
              .filter((album) => userData?.albumId.includes(album.id))
              .map(({ id, albumName, albumImage, albumCreatedAt, artist, trackId, artistId, genre }) => (
                <LazyAlbumCards key={id} id={id} albumName={albumName} albumImage={albumImage} albumCreatedAt={albumCreatedAt} artist={artist} trackId={trackId} artistId={artistId} genre={genre} />
              ))}

          {zoneSelected === "tracks" &&
            tracks &&
            tracks
              .filter((track) => userData?.tracksId.includes(track.id))
              .map(({ id, trackName, trackUrl, trackImage, trackCreatedAt, artist, genreId, genre, artistId, albumId }) => (
                <LazyTrackCards key={id} id={id} trackName={trackName} trackUrl={trackUrl} trackImage={trackImage} trackCreatedAt={trackCreatedAt} artist={artist} trackUpdatedAt={""} trackLikedById={[]} trackCreatedById={[]} genre={genre} genreId={genreId} artistId={artistId} albumId={albumId} trackId={id} />
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
  /* .tooltip {
 position: relative;
 display: inline-block;
} */

/* .tooltip .tooltiptext {
 visibility: hidden;
 width: 3em;
 background-color: rgba(0, 0, 0, 0.253);
 color: #fff;
 text-align: center;
 border-radius: 6px;
 font-size: 1.5rem;
 padding: 5px 0;
 position: absolute;
 z-index: 1;
 top: 25%;
 left: 110%;
} */

/* .tooltip .tooltiptext::after {
 content: "";
 position: absolute;
 top: 50%;
 right: 100%;
 margin-top: -5px;
 border-width: 5px;
 border-style: solid;
 border-color: transparent rgba(0, 0, 0, 0.253) transparent transparent;
}

.tooltip:hover .tooltiptext {
 visibility: visible;
} */

.ul_second {
    position: absolute;
    left: 2.5rem;
    top: 0rem;
    /* Empieza con opacidad 0 para la transición */
    transform: translateY(20px);
    /* Empieza un poco arriba para la transición */
    transition: opacity 0.5s ease, transform 0.5s ease;
    /* Transiciones suaves en el menú desplegable */
}

.ul_second.visible {
    opacity: 1;
    /* Cambia la opacidad a 1 cuando es visible */
    transform: translateY(0);
    /* Vuelve a la posición original cuando es visible */
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

