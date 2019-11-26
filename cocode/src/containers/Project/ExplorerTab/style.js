import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const ExplorerTab = styled.section`
	& {
		/* temp width */
		width: 15rem;

		background-color: ${TAB_CONTAINER_THEME.tabContainerBGColor};
	}
`;

const TabHeader = styled.header`
	& {
		display: flex;
		flex-direction: row;
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

const Icon = styled.img`
	& {
		margin-right: 0.5rem;

		width: ${TAB_CONTAINER_THEME.tabContainerFileTextSize};
		height: ${TAB_CONTAINER_THEME.tabContainerFileTextSize};
	}
`;

const File = styled.article`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem;
		padding-left: ${({ depth }) => `${depth}rem`};

		cursor: pointer;
	}

	.Side-icons-visibility {
		display: none;
	}

	&:hover {
		background-color: ${TAB_CONTAINER_THEME.tabContainerFileHoverBGColor};

		text {
			color: ${TAB_CONTAINER_THEME.tabContainerFileHoverTextColor};
		}

		.Side-icons-visibility {
			display: flex;
		}
	}
`;

const Name = styled.text`
	& {
		font-size: ${TAB_CONTAINER_THEME.tabContainerFileTextSize};
		color: ${TAB_CONTAINER_THEME.tabContainerFileTextColor};
	}
`;

const SideIcons = styled.span`
	& {
		margin-left: auto;
	}

	& > svg {
		margin: 0 0.2rem;
	}
`;

export { ExplorerTab, TabHeader, Title, Icon, File, Name, SideIcons };
