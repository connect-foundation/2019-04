import styled from 'styled-components';
import { EXPLORER_TAB_CONTAINER_THEME } from 'constants/theme';

const {
	explorerTabContainerFileTextWeight,
	explorerTabContainerFileEditBGColor,
	explorerTabContainerFileBGColor,
	explorerTabContainerFileHoverBGColor,
	explorerTabContainerFileHoverTextColor,
	explorerTabContainerFileTextSize,
	explorerTabContainerEditedFileTextColor,
	explorerTabContainerFileTextColor,
	explorerTabContainerFileNameEditBGColor
} = EXPLORER_TAB_CONTAINER_THEME;

const File = styled.article`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem;
		padding-left: ${({ depth }) => `${depth}rem`};

		font-weight: ${explorerTabContainerFileTextWeight};

		cursor: pointer;

		background-color: ${({ toggleEdit }) =>
			toggleEdit
				? explorerTabContainerFileEditBGColor
				: explorerTabContainerFileBGColor};
	}

	.Side-icons-visibility {
		visibility: hidden;
	}

	&:hover {
		background-color: ${explorerTabContainerFileHoverBGColor};

		h1 {
			color: ${explorerTabContainerFileHoverTextColor};
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
		height: ${explorerTabContainerFileTextSize};
	}
`;

const NameEdit = styled.div`
	& {
		flex-grow: 2;

		padding-left: 0.25rem;

		font-size: ${explorerTabContainerFileTextSize};
		color: ${({ isEditing }) =>
			isEditing
				? explorerTabContainerEditedFileTextColor
				: explorerTabContainerFileTextColor};

		overflow: hidden;
		white-space: nowrap;
	}

	&[contentEditable='true'] {
		background-color: ${explorerTabContainerFileNameEditBGColor};
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
