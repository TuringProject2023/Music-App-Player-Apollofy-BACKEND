import { Link } from 'react-router-dom';
import { PLAYER } from '../../config/routes/paths';
import styled from 'styled-components';
import { useQueuePlayerContext } from '../../context/QueuePlayerContext';
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { BiSolidPlaylist } from 'react-icons/bi'
import { useState } from 'react';
import { breakpoints } from '../../styles/breakpoints';
import { useUserContext, useUserMusicContext } from '../../context';



interface Track {
  id: string;
  trackName: string;
  trackUrl: string;
  trackImage: string;
  artist: ArtistProps[];
  userData: any;
}
interface ArtistProps {
  artistName: string;
  artistImage: string;
  popularity: string;
  albumId: string[];
  genreId: string[];
}

const CardForTrack = ({ id, trackName, trackUrl, trackImage }: Track) => {

  const { tracks, artists } = useUserMusicContext();

  const { handleCurrentTrackById, handleNewTrackInList } = useQueuePlayerContext();
  const { userData, handleUserData } = useUserContext();
  const [isLiked, setIsLiked] = useState(userData?.tracksId.includes(id));

  const trackDetail = tracks.find(track => track.id === id);
  const trackArtistId = trackDetail?.artistId;
  const trackArtists = artists.filter(artist => trackArtistId?.includes(artist.id)).map(artist => artist.artistName);

  const handleLiked = (id: string) => {
    handleUserData(id, "track");
    setIsLiked(!isLiked);
  };

  return (
    <CardForTrackStyles key={id}>
      <Link className="cardForTrack" onClick={() => handleCurrentTrackById(id)} to={`${PLAYER}`}>
        <div className="cardForTrack__header">
          <img alt={trackName} className="cardForTrack__header_img" src={trackImage} />
        </div>
        <div className="cardForTrack__body">
          <h3 className="cardForTrack__body_title-h3">{trackName}</h3>
          <h4 className="cardForTrack__body_title-h5">{trackArtists.join(', ')}</h4>
        </div>
      </Link>
      <div className="addToQueue tooltip">
        <span className="tooltiptext">Add to play queue</span>
        <BiSolidPlaylist onClick={() => handleNewTrackInList(id)} />
      </div>
      <div className="addToLike" onClick={() => handleLiked(id)}>
        {isLiked ? <BsHeartFill className="addToLike__fill-heart" /> : <BsHeart className="addToLike__out-heart" />}
      </div>
    </CardForTrackStyles>
  );
};

const CardForTrackStyles = styled.div`
  display: flex;
  position: relative;

  padding: 0.25rem;
  gap: 1rem;
  /* margin: 10px; */

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
        width: 120px;
        height: 120px;
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
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 6em;
    background-color: rgba(0, 0, 0, 0.83);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 1.5rem;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 25%;
    right: 110%;
  }
  
  .tooltip .tooltiptext::after {
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

  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;
    gap: 1rem;
    /* margin: 10px; */

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
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding-top: 0.5rem;
      gap: 1rem;

      &__header {
        position: relative;
        width: 70px;
        height: 110px;
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
            font-size: 2.5vw;
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
        font-size: 1.5rem;
        align-items: end;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
      }
      &__out-heart {
        font-size: 1.5rem;
        color: var(--color-text-gray);
        border: none;
        opacity: 0.9;
        cursor: grabbing;
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
    background-color: rgba(50, 50, 50, 0.4);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 0.4);
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
    }
  }

  @media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;
    gap: 1rem;
    /* margin: 10px; */

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
          width: 120px;
          height: 120px;
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
          width: 120px;
          height: 120px;
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
      font-size: 2.5rem;
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
    /* margin: 10px; */

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
          width: 120px;
          height: 120px;
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
