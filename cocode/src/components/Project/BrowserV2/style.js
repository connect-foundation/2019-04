import styled from 'styled-components';
import { BROWSER_THEME } from 'constants/theme';

const Frame = styled.div`
	& {
		position: relative;
	}
`;

const BrowserV2 = styled.iframe`
	& {
		height: calc(100% - 3.1rem);
		width: 100%;
		background-color: ${BROWSER_THEME.iframeBGColor};
	}
`;

const LoadingOverlay = styled.section`
	& {
		position: fixed;
		top: 12vh;
		left: 0;
		z-index: 100;

		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: ${BROWSER_THEME.loadingOverlayBGColor};

		p {
			margin-top: 2rem;
			font-size: 3rem;
			font-weight: lighter;
		}
	}
`;

const AddressContainer = styled.div`
	& {
		display: flex;
		align-items: center;
		height: 3.1rem;
		width: 100%;
		padding: 0.8rem;
		background: ${BROWSER_THEME.browserHeaderBGColor};
		font-size: 1rem;
	}
`;

const AddressInput = styled.input`
	& {
		width: 100%;
		height: 100%;
		padding: 0.3rem;
		background: ${BROWSER_THEME.addressInputBGColor};
		color: ${BROWSER_THEME.addressInputTextColor};
	}
`;

const SearchIcon = styled.img`
	& {
		height: 100%;
		padding: 0.4rem 0;
		background: ${BROWSER_THEME.addressInputBGColor};
	}
`;

export {
	Frame,
	BrowserV2,
	LoadingOverlay,
	AddressContainer,
	AddressInput,
	SearchIcon
};
