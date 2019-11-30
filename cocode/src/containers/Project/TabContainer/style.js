import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const Container = styled.section`
	& {
		min-width: 18rem;
		background-color: ${TAB_CONTAINER_THEME.tabContainerBGColor};
	}
`;

export {
	Container
};