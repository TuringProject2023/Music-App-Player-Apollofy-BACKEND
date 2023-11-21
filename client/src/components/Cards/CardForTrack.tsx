import { Link } from "react-router-dom";
import { PLAYER } from "../../config/routes/paths";
import styled from "styled-components";
import { useQueuePlayerContext } from "../../hooks/useQueuePlayerContext";
import { BsHeartFill, BsHeart, BsJournalAlbum } from "react-icons/bs";
import { BiSolidPlaylist } from "react-icons/bi";
import { useState } from "react";
import { breakpoints } from "../../styles/breakpoints";
import { useUserContext, useUserMusicContext } from "../../hooks";


export interface TrackProps {
  id: string;
  trackName: string;
  trackUrl: string;
  trackImage: string;
  artist: ArtistProps[];
  // userData: User;
}
interface ArtistProps {
  artistName: string;
  artistImage: string;
  popularity: string;
  albumId: string[];
  genreId: string[];
}

const CardForTrack = ({ id, trackName, trackImage }: TrackProps) => {
  const { tracks, artists, albums, modifyAlbumAddingTrack } = useUserMusicContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { handleCurrentTrackById, handleNewTrackInList } = useQueuePlayerContext();
  const { userData, handleUserData } = useUserContext();
  

  const [isLiked, setIsLiked] = useState(userData?.tracksId.includes(id));

  const trackDetail = tracks.find((track) => track.id === id);
  const trackArtistId = trackDetail?.artistId;
  const trackArtists = artists.filter((artist) => trackArtistId?.includes(artist.id)).map((artist) => artist.artistName);

  const handleLiked = (id: string) => {
    handleUserData(id, "track");
    setIsLiked(!isLiked);
  };
  const handleOpenModalUpdateAlbum = () => {
    setIsOpenModal(!isOpenModal);
  };
  // console.log(getAccessTokenSilently)

  const handleUpdateAlbumAddingTrack = async (albumId: string) => {
    
    try {
      await modifyAlbumAddingTrack(id, albumId);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardForTrackStyles key={id}>
      <Link className="cardForTrack" onClick={() => handleCurrentTrackById(id)} to={`${PLAYER}`}>
        <div className="cardForTrack__header">
          <img alt={trackName} className="cardForTrack__header_img" src={trackImage} />
        </div>
        <div className="cardForTrack__body">
          <h3 className="cardForTrack__body_title-h3">{trackName}</h3>
          <h4 className="cardForTrack__body_title-h4">{trackArtists.join(", ")}</h4>
        </div>
      </Link>
      <div className="cardForTrack__footer ">
        <div className="cardForTrack__footer_dropdownListDiv">
          <ul className="cardForTrack__footer_dropdownListDiv_ul">
            <li className="cardForTrack__footer_dropdownListDiv_ul-li">
              <span className="cardForTrack__footer_dropdownListDiv_ul-li-span " onClick={() => handleOpenModalUpdateAlbum()}>
                <BiSolidPlaylist className="cardForTrack__footer_dropdownListDiv_ul-li-span-icon" />
                {isOpenModal ? (
                  <ul className="cardForTrack__footer_dropdownListDiv_ul-li-span-AlbumsList-active">
                    {albums.map((album) => (
                      <li key={album.id} onClick={() => handleUpdateAlbumAddingTrack(album.id)} className="cardForTrack__footer_dropdownListDiv_ul-li-span-AlbumsList-active-li">
                        {album.albumName}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="cardForTrack__footer_dropdownListDiv_ul-li-span-AlbumsList"></ul>
                )}
                Add to Album
              </span>
            </li>
            <li className="cardForTrack__footer_dropdownListDiv_ul-li">
              <span className="cardForTrack__footer_dropdownListDiv_ul-li-span tooltiptext" onClick={() => handleNewTrackInList(id)}>
                <BiSolidPlaylist className="cardForTrack__footer_dropdownListDiv_ul-li-span-icon" />
                Add to playlist
              </span>
            </li>
            <li className="cardForTrack__footer_dropdownListDiv_ul-li">
              <span className="cardForTrack__footer_dropdownListDiv_ul-li-span" onClick={() => handleNewTrackInList(id)}>
                <BsJournalAlbum className="cardForTrack__footer_dropdownListDiv_ul-li-span-icon" />
                Add to play queue
              </span>
            </li>
          </ul>
        </div>
        <BiSolidPlaylist className="addToQueue" />
      </div>
      <div className="addToLike" onClick={() => handleLiked(id)}>
        {isLiked ? <BsHeartFill className="addToLike__fill-heart" /> : <BsHeart className="addToLike__out-heart" />}
      </div>
    </CardForTrackStyles>
  );
};

const CardForTrackStyles = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  padding: 0.25rem;
  gap: 1rem;
  width: 25rem;
  height: 18rem;

  box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: rgba(50, 50, 50, 0.4);
  border: 1px solid rgba(66, 66, 66, 0.4);
  transition: all 0.3s;
  &:hover {
    background-color: rgba(100, 100, 100, 0.4);
    cursor: pointer;
  }

  .cardForTrack {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    overflow-y: auto;
    min-height: 120px;

    &__header {
      position: relative;
      width: 10vw;
      height: 100%;
      border-radius: 5%;
      overflow: hidden;
      &_img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.8;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      padding: 1vh;
      &_title {
        color: #fff;
        &-h3 {
          font-size: 1.5vw;
          color: var(--color-text-pink);
        }
        &-h4 {
          font-size: 1vw;
          color: var(--color-text-gray);
        }
        &-h5 {
          font-size: 0.75vw;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
    &__footer {
      display: flex;
      position: absolute;
      justify-content: space-between;
      bottom: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      font-size: 3rem;
      color: var(--color-text-gray);
      cursor: pointer;
      width: 40px;
      height: 40px;
      transition: all 2.8s ease-in-out;

      &_dropdownListDiv {
        display: none;
        content: "";
        position: absolute;
        bottom: 0%;
        left: 100%;
        margin-top: -5px;
        border: 1px solid rgba(0, 0, 0, 1);
        border-radius: 10px;
        background-color: #0d1117;
        width: 300px;
        height: 150px;
        z-index: 20;
        opacity: 0;

        &_ul {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;

          &-li {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 33%;
            color: #eeeded;
            border: 1px solid rgba(0, 0, 0, 0.8);
            padding-left: 1rem;
            &:hover {
              background-color: #21262c;
            }
            &-span {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              &-icon {
                margin-right: 1rem;
              }
              &-AlbumsList {
                display: none;
                &-active {
                  position: absolute;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: center;
                  top: 0;
                  left: -100%;
                  width: 600px;
                  height: 300px;
                  z-index: 1000;
                  border: 1px solid rgba(0, 0, 0, 1);
                  border-radius: 10px;
                  background-color: var(--color-text-gray);
                  overflow: scroll;
                  &-li {
                    color: black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.5rem;
                    width: 100%;
                    border: 1px solid rgba(0, 0, 0, 1);
                  }
                }
              }
            }
          }
        }
      }
      &:hover .cardForTrack__footer_dropdownListDiv {
        display: flex;
        opacity: 1;
        transition: 2.8s ease-out;
      }
    }
  }

  .addToLike {
    grid-area: 11 / 1 / 12 / 3;
    position: relative;
    justify-content: space-between;
    width: 40px;
    height: 40px;
    font-size: 2.5rem;

    display: flex;
    justify-content: start;
    align-items: flex-end;
    position: relative;
    z-index: 10;
    &__fill-heart {
      font-size: 2.5rem;
      align-items: end;
      color: var(--color-text-gray);
      border: none;
      opacity: 0.9;
      cursor: grabbing;
    }
    &__out-heart {
      font-size: 2.5rem;
      color: var(--color-text-gray);
      border: none;
      opacity: 0.9;
      cursor: grabbing;
    }
    &:hover {
      transform: scale(1);
    }
  }

  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    display: grid;
    position: relative;
    grid-template-columns: 0.25fr 0.5fr repeat(8, 1fr) 0.5fr 0.25fr;
    grid-template-rows: 0.25fr repeat(5, 1fr) 0.25fr repeat(2, 1fr) 0.25fr 1fr 0.25fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    height: 100%;
    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 1);
      cursor: pointer;
    }

    .cardForTrack {
      display: grid;
      grid-area: 1 / 1 / 13 / 13;

      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      gap: 0;

      &__header {
        grid-area: 1 / 2 / 7 / 12;
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
        &_img {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;

          opacity: 0.8;
        }
      }

      &__body {
        grid-area: 6 / 2 / 10 / 12;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: space-around;
        overflow: none;
        &_title {
          color: #fff;
          &-h3 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.5rem;
            color: var(--color-text-pink);
          }
          &-h4 {
            /* grid-area: 9 / 2 / 10 / 12; */
            font-size: 1rem;
            color: var(--color-text-gray);
          }
        }
      }
    }
    .addToQueue {
      grid-area: 11 / 11 / 12 / 12;
      position: relative;
      justify-content: space-between;
      width: 40px;
      height: 40px;
      z-index: 10;
      font-size: 2rem;
      color: var(--color-text-gray);
      cursor: pointer;
    }
    .addToLike {
      grid-area: 11 / 1 / 12 / 3;
      position: relative;
      justify-content: space-between;
      width: 40px;
      height: 40px;
      font-size: 2.5rem;

      display: flex;
      justify-content: start;
      align-items: flex-end;
      position: relative;
      z-index: 10;
      &__fill-heart {
        font-size: 2.5rem;
        align-items: end;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &__out-heart {
        font-size: 2.5rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &:hover {
        transform: scale(1);
      }
    }
  }

  @media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;
    gap: 1rem;
    /* margin: 10px; */

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 1);
      cursor: pointer;
    }

    .cardForTrack {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding-top: 0.5rem;
      gap: 1rem;

      &__header {
        position: relative;
        width: 100px;
        height: 120px;
        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &_img {
          position: absolute;
          width: 100%;
          height: auto;
          object-fit: cover;
          opacity: 0.8;
        }
      }

      &__body {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        padding: 1vh;
        &_title {
          color: #fff;
          &-h3 {
            font-size: 2vw;
            color: var(--color-text-pink);
          }
          &-h4 {
            font-size: 1.5vw;
            color: var(--color-text-gray);
          }
          &-h5 {
            font-size: 1vw;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
    .addToQueue {
      display: flex;
      position: absolute;
      justify-content: space-between;
      bottom: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      font-size: 2rem;
      color: var(--color-text-gray);
      cursor: pointer;
    }
    .addToLike {
      position: absolute;
      display: flex;
      justify-content: start;
      align-items: flex-end;
      bottom: 0.5rem;
      left: 0.5rem;
      z-index: 10;
      &__fill-heart {
        font-size: 2rem;
        align-items: end;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &__out-heart {
        font-size: 2rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &:hover {
        transform: scale(1);
      }
    }
  }

  @media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;
    gap: 1rem;
    /* margin: 10px; */

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 1);
      cursor: pointer;
    }

    .cardForTrack {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
      /* position: relative; */
      gap: 1rem;
      overflow-y: auto;
      min-height: 120px;

      &__header {
        position: relative;
        width: 10vw;
        height: 120px;
        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &_img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
        }
      }

      &__body {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        padding: 1vh;
        &_title {
          color: #fff;
          &-h3 {
            font-size: 1.5vw;
            color: var(--color-text-pink);
          }
          &-h4 {
            font-size: 1vw;
            color: var(--color-text-gray);
          }
          &-h5 {
            font-size: 0.75vw;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
    .addToQueue {
      display: flex;
      position: absolute;
      justify-content: space-between;
      bottom: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      font-size: 2rem;
      color: var(--color-text-gray);
      cursor: grabbing;
    }
    .addToLike {
      display: flex;
      position: absolute;
      justify-content: space-between;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      &__fill-heart {
        font-size: 2rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &__out-heart {
        font-size: 2rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
    }
  }

  @media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;
    gap: 1rem;
    /* margin: 10px; */

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 1);
      cursor: pointer;
    }

    .cardForTrack {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
      /* position: relative; */
      gap: 1rem;
      overflow-y: auto;
      min-height: 120px;

      &__header {
        position: relative;
        width: 10vw;
        height: 120px;
        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &_img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
        }
      }

      &__body {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        padding: 1vh;
        &_title {
          color: #fff;
          &-h3 {
            font-size: 1.5vw;
            color: var(--color-text-pink);
          }
          &-h4 {
            font-size: 1vw;
            color: var(--color-text-gray);
          }
          &-h5 {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
    /* .addToQueue {
      display: flex;
      position: absolute;
      justify-content: space-between;
      bottom: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      font-size: 2.5rem;
      color: var(--color-text-gray);
      cursor: grabbing;
    } */
    .addToLike {
      display: flex;
      position: absolute;
      justify-content: space-between;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      &__fill-heart {
        font-size: 2.5rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &__out-heart {
        font-size: 2.5rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
    }
  }

  @media (width > ${breakpoints.desktopMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;
    gap: 1rem;
    width: 45rem;
    height: 20rem;

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 1);
      cursor: pointer;
    }

    .cardForTrack {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
      /* position: relative; */
      gap: 1rem;
      overflow-y: auto;
      min-height: 120px;

      &__header {
        position: relative;
        width: 10vw;
        height: 100%;
        border-radius: 0rem 0rem 0rem 0rem;
        object-fit: cover;
        overflow: hidden;
        &_img {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
      }

      &__body {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        padding: 1vh;
        &_title {
          color: #fff;
          &-h3 {
            font-size: 1.5vw;
            color: var(--color-text-pink);
          }
          &-h4 {
            font-size: 1vw;
            color: var(--color-text-gray);
          }
          &-h5 {
            font-size: 0.75vw;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
    .addToQueue {
      display: flex;
      position: absolute;
      justify-content: space-between;
      bottom: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      font-size: 3rem;
      color: var(--color-text-gray);
      cursor: grabbing;
    }
    .addToLike {
      display: flex;
      position: absolute;
      justify-content: space-between;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 10;
      &__fill-heart {
        font-size: 3rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &__out-heart {
        font-size: 3rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
    }
  }
`;

export default CardForTrack;
