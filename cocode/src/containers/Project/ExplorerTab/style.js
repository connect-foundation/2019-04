import styled from 'styled-components';
import {
	TAB_CONTAINER_THEME,
	EXPLORER_TAB_CONTAINER_THEME
} from 'constants/theme';

const TabBody = styled.div`
	& {
		height: 100%;
	}

	.Is-selected-file {
		background-color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerSelectedFileBGColor};
	}
`;

const TabHeader = styled.header`
	& {
		display: flex;
		flex-direction: row;
		background-color: ${TAB_CONTAINER_THEME.tabContainerHeaderBGColor};
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

		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: ${TAB_CONTAINER_THEME.tabContainerTitleSize};
		font-weight: ${TAB_CONTAINER_THEME.tabContainerTitleWeight};
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
