import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const GlobalPrivatePageStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 2fr) repeat(2, 1fr);

  height: 100%;
  gap: 0.25rem;
  padding: 0.25rem;
  background-color: black;

  @media (${breakpoints.min} <= width <= ${breakpoints.mobileMax}px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (${breakpoints.mobileMax} < width <= ${breakpoints.tabletMax}px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 2fr) repeat(2, 1fr);
  }

  @media (${breakpoints.tabletMax} < width <= ${breakpoints.laptopsMax}px) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(4, 2fr) 1fr;
  }

  @media (${breakpoints.laptopsMax} < width <= ${breakpoints.desktopMax}px) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(4, 2fr) 1fr;
  }

  @media (width > ${breakpoints.desktopMax}) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(4, 2fr) 1fr;
  }
`;
