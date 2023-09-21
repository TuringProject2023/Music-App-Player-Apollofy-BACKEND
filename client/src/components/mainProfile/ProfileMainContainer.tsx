import { IoChevronBackOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import { Boop } from "../../animations/boopAnimation";
import { useUserContext } from "../../context";
import { useAuth0 } from "@auth0/auth0-react";
import { TfiPencil } from "react-icons/tfi";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/Modal";
import { UserForms, ArtistCreateForm } from "..";
import styled from "styled-components";

export const ProfileMainContainer = () => {
  const { user } = useAuth0();
  const { userData } = useUserContext();
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);


  return (
    <>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <UserForms closeModal1={closeModal1} />
      </Modal>
      <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
        <ArtistCreateForm closeModal={closeModal2} />
      </Modal>
      <ProfileMainContainerStyles>
        <ProfileIconsContainer>
          <Boop rotation={20} timing={200}>
            <IoChevronBackOutline />
          </Boop>
          <Boop rotation={20} timing={200}>
            {" "}
            <IoEllipsisVerticalSharp />
          </Boop>
        </ProfileIconsContainer>
        <ProfileIconEditContainer>
          <h2 className="profile__h2">Profile</h2>
          <Boop rotation={20} timing={200}>
            <button onClick={openModal1} className="button-icon" type="button">
              <TfiPencil />
            </button>
          </Boop>
        </ProfileIconEditContainer>
        <div className="profile__img-container">
          <img src={userData?.userImage ? userData?.userImage : user?.picture} alt="profile imagen" />
          <span className="profile__span-email">{userData?.userEmail}</span>
          <h3 className="profile__h3-name">{userData?.userName}</h3>
          <div className="profile__numbers-container">
            <ButtonAdd onClick={openModal2}>
              <span className="shadow"></span>
              <span className="front">
                <strong className='font-size'>ADD Artist</strong>
              </span>
            </ButtonAdd>
          </div>
        </div>
      </ProfileMainContainerStyles>
    </>
  );
};

const ProfileMainContainerStyles = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background: var(--color-background-main);
  & img {
    object-fit: contain;
    border-radius: 50%;
    max-width: 13rem;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }

  & img:hover {
    transform: scale(0.9);
  }

  height: 100%;

  .profile__img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;

    .profile__span-email {
      padding-top: 1rem;
      font-size: clamp(0.8rem, 1.4rem, 2rem);
      color: rgb(134, 129, 134);
    }

    .profile__h3-name {
      font-size: clamp(1.5rem, 2.5rem, 5rem);
      color: #e85973;
      padding: 1.5rem 0;
    }

    .profile__numbers-container {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;

      .profile__span-numbers {
        font-size: clamp(0.8rem, 2.3rem, 3rem);
        color: #e85973;
      }
    }
    .profile__followers-container {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      width: 100%;
      .profile__span-followers {
        color: rgb(134, 129, 134);
        font-size: clamp(0.8rem, 2rem, 2rem);
      }
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    grid-area: 1 / 1 / 5 / 7;
  }

  @media only screen and (min-width: 481px) and (max-width: 767px) {
    grid-area: 1 / 1 / 5 / 7;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    grid-area: 1 / 2 / 5 / 7;
    width: 100%;
    height: 100%;
  }

  @media only screen and (min-width: 1025px) {
    grid-area: 1 / 2 / 5 / 7;
    grid-template-rows: 1fr 4fr 4fr;
    width: 100%;
    height: 100%;
  }
`;

const ProfileIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & svg {
    font-size: clamp(0.8rem, 2.3rem, 3rem);
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
`;
const ProfileIconEditContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-left: 2.5rem;
  width: 100%;
  & .profile__h2 {
    font-size: clamp(1.5rem, 3rem, 5rem);
    color: #e85973;
  }

  .button-icon {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  & svg {
    font-size: clamp(0.8rem, 2.3rem, 3rem);
    color: rgba(255, 255, 255, 1);
  }
`;

const ButtonAdd = styled.button`
background: var( --background-button-shade-color);
width: 100%;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  font-size:4rem;
  padding-top: 0.5rem;
.edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
   background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}
.front {
  display: block;
  position: relative;
  padding: 8px 25px;
  border-radius: 12px;
  font-size: 1.5rem;
  color: #fafafa;
  background:var(--background-button-color);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}
&:hover {
  filter: brightness(110%);

}
&:hover .front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}
&:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
} 
`