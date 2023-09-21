import styled from 'styled-components';
import { useQueuePlayerContext } from '../../../context/QueuePlayerContext';
import { FaTimes } from 'react-icons/fa';
import { breakpoints } from '../../../styles/breakpoints';

export const PlayerContainer = () => {

  const { currentTrack, nextTracks, handleDeleteTrackInList } = useQueuePlayerContext();

  return (
    <PlayerContainerStyles >
      <div className="playerContainer">
        <img alt='player Image' className="playerContainer__img-big" src={currentTrack?.trackImage} />
        <h3 className="playerContainer__h3">{currentTrack?.trackName}</h3>
        <h4 className="playerContainer__span">{currentTrack?.artist.map(artist => artist.artistName).join(', ')}</h4>
        <span className="playerContainer__span">{currentTrack?.genre.map(genre => genre.genreName).join(', ')}</span>
      </div>
      <section className='playerList'>
        {nextTracks.length > 0 ? (
          nextTracks.map((track, index) => (
            <div key={track.id} className='playerList__track'>
              <h4>{index + 1}</h4>
              <h4>{track.trackName}</h4>
              <h5>{track.artist.map(artist => artist.artistName).join(', ')}</h5>
              <FaTimes className='playerList__track__icon' onClick={() => handleDeleteTrackInList(index)} />
            </div>
          ))
        ) : (
          <div className='playerList__track'>
            <h4>NO SONGS TRACKED...</h4>
          </div>
        )}
      </section>
    </PlayerContainerStyles>
  );
};


export const PlayerContainerStyles = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 90%;
.playerContainer{
  display: flex;
  height: 65%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 2rem;
  &__img-big{
    height: 75%;
    width: auto;
    padding-top: 1rem;
  }
  &__h3{
    color: #fff;
    font-size: 2rem;
  }
  &__span{
    color: rgba(255, 255, 255, 0.7);
  }
}
.playerList {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35%;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  border: 1px solid #340034;
  overflow-y: auto;

&__track {
  display: flex;
  width: 90%;
  padding: 1rem;
  justify-content: space-between;
  border: 1px solid #340034;
  border-radius: 0.5rem;
  & h4 {
    color: #fff;
    font-size: 2rem;
  }
  & h5 {
    color: rgba(255, 255, 255, 0.7);
    font-size: 2rem;
  }
  &__icon {
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
  }
}
}

@media (${breakpoints.min}px <= width <= ${breakpoints.tabletMax}px) {

.playerList {
  width: 100%;
  height: 35%;
  align-items: center;
  /* justify-content: center; */
  padding: 1rem 2rem;
  gap: 1rem;
  border: 1px solid #340034;
  overflow-y: auto;

&__track {
  display: flex;
  width: 90%;
  padding: 1rem;
  justify-content: space-between;
  border: 1px solid #340034;
  border-radius: 0.5rem;
  & h4 {
    color: #fff;
    font-size: 1.5rem;
    padding: 0 1rem;
  }
  & h5 {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.3rem;
  }
  &__icon {
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
  }
}
}


  
}


`;