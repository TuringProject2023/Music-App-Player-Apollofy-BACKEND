import { FC } from "react";
import styled from "styled-components";
import { useUserContext, useUserMusicContext } from "../../../hooks";


interface ModalConfirmationProps {
  onClose: () => void;
  id: string;
}

export const DeleteAlbumModal: FC<ModalConfirmationProps> = ({ onClose, id }) => {
  const { userData } = useUserContext();
  const { handleDeleteAlbum } = useUserMusicContext();

  const handleDelete = async () => {
    try {
      const response = await handleDeleteAlbum(id, userData?.id ?? "");
      setTimeout(() => {
        onClose();
      }, 1500);
      return response;
    } catch (error) {
      console.error("Error delete user:", error);
    }
  };

  return (
    <AlbumDeleteContainer>
      <div className="modal_content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete the album?</p>
        <div className="button_container">
          
          <ButtonCancel onClick={onClose} >
          <span className="shadow"></span>
          <span className="front">
            <strong className="font-size" >Cancel</strong>
          </span>
        </ButtonCancel>
          
          <ButtonDelete onClick={() => handleDelete()} >
          <span className="shadow"></span>
          <span className="front">
            <strong className="font-size" >Delete</strong>
          </span>
        </ButtonDelete>
        </div>
      </div>
    </AlbumDeleteContainer>
  );
};

const AlbumDeleteContainer = styled.div`
  background: hsl(300, 100%, 10%);
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
      padding: 15px 20px;
      display: flex;
      justify-content: space-around;
      gap: 1rem;
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

export const ButtonCancel = styled.button`
 background: var(--background-button-cancel-shade-color);
  width: 100%;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  font-size: 4rem;
  padding-top: 0.5rem;
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%);
  }
  .front {
    display: block;
    position: relative;
    padding: 8px 25px;
    border-radius: 12px;
    font-size: 1.5rem;
    color: #fafafa;
    background: var(--background-button-cancel-color);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  &:hover {
    filter: brightness(110%);
  }
  &:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  &:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
`;

const ButtonDelete = styled.button`
 background: var(--background-button-shade-color);
  width: 100%;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  font-size: 4rem;
  padding-top: 0.5rem;
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%);
  }
  .front {
    display: block;
    position: relative;
    padding: 8px 25px;
    border-radius: 12px;
    font-size: 1.5rem;
    color: #fafafa;
    background: var(--background-button-color);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  &:hover {
    filter: brightness(110%);
  }
  &:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  &:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
`;