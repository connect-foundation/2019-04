import styled from 'styled-components';
import { DEPENDENCY_TAB_THEME } from 'constants/theme';

const Item = styled.li`
    & {
        padding: 1rem;
        font-size: 1rem;
        cursor: pointer;
    }
    
    &:hover {
        background: ${DEPENDENCY_TAB_THEME.dependencyTabItemHoverColor};
    }
`;

const Description = styled.div`
    & {
        display: flex;
        margin-top: 0.3rem;
        align-items: center;
    }
`;

export {
    Item,
    Description,
};