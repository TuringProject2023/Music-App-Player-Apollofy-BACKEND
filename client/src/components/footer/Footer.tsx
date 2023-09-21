import styled from "styled-components";
import { Player } from '..'
import { breakpoints } from "../../styles/breakpoints";

export const Footer = () => {
 
  return (
    <FooterStyles>
      <Player />
    </FooterStyles>
  )
}


export const FooterStyles = styled.footer`
  grid-area: 5 / 1 / 6 / 7;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%; 

  background-color: var(--color-background-footer); 
  border-radius: 0.25rem;

  @media (${breakpoints.min} <= width <= ${breakpoints.mobileMax}px)  {
    grid-area: 5 / 1 / 6 / 7;

  }

  @media (${breakpoints.mobileMax} < width <= ${breakpoints.tabletMax}px) {
    grid-area: 5 / 1 / 6 / 7;

  }

  @media (${breakpoints.tabletMax} < width <= ${breakpoints.laptopsMax}px) {
    grid-area: 5 / 2 / 6 / 7;

  }

  @media (${breakpoints.laptopsMax} < width <= ${breakpoints.desktopMax}px) {
    grid-area: 5 / 2 / 6 / 7;

  }

  @media (width > ${breakpoints.desktopMax}){
    grid-area: 5 / 2 / 6 / 7;

  }
`;
