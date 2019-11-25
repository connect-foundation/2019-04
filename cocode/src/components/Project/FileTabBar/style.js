import styled from 'styled-components';

//TODO 나중에 테마로 분리할 계획입니다.
const EDITOR_MAIN_COLOR = '#1E2022';
const EDITOR_DARK_COLOR = '#111518';

const TabBar = styled.ul`
    & {
        width: 100%;
        list-style: none;
        display: inline-flex;
        overflow: scroll;
        min-height: 3.1rem;
        background-color: ${EDITOR_DARK_COLOR};
    }
    
    .clicked {
        background-color: ${EDITOR_MAIN_COLOR};
        
        & > img {
          visibility: visible;
        }
    }
`;

export { TabBar };