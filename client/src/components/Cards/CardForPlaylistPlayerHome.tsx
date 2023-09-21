import { useState } from "react";
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { useUserContext, useUserMusicContext } from "../../context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PLAYLISTS } from "../../config/routes/paths";
import { breakpoints } from "../../styles/breakpoints";


interface Playlist {
  id: string;
  playlistImage?: string;
  playlistName: string;
  trackId?: string;
}


const CardForPlaylistPlayerHome = ({ id, playlistImage, playlistName, trackId }: Playlist) => {

  const { userData, handleUserData } = useUserContext();
  const [isLiked, setIsLiked] = useState(userData?.playlistLikedId.includes(id));

  const handleLiked = (id: string) => {
    handleUserData(id, "playlist");
    setIsLiked(!isLiked)
  }

  return (
    <CardForPlaylistPlayerHomeStyles>
      <Link to={`${PLAYLISTS}/${id}`} className={'cardForPlaylistPlayer'} >
        <div className="cardForPlaylistPlayer__header">
          <img className="cardForPlaylistPlayer__header_img" src={playlistImage} alt={trackId} />
        </div>
        <div className="cardForPlaylistPlayer__body">
          <h3 className="cardForPlaylistPlayer__body_title-h3">{playlistName}</h3>
        </div>

      </Link>

      <div className="addToLike" onClick={() => handleLiked(id)} >
        {isLiked ? <BsHeartFill className="addToLike__fill-heart" /> : <BsHeart className='addToLike__out-heart' />}
      </div>

    </CardForPlaylistPlayerHomeStyles>
  );
};

const CardForPlaylistPlayerHomeStyles = styled.div`
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

  .cardForPlaylistPlayer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    /* position: relative; */
    gap: 1rem;
    overflow-y: auto;
    min-height: 120px;

    &__header{
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

  .cardForPlaylistPlayer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;
    gap: 1rem;

    &__header{
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

  .cardForPlaylistPlayer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;
    gap: 1rem;

    &__header{
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

  .cardForPlaylistPlayer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    /* position: relative; */
    gap: 1rem;
    overflow-y: auto;
    min-height: 120px;

    &__header{
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

  .cardForPlaylistPlayer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    /* position: relative; */
    gap: 1rem;
    overflow-y: auto;
    min-height: 120px;

    &__header{
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

  .cardForPlaylistPlayer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    /* position: relative; */
    gap: 1rem;
    overflow-y: auto;
    min-height: 120px;

    &__header{
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
