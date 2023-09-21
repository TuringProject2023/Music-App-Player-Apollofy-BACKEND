import { Link } from "react-router-dom";
import { PLAYER } from "../../../config/routes/paths";
import styled from "styled-components";
import { breakpoints } from "../../../styles/breakpoints";
import { useQueuePlayerContext } from "../../../context/QueuePlayerContext";
import { DropdownMenu } from "../../modal/modalUpdateTracks/DropdownMenu";

interface TrackProps {
  id: string;
  trackName: string;
  trackImage: string;
  trackCreatedAt: string;
  trackUpdatedAt: string;
  trackId: string;
  trackLikedById: string[];
  trackCreatedById: string[];
  genre: [{ genreName: string }];
  genreId: string[];
  artist: ArtistProps[];
  artistId: string[];
  trackUrl: string;
  albumId: string;
}
interface ArtistProps {
  id: string;
  artistName: string;
  artistImage: string;
  popularity: number;
  albumId: string[];
  genreId: string[];
  trackId: string[];
}

const TracksForLibrary = ({ id, trackName, trackUrl, trackImage, trackCreatedAt, artistId, artist, trackUpdatedAt, genre, genreId, albumId }: TrackProps) => {
  const { handleCurrentTrackById } = useQueuePlayerContext();

  return (
    <TracksForLibraryStyles key={id}>
      <Link className="cardForTrack" to={`${PLAYER}`} onClick={() => handleCurrentTrackById(id)}>
        <div className="cardForTrack__header">
          <img alt={trackName} className="cardForTrack__header_img" src={trackImage} />
        </div>
        <div className="cardForTrack__body">
          <h3 className="cardForTrack__body-trackName">{trackName}</h3>
          <div className="cardForTrack__body_title">
            {artist ? <h4 className="cardForTrack__body_title-artistName">{artist ? artist.map((art) => art.artistName).join(", ") : ""}</h4> : ""}
            <h4 className="cardForTrack__body_title-createdAt">{trackCreatedAt}</h4>
          </div>
        </div>
      </Link>
      <div className="cardForTrack__burguerBtn">
        <DropdownMenu
          id={id}
          trackName={trackName}
          trackImage={trackImage}
          trackCreatedAt={trackCreatedAt}
          trackUpdatedAt={trackUpdatedAt}
          trackLikedById={[]}
          trackCreatedById={[]}
          genre={genre}
          genreId={genreId}
          artistId={artistId}
          trackUrl={trackUrl}
          albumId={albumId}
        />
      </div>
    </TracksForLibraryStyles>
  );
};

const TracksForLibraryStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  gap: 1rem;
  background-color: rgba(50, 50, 50, 0.4);
  box-shadow: 12px 13px 15px 6px rgba(0, 0, 0, 0.8), 29px 36px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 0rem 1rem 1rem 0rem;
  border: 1px solid rgba(66, 66, 66, 0.4);
  transition: all 0.3s;

  &:hover {
    background-color: rgba(100, 100, 100, 0.4);
    cursor: pointer;
  }

  .cardForTrack {
    display: flex;
    min-height: 70px;
    gap: 1rem;
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      padding: 1vh;
      
      &_title {
        color: #fff;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 0.5rem;
        
        &-trackName {
          font-size: 3rem;
          color: var(--color-text-pink);
        }
        &-artistName {
          font-size: 0.75rem;
          color: var(--color-text-gray);
        }
        &-createdAt {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
    &__burguerBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-right: 3rem;
      & button {
        & svg {
          color: #fff;
        }
      }
    }
  }

  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    .cardForTrack {
      &__header {
        width: 70px;
        height: 70px;

        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &__img {
          width: 70px;
          height: 70px;
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
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 0.5rem;
          &-trackName {
            font-size: 1.5vw;
            color: var(--color-text-pink);
          }

          &-artistName {
            font-size: 1vw;
            color: var(--color-text-gray);
          }
          &-createdAt {
            font-size: 1vw;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
  }

  @media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
    .cardForTrack {
      &__header {
        width: 80px;
        height: 80px;

        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &__img {
          width: 80px;
          height: 80px;
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
        &-trackName {
          font-size: 1.5rem;
          color: var(--color-text-pink);
        }

        &_title {
          color: #fff;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 0.5rem;
          &-artistName {
            font-size: 1.25rem;
            color: var(--color-text-gray);
          }
          &-createdAt {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
  }

  @media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
    .cardForTrack {
      &__header {
        width: 80px;
        height: 80px;

        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &__img {
          width: 80px;
          height: 80px;
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
        &-trackName {
          font-size: 2rem;
          color: var(--color-text-pink);
        }

        &_title {
          color: #fff;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 0.5rem;
          &-artistName {
            font-size: 1.5rem;
            color: var(--color-text-gray);
            padding: 0;
          }
          &-createdAt {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.7);
            padding: 0;
          }
        }
      }
    }
  }

  @media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
    .cardForTrack {
      &__header {
        width: 110px;
        height: 110px;

        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &__img {
          width: 110px;
          height: 110px;
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
        &-trackName {
          font-size: 2.5rem;
          color: var(--color-text-pink);
        }

        &_title {
          color: #fff;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 0.5rem;
          &-artistName {
            font-size: 1.75rem;
            color: var(--color-text-gray);
            padding: 0;
          }
          &-createdAt {
            font-size: 1.75rem;
            color: rgba(255, 255, 255, 0.7);
            padding: 0;
          }
        }
      }
    }
  }

  @media (width > ${breakpoints.desktopMax}px) {
    .cardForTrack {
      &__header {
        width: 120px;
        height: 120px;

        border-radius: 0rem 0rem 0rem 0rem;
        overflow: hidden;
        &__img {
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
        &-trackName {
          font-size: 3rem;
          color: var(--color-text-pink);
        }

        &_title {
          color: #fff;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          gap: 0.5rem;
          &-artistName {
            font-size: 2rem;
            color: var(--color-text-gray);
            padding: 0;
          }
          &-createdAt {
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.7);
            padding: 0;
          }
        }
      }
    }
  }
`;

export default TracksForLibrary;
