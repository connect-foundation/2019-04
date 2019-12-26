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

const OpenIcon = styled.img`
	& {
		height: 100%;
		padding: 0.4rem 0;
		background: ${BROWSER_THEME.addressInputBGColor};
		cursor: pointer;
	}
`;

export {
	Frame,
	BrowserV2,
	AddressContainer,
	AddressInput,
	SearchIcon,
	OpenIcon
};
