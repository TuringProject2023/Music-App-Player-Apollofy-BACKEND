import { useSearchParams } from 'react-router-dom';
import { PlaylistContainerHome, SearchBar, TracksContainer } from '..';
import styled from 'styled-components';
import { AlbumContainer } from './album-playlistContainer/AlbumMainContainer';

export const HomeMainContainer = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('q') || '';

	const handleChangeParams = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams({ q: target.value });
	};
	return (

		<HomeMainContainerStyles>
			<SearchBar searchParams={searchParams} setSearchParams={setSearchParams} query={query} handleChangeParams={handleChangeParams} />
			<PlaylistContainerHome query={query} />
			<AlbumContainer query={query} />
			<TracksContainer query={query} />
		</HomeMainContainerStyles>

	);
};

const HomeMainContainerStyles = styled.main`
/* grid-area: 1 / 1 / 5 / 7; */
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
/* justify-content: center; */
border-radius: 0.25rem;
background: linear-gradient(#340034, #000);
overflow-y: scroll;




@media (320px < width < 480px) {
  grid-area: 1 / 1 / 5 / 7;


}

@media (480px < width < 768px) {
  grid-area: 1 / 1 / 5 / 7;
  
  
}

@media (768px < width < 1024px) {
  grid-area: 1 / 2 / 5 / 7;
  width: 100%;
  height: 100%;


}

@media (width > 1024px) {
  grid-area: 1 / 2 / 5 / 7;
  width: 100%;
  height: 100%;


}`


