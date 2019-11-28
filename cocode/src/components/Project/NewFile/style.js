import styled from 'styled-components';
import {
	TAB_CONTAINER_THEME,
	EXPLORER_TAB_CONTAINER_THEME
} from 'constants/theme';

const NewFile = styled.article`
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

		width: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextSize};
		height: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextSize};
	}
`;

const FileNameInput = styled.div`
	& {
		& {
			flex-grow: 2;
			padding-left: 0.25rem;

			font-weight: lighter;
			font-size: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextSize};
			color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileTextColor};

			overflow: hidden;
			white-space: nowrap;
		}

		&[contentEditable='true'] {
			background-color: ${EXPLORER_TAB_CONTAINER_THEME.explorerTabContainerFileNameEditBGColor};
		}
	}
`;

export { NewFile, Icon, FileNameInput };
