import styled from 'styled-components';
import { TAB_CONTAINER_THEME, DEPENDENCY_TAB_THEME } from 'constants/theme';

const Item = styled.li`
	& {
		padding: 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
	
	& > select {
		display: none;
	}

	&:hover {
		background: ${TAB_CONTAINER_THEME.tabContainerFileHoverBGColor};

		& > select, & > img {
			display: inline;
		}

		& > span {
			display: none;
		}
	}
`;

const Version = styled.span`
	& {
		float: right;
		font-size: 1rem;
	}
`;

const Close = styled.img`
	& {
		display: none;
		float: right;
		width: ${DEPENDENCY_TAB_THEME.dependencyTabCloseSize};
		height: ${DEPENDENCY_TAB_THEME.dependencyTabCloseSize};
		margin: 0.3rem 0 0 0.2rem;
	}
`;

export {
	Item,
	Version,
	Close
};
