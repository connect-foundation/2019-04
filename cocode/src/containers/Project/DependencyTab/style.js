import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const DependencyTab = styled.section`
	& {
	    /* temp width*/
		width: 18rem;
		background-color: ${TAB_CONTAINER_THEME.tabContainerBGColor};
	}
`;

export {
    DependencyTab
};
