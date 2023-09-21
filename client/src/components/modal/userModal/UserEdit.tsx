import { useForm } from 'react-hook-form'
import { useUserContext } from '../../../context/UserContext';
import { useState, FC } from 'react';
import { AlertMessageSuccess } from '../../confirmationMessage/AlertMessageSuccess';
import { UserFormContainer } from './userFormEditContainer.styled';
import { LoaderForm } from '../..';
import Modal from '../Modal';
import { useModal } from '../../../hooks/useModal';
import { UserDelete } from './UserDelete';
import { useAuth0 } from '@auth0/auth0-react'


interface userUpdate {
  userName: string;
  userEmail: string;
  userImage: string;
}
interface userFormModal {
  closeModal1: () => void;
}

export const UserForms: FC<userFormModal> = ({ closeModal1 }) => {
  const { userData, updatedUserData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const { user } = useAuth0();
  const form = useForm<userUpdate>({
    defaultValues: {
      userName: userData?.userName,
      userEmail: userData?.userEmail,
      userImage: user?.picture
    }
  });
  const { register, handleSubmit, formState: { errors } } = form;
  const onSubmit = async (userUpdate: userUpdate) => {
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('userName', userUpdate.userName);
      formData.append('userEmail', userUpdate.userEmail);
      formData.append('userImage', userUpdate.userImage[0]);
      await updatedUserData(formData, userData?.id ?? '');
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeModal1()
      }, 2000)
    } catch (error) {
      console.error('Error user update:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <UserFormContainer onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <LoaderForm />}
      {isSuccess && <AlertMessageSuccess>
        User data updated!
      </AlertMessageSuccess>}
      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <UserDelete onClose={closeModal} />
      </Modal>
      <div className="flex">
        <div className="login color">EDIT USER</div>
        <label className="color">Username :</label>
        <input type="text" className="input" placeholder="Enter your name"
          {...register("userName", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          autoComplete="off"
        />
        {errors.userName && <p className="error_input">{errors.userName.message}</p>}
        <label className="color">Email :</label>
        <input type="text" className="input" placeholder="Enter your email"
          {...register("userEmail", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email must be a valid email address",
            },
          })}
          autoComplete="off"
        />
        {errors.userEmail && <p className="error_input">{errors.userEmail.message}</p>}
        <label className="color" htmlFor="image">
          Choose a file:
        </label>
        <input
          className="inpdut"
          id="image"
          type="file"
          accept="image/*"
          {...register("userImage", {
            required: "Please choose a file",
          })}
        />
        <button type="submit" className="button_userForm">EDIT</button>
        <button onClick={openModal} type="button" className="button_delete">Delete Account</button>

      </div>
    </UserFormContainer>
  );
}


