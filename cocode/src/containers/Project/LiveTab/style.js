import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const Title = styled.h1`
	& {
		padding: 0.7rem 1rem;
		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: ${TAB_CONTAINER_THEME.tabContainerTitleSize};
		font-weight: ${TAB_CONTAINER_THEME.tabContainerTitleWeight};
		background-color: ${TAB_CONTAINER_THEME.tabContainerHeaderBGColor};
	}
`;

export {
	Title
};
