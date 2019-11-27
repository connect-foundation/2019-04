import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const File = styled.article`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem;
		padding-left: ${({ depth }) => `${depth}rem`};

		cursor: pointer;

		background-color: ${TAB_CONTAINER_THEME.tabContainerBGColor};
	}

	.Side-icons-visibility {
		display: none;
	}

	&:hover {
		background-color: ${TAB_CONTAINER_THEME.tabContainerFileHoverBGColor};

		h1 {
			color: ${TAB_CONTAINER_THEME.tabContainerFileHoverTextColor};
		}

		.Side-icons-visibility {
			display: flex;
		}
	}
`;

const Icon = styled.img`
	& {
		margin-right: 0.5rem;

		width: ${TAB_CONTAINER_THEME.tabContainerFileTextSize};
		height: ${TAB_CONTAINER_THEME.tabContainerFileTextSize};
	}
`;

const Name = styled.h1`
	& {
		font-weight: lighter;
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

export { Icon, File, Name, SideIcons };
