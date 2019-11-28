import styled from 'styled-components';
import { TAB_CONTAINER_THEME } from 'constants/theme';

const Item = styled.li`
    & {
        padding: 1rem;
        font-size: 1rem;
        cursor: pointer;
    }
    
    &:hover {
        background-color: ${TAB_CONTAINER_THEME.tabContainerFileHoverBGColor};
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