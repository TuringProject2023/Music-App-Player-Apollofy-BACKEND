import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styled from "styled-components";
import { useQueuePlayerContext } from "../../context/QueuePlayerContext";
import { useEffect, useState } from "react";

export const AudioPlayerComponent = () => {
  const { currentTrack, handleNextTrackInList, handlePrevTrackInList } = useQueuePlayerContext();
  // const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   if (currentTrack?.trackUrl) {
  //     setIsPlaying(true);
  //   }
  // }, [currentTrack]);

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
    &_time{
      color: rgba(207, 80, 80, 0.651);

    }
    &_container {
      background-color: rgba(0, 0, 0, 0);
      box-shadow: 0 0 0 0;
      border: none;
    }
    &_progress-bar {
      background-color: rgba(0, 0, 0, 0.7);
    }
    &_progress {
      &-indicator {
        background-color: rgb(205, 70, 70);
      }
      &-filled {
        background-color: rgb(223, 97, 97);
      }
    }
    
    &_download-progress {
      background-color: rgba(92, 59, 59, 0.849);
    }
    &_additional-controls {
      &-button {
        font-size: 1px;
      }
    }
    &_volume-bar {
      background-color: rgba(223, 97, 97, 0.6);
    }
    &_button-clear {
      color: var(--color-text-pink);

      &:hover {
        opacity: 0.6;
      }
    }
  }
  @media (width < 480px) {
    .rhap {
      &_main-controls {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
