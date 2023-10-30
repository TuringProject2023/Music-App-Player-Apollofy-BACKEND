import { FC } from "react";
import styled from "styled-components";
import { AlertMessageSuccess, } from "../..";
import { useUserContext } from "../../../context";
import { useUserMusicContext } from "../../../context";
import { toast } from 'react-toastify';

interface ModalConfirmationProps {
  onClose: () => void;
  id: string;
}


export const DeleteAlbumModal: FC<ModalConfirmationProps> = ({ onClose, id }) => {
  const { userData } = useUserContext();
  const {  handleDeleteAlbum } = useUserMusicContext();
  

  const handleDelete = async () => {
    
    try {
     
      const response =  await handleDeleteAlbum(id, userData?.id ?? "" );
      // await handleUserTracks(userData?.userEmail ?? "");
      // toast.promise(response,  {
      //   pending: {
      //     render(){
      //       return "I'm loading"
      //     },
      //     icon: false,
      //   },
      //   success: {
      //     render({data}){
      //       return `Hello ${data}`
      //     },
      //     // other options
      //     icon: "🟢",
      //   },
      //   error: {
      //     render({data}){
      //       return `Hello ${data}`
      //     },
      //     // other options
      //     icon: "",
      //   }
      // })
      setTimeout(() => {        
        onClose();
      }, 1500);
      return response
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
          <button type="button" className="cancel_button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="confirm_button" onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
    </AlbumDeleteContainer>
  );
};

const AlbumDeleteContainer = styled.div`
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
