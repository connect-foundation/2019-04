import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const Dependency = styled.article`
    & {
		padding: 0.7rem 1rem;
    }
`;

const Header = styled.header`
    & {
        display: flex;
        align-items: center;
    }
`;

const Title = styled.h1`
	& {
		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: ${TAB_CONTAINER_THEME.tabContainerTitleSize};
		font-weight: ${TAB_CONTAINER_THEME.tabContainerTitleWeight};
	}
`;

const Body = styled.main`
    & {
        display: ${({ toggle }) => toggle ? 'block' : 'none'};
        padding: 0.5rem 0;
    }
`;

export {
    Dependency,
    Header,
    Title,
    Body
};