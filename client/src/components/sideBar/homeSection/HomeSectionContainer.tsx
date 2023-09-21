import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome } from 'react-icons/ai';
import { BsMusicNoteList } from 'react-icons/bs'
import { VscLibrary } from "react-icons/vsc";
import { ImProfile } from "react-icons/im";
import { HOME, LIBRARY, PLAYER, PROFILE } from "../../../config/routes/paths";
import { breakpoints } from "../../../styles/breakpoints";


export const HomeSectionContainer = () => {
  return (
    <HomeSectionContainerStyles>
      <Link to={HOME} ><AiOutlineHome /><span className="text">Home</span></Link>
      <Link to={PLAYER} ><BsMusicNoteList /><span className="text">Player</span></Link>
      <Link to={PROFILE} > <ImProfile /><span className="text">Profile</span></Link>
      <Link to={LIBRARY} > <VscLibrary /><span className="text">Library</span></Link>
    </HomeSectionContainerStyles>
  );
};


export const HomeSectionContainerStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  & a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    padding: 10px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    font-size: clamp(1rem, 1.8rem, 2rem);
  }
  & a:hover {
    border-radius: 6px;
    background: #282828;
    padding: 10px;
    color: rgba(255, 255, 255, 1);
  }
  & svg {
    font-size: clamp(1rem, 1.8rem, 2rem);
  }

  @media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      & a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        padding: 10px;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;

      }
    }
    .text {
      display: none;
    }
  }

  @media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    & a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text {
      display: none;
    }
  }

  @media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    & a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      width: 100%;
      padding: 10px;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
    & a:hover {
      border-radius: 6px;
      background: #282828;
      padding: 10px;
      color: rgba(255, 255, 255, 1);
    }
  }

  @media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      width: 100%;
      padding: 10px;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
    & a:hover {
      border-radius: 6px;
      background: #282828;
      padding: 10px;
      color: rgba(255, 255, 255, 1);
    }
  }

  @media (width > ${breakpoints.desktopMax}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
      & a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        width: 100%;
        padding: 10px;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
      & a:hover {
        border-radius: 6px;
        background: #282828;
        padding: 10px;
        color: rgba(255, 255, 255, 1);
      }

  }
`;

