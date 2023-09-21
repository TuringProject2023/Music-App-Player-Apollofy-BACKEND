import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styled from 'styled-components';
import { useQueuePlayerContext } from "../../context/QueuePlayerContext";
import { useEffect, useState } from "react";


export const AudioPlayerComponent = () => {

  const { currentTrack, handleNextTrackInList, handlePrevTrackInList } = useQueuePlayerContext();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentTrack?.trackUrl) {
      setIsPlaying(true);
    }
  }, [currentTrack])


  return (
    <AudioPlayerStyles>
      <AudioPlayer
        className="rhap_container"
        src={currentTrack?.trackUrl}
        showSkipControls={true}
        autoPlay={true}
        autoPlayAfterSrcChange={true}
        onClickNext={() => handleNextTrackInList()}
        onEnded={() => handleNextTrackInList()}
        showJumpControls={false}
        onClickPrevious={() => handlePrevTrackInList()}
      />
    </AudioPlayerStyles>
  );
};


export const AudioPlayerStyles = styled.div`
.rhap {
  &_container {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0 0 0 0;
    border: none;   
     
  }
  &_progress-bar{
    background-color: #000;
  }
  &_main-controls {
    
      &-button {
        font-size: 3rem; 
        color: var(--color-text-pink);
      }
    }
    &_additional-controls {
        &-button {
          font-size: 1px; 
        }
      }
}
  @media (width < 480px) {
    .rhap {
      &_main-controls {
        display:flex;
        align-items: center;
        justify-content: center;
      }
      
      }
    }

`;