import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const Header = styled.header`
	& {
		display: flex;
		align-items: center;
		background-color: ${TAB_CONTAINER_THEME.tabContainerHeaderBGColor};
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

const Body = styled.div`
	& {
		display: ${({ toggle }) => (toggle ? 'block' : 'none')};
		padding: 0;
	}
`;

export { Header, Title, Body };
