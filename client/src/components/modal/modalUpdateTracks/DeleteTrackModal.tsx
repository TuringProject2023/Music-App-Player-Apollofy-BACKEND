import { FC, useState } from "react";
import { useUserMusicContext } from "../../../context/UserMusicContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { trackDelete } from "../../../api/track.service";
import { AlertMessageSuccess, LoaderForm } from "../..";
import { useUserContext } from "../../../context";

interface ModalConfirmationProps {
  onClose: () => void;
  id: string;
}


export const DeleteTrackModal: FC<ModalConfirmationProps> = ({ onClose, id }) => {
  const { userData } = useUserContext();
  const {  handleUserTracks } = useUserMusicContext();
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await trackDelete(id, getAccessTokenSilently);
      await handleUserTracks(userData?.userEmail ?? "");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error delete user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TrackDeleteContainer>
      {isLoading && <LoaderForm />}
      {isSuccess && <AlertMessageSuccess>Track deleted successfully!</AlertMessageSuccess>}
      <div className="modal_content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete the track?</p>
        <div className="button_container">
          <button type="button" className="cancel_button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="confirm_button" onClick={() => handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </TrackDeleteContainer>
  );
};

const TrackDeleteContainer = styled.div`
  background: var(--color-background-main);
  border-radius: 8px;

  & .modal_content {
    text-align: center;

    & h2 {
      padding: 12px 0;
      font-size: 2rem;
      color: #f5f4e8;
      font-weight: 600;
    }

    & p {
      padding-bottom: 5px;
      font-size: 1.4rem;
      color: #dafcc4;
      font-weight: 600;
    }

    /* Estilos de los botones */
    & .button_container {
      padding: 15px 0;
      display: flex;
      justify-content: space-around;
    }

    & .confirm_button,
    .cancel_button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    & .confirm_button {
      background-color: #e74c3c;
      color: #f5f4e8;
      font-size: 1.2rem;
    }

    & .confirm_button:hover {
      background-color: #c0392b;
    }

    & .cancel_button {
      background-color: #2f9304;
      color: #f5f4e8;
      font-size: 1.2rem;
    }

    & .cancel_button:hover {
      background-color: #077107;
    }
  }
`;
