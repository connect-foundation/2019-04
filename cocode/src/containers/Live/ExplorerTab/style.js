import styled from 'styled-components';
import {
	TAB_CONTAINER_THEME,
	EXPLORER_TAB_CONTAINER_THEME
} from 'constants/theme';

const {
	explorerTabContainerSelectedFileBGColor,
} = 'EXPLORER_TAB_CONTAINER_THEME';
const {
	tabContainerHeaderBGColor,
	tabContainerTitleColor,
	tabContainerTitleSize,
	tabContainerTitleWeight
} = 'TAB_CONTAINER_THEME';

const TabBody = styled.div`
	& {
		height: 100%;
	}

	.Is-selected-file {
		background-color: ${explorerTabContainerSelectedFileBGColor};
	}
`;

const TabHeader = styled.header`
	& {
		display: flex;
		flex-direction: row;
		background-color: ${tabContainerHeaderBGColor};
	}

	.Tab-header-Side-icons {
		margin: auto 0;
		margin-left: auto;
		margin-right: 1rem;
	}
`;

const Title = styled.h1`
	& {
		padding: 0.7rem 1rem;

		color: ${tabContainerTitleColor};
		font-size: ${tabContainerTitleSize};
		font-weight: ${tabContainerTitleWeight};
	}
`;

const SideIcons = styled.span`
	& {
		display: flex;
		flex-direction: row;

		margin-left: auto;
	}

	& > svg {
		margin: 0 0.2rem;

		cursor: pointer;
	}
`;

export { TabHeader, TabBody, Title, SideIcons };
