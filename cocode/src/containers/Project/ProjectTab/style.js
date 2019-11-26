import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const ProjectTab = styled.section`
	& {
		background-color: ${TAB_CONTAINER_THEME.tabContainerBGColor};
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

const File = styled.div`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem;
		padding-left: ${({ depth }) => `${depth}rem`};

		cursor: pointer;

		font {
			font-size: ${TAB_CONTAINER_THEME.tabContainerFileTextSize};
			color: ${TAB_CONTAINER_THEME.tabContainerFileTextColor};
		}
	}

	&:hover {
		background-color: ${TAB_CONTAINER_THEME.tabContainerFileHoverBGColor};

		font {
			color: ${TAB_CONTAINER_THEME.tabContainerFileHoverTextColor};
		}
	}
`;

export { ProjectTab, Title, Icon, File };
