import styled from "styled-components";
import { FC, useState } from "react";
import { Button, DeleteAlbumModal, Modal } from "../..";
import { useModal } from "../../../hooks/useModal";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { ModalUpdateAlbum } from "./ModalUpdateAlbum";

interface DropdownMenuInterface {
  id: string;
  albumName: string;
  albumImage: string;
  albumCreatedAt: string;
  artistId: string[];
  artist: ArtistProps[];
  genre: [{ genreName: string }];
  genreId: string[];
  track: TrackProps[];
  trackId: string[];
}
export interface TrackProps {
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

export const DropDownMenuAlbum: FC<DropdownMenuInterface> = ({ id, albumName, albumImage, albumCreatedAt, genreId, artistId, trackId }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
 

  return (
    <>
      <Button handleClick={handleToggleMenu}>
        <IoEllipsisVerticalSharp />
      </Button>

      {isOpen ? (
        <DropdownMenuStyles>
          <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <DeleteAlbumModal onClose={closeModal} id={id} />
          </Modal>
          <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
            <ModalUpdateAlbum
              closeModal={closeModal2}
              id={id}
              albumName={albumName}
              albumImage={albumImage}
              albumCreatedAt={albumCreatedAt}
              genreId={genreId}
              artistId={artistId}
              trackId={trackId}
            />
          </Modal>

          <div className="dropdown">
            <Button handleClick={openModal2}>Edit album</Button>
            <Button handleClick={openModal}>Delete album</Button>
          </div>
        </DropdownMenuStyles>
      ) : null}
    </>
  );
};

const DropdownMenuStyles = styled.div`
  max-width: 500px;
  border-radius: 5px;
  box-shadow: 0, 1, 2;
  display: flex;
  .dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    justify-content: space-around;
    width: 150px;
    height: 90%;
    bottom: 0px;
    left: -150px;

    & button {
    }
  }
`;
