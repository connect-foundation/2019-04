import styled from 'styled-components';
import { EXPLORER_TAB_CONTAINER_THEME } from 'constants/theme';

const File = styled.article`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem;
		padding-left: ${({ depth }) => `${depth}rem`};

		font-weight: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextWeight};

		cursor: pointer;

		background-color: ${({ toggleEdit }) =>
			toggleEdit
				? EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileEditBGColor
				: EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileBGColor};
	}

	.Side-icons-visibility {
		visibility: hidden;
	}

	&:hover {
		background-color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileHoverBGColor};

		h1 {
			color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileHoverTextColor};
		}

		.Side-icons-visibility {
			visibility: visible;
		}
	}
`;

const Icon = styled.img`
	& {
		margin-right: 0.5rem;

		width: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextSize};
		height: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextSize};
	}
`;

const NameEdit = styled.div`
	& {
		flex-grow: 2;

		padding-left: 0.25rem;

		font-size: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextSize};
		color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextColor};

		overflow: hidden;
		white-space: nowrap;
	}

	&[contentEditable='true'] {
		background-color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileNameEditBGColor};
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
	}
`;

export { Icon, File, NameEdit, SideIcons };
