import styled from 'styled-components';
import { PlayerContainer, SearchBar } from ".."
import { breakpoints } from '../../styles/breakpoints';


export const PlayerMainContainer = () => {

  return (
    <PlayerMainContainerStyles>
      <SearchBar setSearchParams={undefined} searchParams={undefined} handleChangeParams={undefined} query={undefined} />
      <PlayerContainer />
    </PlayerMainContainerStyles>

  )
}


export const PlayerMainContainerStyles = styled.div`
grid-area: 1 / 1 / 5 / 7;
width: 100%;
height: 100%;
border-radius: 0.25rem;
overflow-y: auto;
background: linear-gradient(#340034, #000);

@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
  grid-area: 1 / 1 / 5 / 7;
   
}

@media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
  grid-area: 1 / 1 / 5 / 7;
  
}

@media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
  grid-area: 1 / 2 / 5 / 7;
  
  width: 100%;
  height: 100%;
}

@media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
  grid-area: 1 / 2 / 5 / 7;

  width: 100%;
  height: 100%;
}

@media (width > ${breakpoints.desktopMax}px) {
  grid-area: 1 / 2 / 5 / 7;

width: 100%;
height: 100%;
}
`;