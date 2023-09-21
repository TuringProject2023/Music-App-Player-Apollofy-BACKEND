import styled from 'styled-components';
import backGroundImage from "../../assets/img/Crowd.webp";



export const GlobalRegularPageStyles = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-image: url(${backGroundImage});
background-color: rgba(0, 0, 0, 0.8);
width: 100vw;
height: 100vh;
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
gap:  2.5rem;


`;
