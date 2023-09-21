import {FC,useState} from 'react'
import { UserDeleteContainer } from './userDeleteContainer.styled'
import { useUserContext } from '../../../context';
import { useAuth0 } from '@auth0/auth0-react';
import { LoaderForm } from '../..';
import { AlertMessageSuccess } from '../../confirmationMessage/AlertMessageSuccess';

interface ModalConfirmationProps {
    onClose: () => void;
  }

export const UserDelete:FC<ModalConfirmationProps> = ({ onClose }) => {
const {deleteUser,userData} = useUserContext()
const { getAccessTokenSilently, logout } = useAuth0();
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

const handleDelete = async()=> {
    try{
        setIsLoading(true);
      const response = await deleteUser(userData?.id ?? '', getAccessTokenSilently)
      if(response.status === 204){
          setIsSuccess(true);
              setTimeout(() => {
                  setIsSuccess(false);
                  onClose()
                  logout()
              }, 2000)
      }
    }catch (error) {
        console.error('Error delete user:', error);
      }finally {
        setIsLoading(false);
    }
    };


  return (
    <UserDeleteContainer>
       {isLoading && <LoaderForm />}
                {isSuccess && <AlertMessageSuccess>
                    Account deleted successfully!
                </AlertMessageSuccess>}
      <div className="modal_content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete your account?</p>
        <div className="button_container">
          <button type='button' className="cancel_button" onClick={onClose}>Cancel</button>
          <button type='button' className="confirm_button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </UserDeleteContainer>
  )
}
