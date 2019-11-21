import styled from 'styled-components';

//TODO 나중에 테마로 분리할 계획입니다.
const EDITOR_DARK_COLOR = '#111518';

const Tab = styled.li`
    & {
        padding: 0.8rem;
        display: inline-flex;
        background-color: ${EDITOR_DARK_COLOR};
        font-size: 0.8rem;
        cursor: pointer;
    }
    
    &:hover {
      & > img {
        visibility: visible;
      }
    }
`;

const Icon = styled.img`
    & {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.3rem;
    }
`;

const Close = styled.img`
    & {
        width: 0.8rem;
        height: 0.8rem;
        margin-top: 0.18rem;
        margin-left: 0.5rem;
        visibility: hidden;
    }
`;

export { Icon, Tab, Close };