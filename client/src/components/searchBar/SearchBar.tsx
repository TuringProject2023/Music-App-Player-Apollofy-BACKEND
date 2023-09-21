/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { Button } from "..";
import { Boop } from "../../animations/boopAnimation";
import { useAuth0 } from "@auth0/auth0-react";
import { PROFILE } from "../../config/routes/paths";
import { useUserContext } from "../../context";

export const SearchBar = ({ setSearchParams, searchParams, handleChangeParams, query }) => {
  const { logout, user, isAuthenticated } = useAuth0();
  const { userData } = useUserContext();

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <SearchBarContainer>
      <SearchBarLeft>
        <SearchBarIcon>
          <BsSearch />
        </SearchBarIcon>
        <input type="search" name="search" placeholder="Search" value={query} onChange={handleChangeParams} />
      </SearchBarLeft>
      <SearchBarRight>
        {isAuthenticated ? (
          <>
            <Button handleClick={() => logout()}>Logout</Button>
            <h4>{userData?.userName ? userData?.userName : user?.given_name}</h4>
            <Boop rotation={20} timing={200}>
              <Link to={PROFILE}>
                <RxAvatar />
              </Link>
            </Boop>
          </>
        ) : (
          <>
            <Button handleClick={goToLogin}>Login</Button>
          </>
        )}
      </SearchBarRight>
    </SearchBarContainer>
  );
};


import styled from 'styled-components';

export const SearchBarContainer = styled.header`
    height: 10%;
    width: 100%;

    display: flex;
    justify-content: space-between;
    padding: 1rem;

    border: 1px solid rgba(66, 66, 66, 0.4);
    border-radius: 0.25rem;

    & svg{
        font-size: 1.5rem;
    color:  rgba(255, 255, 255, 1);
    cursor: pointer;
    }
    
    @media (height < 500px) {
        grid-column: 1 / -1;
        position: relative;
        display: flex;
        align-items: flex-start;
        width: 100%;
    }
`;


export const SearchBarLeft = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 0.8;
    min-width: 3.5rem;
    border-radius: 1rem;

& input {
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    padding-right:1rem;
    border: 1px solid rgba(66, 66, 66, 0.4);
    border-radius: 1.5rem;
}
& svg{
color: rgb(135,146,148);
    cursor:pointer;
}
@media (height < 500px) {
    position: relative;
    display: flex;
    align-items: start;
    width: 100%;
}
`;

export const SearchBarIcon = styled.div`
  position: absolute;
  left: 10px; /* Posición del icono dentro del input */
  top: 50%;
  transform: translateY(-50%);
`;

export const SearchBarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 3.5rem;
    border-radius: 1rem;
    padding: 10px;
 h4 {
    font-size: clamp(.8rem, 2.1rem, 2.5rem);
    color: rgb(135,146,148);
    cursor: pointer;
    transition: 0.3s ease-in-out;
 }
 h4:hover{
    color: #c9356c;
 }
 & svg {
    font-size: clamp(.8rem, 2.3rem, 3rem);
    color:  rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: 0.3s ease-in-out;
}
svg:hover{
    color: #c9356c;
}
@media (height < 500px) {
    display:none;
}
`;



