import styled from 'styled-components';

//TODO 나중에 테마로 분리할 계획입니다.
const EDITOR_MAIN_COLOR = '#1E2022';

const TabBar = styled.ul`
    & {
        width: 100%;
        list-style: none;
        display: inline-flex;
        overflow: scroll;
    }
    
    .clicked {
        background-color: ${EDITOR_MAIN_COLOR};
        
        &:after {
          visibility: visible;
        }
    }
`;

export { TabBar };