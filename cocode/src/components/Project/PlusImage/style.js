import styled from 'styled-components';
import { DEPENDENCY_TAB_THEME } from 'constants/theme';

const Image = styled.svg`
	& {
        width: ${DEPENDENCY_TAB_THEME.dependencyTabIconSize};
        height: ${DEPENDENCY_TAB_THEME.dependencyTabIconSize};
        margin-right: 0.5rem;
        fill: ${DEPENDENCY_TAB_THEME.dependencyTabIconColor}
	}
	
	&:hover {
		fill: ${DEPENDENCY_TAB_THEME.dependencyTabIconHoverColor}
	}
`;

export {
	Image
};