import styled from 'styled-components';

const Image = styled.svg`
    & {
        width: 2.5rem;
        height: 2rem;
        cursor: pointer;
        color: gray;
        position: relative;
        top: 60px;
    }
    
    &:hover {
        color: white;
    }
`;

export { Image };