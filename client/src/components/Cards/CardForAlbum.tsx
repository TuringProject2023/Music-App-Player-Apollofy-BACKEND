import { Link } from 'react-router-dom';
import { ALBUM } from '../../config/routes/paths';
import styled from 'styled-components';
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { breakpoints } from '../../styles/breakpoints';
import { useUserContext, useUserMusicContext } from '../../context';
import { useState } from 'react';

interface AlbumProps {
  id: string
  albumName: string
  albumUrl: string
  albumImage: string
}


const CardForAlbum = ({ id,
  albumName,
  albumUrl,
  albumImage, }: AlbumProps) => {

  const { albums, artists } = useUserMusicContext();
  const { userData, handleUserData } = useUserContext();
  const [isLiked, setIsLiked] = useState(userData?.albumId.includes(id));

  const albumDetail = albums.find(album => album.id === id);
  const albumArtistId = albumDetail?.artistId;
  const albumArtists = artists.filter(artist => albumArtistId?.includes(artist.id)).map(artist => artist.artistName);

  const handleLiked = (id: string) => {
    handleUserData(id, "album");
    setIsLiked(!isLiked)
  }

  return (
    <CardForAlbumStyles key={id}>
      <Link to={`${ALBUM}/${id}`} className="cardForAlbum">
        <div className="cardForAlbum__header">
          <img alt={albumUrl} className="cardForAlbum__header_img" src={albumImage} />
        </div>
        <div className="cardForAlbum__body">
          <h3 className="cardForAlbum__body_title-h3">{albumName}</h3>
          <h5 className="cardForAlbum__body_title-h5">{albumArtists.join(', ')}</h5>
        </div>
      </Link>
      <div className="addToLike" onClick={() => handleLiked(id)} >
        {isLiked ? <BsHeartFill className="addToLike__fill-heart" /> : <BsHeart className='addToLike__out-heart' />}
      </div>
    </CardForAlbumStyles>
  );
};

const CardForAlbumStyles = styled.div`
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

.cardForAlbum {
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

.cardForAlbum {
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

.cardForAlbum {
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

.cardForAlbum {
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

.cardForAlbum {
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

.cardForAlbum {
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


export default CardForAlbum