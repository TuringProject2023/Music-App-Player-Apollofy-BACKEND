import { HomeSectionContainer } from './homeSection/HomeSectionContainer';
import logo from '../../assets/img/logo-homepage.png';
import styled from 'styled-components';
import { breakpoints } from '../../styles/breakpoints';


export const SideBar = () => {
	
	return (
		<SidebarStyles>
			<div className="sidebar__div">
				<img src={logo} alt="logo" className="sidebar__div-img desktop-class" />
			</div>
			<div className="sidebar__sections">
				<HomeSectionContainer />
			</div>
		</SidebarStyles>
	);
};


export const SidebarStyles = styled.div`
	grid-area: 6 / 1 / 7 / 7;
	display: flex;
	flex-direction: row;

	border-radius: 0.25rem;

	background-color: var(--color-background-sidebar);

	.sidebar__div {
		display: none;
		z-index: -1;
		height: 15vh;

		&-img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.sidebar__sections {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		a {
			width: 100%;
		}
	}


	@media (${breakpoints.min}px <= width <= ${breakpoints.mobileMax}px) {
		grid-area: 6 / 1 / 7 / 7;
	}

	@media (${breakpoints.mobileMax}px < width <= ${breakpoints.tabletMax}px) {
		grid-area: 6 / 1 / 7 / 7;

		.sidebar__div {
			display: none;
			z-index: -1;
		}
	}

	@media (${breakpoints.tabletMax}px < width <= ${breakpoints.laptopsMax}px) {
		//To determinate the Position in the parent grid
		grid-area: 1 / 1 / 5 / 2;
		//Own properties
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 1rem;
		width: 100%;
		height: 100%;

		border-radius: 0.25rem;
		font-size: 2.5rem;
		.sidebar__div {
			display: block;
			z-index: 0;
		}

		.sidebar__sections {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}

	@media (${breakpoints.laptopsMax}px < width <= ${breakpoints.desktopMax}px) {
		//To determinate the Position in the parent grid
		grid-area: 1 / 1 / 5 / 2;
		//Own properties
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 1rem;
		width: 100%;
		height: 100%;

		border-radius: 0.25rem;
		font-size: 2.5rem;
		.sidebar__div {
			display: block;
			z-index: 0;
		}

		.sidebar__sections {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}

	@media (width > ${breakpoints.desktopMax}px) {
		//To determinate the Position in the parent grid
		grid-area: 1 / 1 / 5 / 2;
		//Own properties
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 1rem;
		width: 100%;
		height: 100%;

		border-radius: 0.25rem;
		font-size: 2.5rem;
		.sidebar__div {
			display: block;
			z-index: 0;
		}

		.sidebar__sections {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}	
	}
`;