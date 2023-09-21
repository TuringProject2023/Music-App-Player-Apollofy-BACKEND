import styled from "styled-components";
import { FC, useState } from "react";
import { Button, DeleteTrackModal, Modal, ModifyTrackModal } from "../..";
import { useModal } from "../../../hooks/useModal";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

interface DropdownMenuInterface {
  id: string;
  trackName: string;
  trackImage: string;
  trackCreatedAt: string;
  trackUpdatedAt: string;
  trackLikedById: string[];
  trackCreatedById: string[];
  genre: [{ genreName: string }];
  genreId: string[];
  artistId: string[];
  trackUrl: string;
  albumId: string;
}

export const DropdownMenu: FC<DropdownMenuInterface> = ({ id, trackName, trackUrl, trackImage, trackCreatedAt, genreId, artistId, albumId }) => {
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
            <DeleteTrackModal onClose={closeModal} id={id} />
          </Modal>
          <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
            <ModifyTrackModal
              closeModal2={closeModal2}
              id={id}
              trackName={trackName}
              trackUrl={trackUrl}
              trackImage={trackImage}
              trackCreatedAt={trackCreatedAt}
              genreId={genreId}
              artistId={artistId}
              albumId={albumId}
            />
          </Modal>

          <div className="dropdown">
            <Button handleClick={openModal2}>Edit track</Button>
            <Button handleClick={openModal}>Delete track</Button>
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
