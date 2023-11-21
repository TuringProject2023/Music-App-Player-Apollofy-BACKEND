import { useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useUserContext } from "../../hooks";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { PLAYLISTS } from "../../config/routes/paths";
import { breakpoints } from "../../styles/breakpoints";

export interface PlaylistProps {
  id: string;
  playlistImage?: string;
  playlistName: string;
  trackId?: string[];
}

const CardForPlaylistPlayerHome = ({ id, playlistImage, playlistName }: PlaylistProps) => {
  const { userData, handleUserData } = useUserContext();
  const [isLiked, setIsLiked] = useState(userData?.playlistLikedId.includes(id));

  

  const handleLiked = (id: string) => {
    handleUserData(id, "playlist");
    setIsLiked(!isLiked);
  };

  return (
    <CardForPlaylistPlayerHomeStyles>
      <Link to={`${PLAYLISTS}/${id}`} className={"cardForPlaylistPlayer"}>
        <div className="cardForPlaylistPlayer__header">
          <img className="cardForPlaylistPlayer__header_img" src={playlistImage} alt={`Track image: ${playlistName}`} />
        </div>
        <div className="cardForPlaylistPlayer__body">
          <h3 className="cardForPlaylistPlayer__body_title-h3">{playlistName}</h3>
        </div>
      </Link>

      <div className="addToLike" onClick={() => handleLiked(id)}>
        {isLiked ? <BsHeartFill className="addToLike__fill-heart" /> : <BsHeart className="addToLike__out-heart" />}
      </div>
    </CardForPlaylistPlayerHomeStyles>
  );
};

const CardForPlaylistPlayerHomeStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 25rem;
  height: 18rem;
  box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: rgba(50, 50, 50, 1);
  border: 1px solid rgba(66, 66, 66, 0.4);
  transition: all 0.3s;
  cursor: grabbing;
  &:hover {
    background-color: rgba(100, 100, 100, 1);
  }

  .cardForPlaylistPlayer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;

    overflow-y: auto;
    min-height: 120px;

    &__header {
      display: flex;
      align-items: center;
      position: relative;
      width: 10vw;
      height: 100%;
      border-radius: 0rem 0rem 0rem 0rem;
      overflow: hidden;
      &_img {
        position: absolute;
        width: 120px;
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
      }
    }
  }
  .addToLike {
    display: flex;
    position: absolute;
    justify-content: space-between;
    z-index: 10;
    transition: all 0.2s ease-in-out;

    &__fill-heart {
      font-size: 3rem;
      color: var(--color-text-gray);
      border: none;
      opacity: 0.9;
      cursor: grabbing;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: var(--color-text-gray-hover);
      }
    }
    &__out-heart {
      font-size: 3rem;
      color: var(--color-text-gray);
      border: none;
      opacity: 0.9;
      cursor: grabbing;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: var(--color-text-gray-hover);
      }
    }
    &:hover {
      transform: scale(1.25);
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
      cursor: grabbing;
    }

    .cardForPlaylistPlayer {
      display: grid;
      grid-area: 1 / 1 / 13 / 13;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding-top: 0.5rem;

      &__header {
        grid-area: 1 / 2 / 7 / 12;
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 0rem 0rem 0rem 0rem;
        width: 100%;
        height: 100%;
        object-fit: contain;
        overflow: hidden;
        &_img {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          opacity: 0.4;
        }
      }

      &__body {
        grid-area: 6 / 2 / 10 / 12;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        padding: 1vh;
        &_title {
          color: #fff;
          &-h3 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.5rem;
            color: var(--color-text-pink);
          }
        }
      }
    }
    .addToLike {
      grid-area: 11 / 2 / 12 / 3;
      position: relative;
      justify-content: space-between;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: start;
      align-items: flex-end;
      position: relative;
      padding-left: 1rem;
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
      &:hover {
        transform: scale(1);
      }
    }
  }

  @media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
    display: flex;
    position: relative;

    padding: 0.25rem;

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
   

    .cardForPlaylistPlayer {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;

      &__header {
        position: relative;
        display: flex;
        /* width: 100px; */
        height: 120px;
        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &_img {
          position: absolute;
          width: 100%;
          height: auto;
          object-fit: fill;
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
        }
      }
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

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    

    .cardForPlaylistPlayer {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
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
        }
      }
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

    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    

    .cardForPlaylistPlayer {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
      overflow-y: auto;
      min-height: 120px;

      &__header {
        position: relative;
        width: 10vw;
        height: 100%;
        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        object-fit: contain;
        &_img {
          position: absolute;
          width: 120px;
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
        }
      }
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
    width: 45rem;
    height: 20rem;
    box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: rgba(50, 50, 50, 1);
    border: 1px solid rgba(66, 66, 66, 0.4);
    transition: all 0.3s;
    &:hover {
      background-color: rgba(100, 100, 100, 1);
      cursor: grabbing;
    }

    .cardForPlaylistPlayer {
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
        overflow: hidden;
        object-fit: contain;
        &_img {
          position: absolute;
          width: 120px;
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
        }
      }
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

export default CardForPlaylistPlayerHome;
