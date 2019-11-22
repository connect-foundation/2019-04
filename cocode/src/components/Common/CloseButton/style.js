import styled from 'styled-components';

const Button = styled.button`
    & {
        opacity: 0.7;
    }
    
    &:hover {
        opacity: 1;
    }
`;

export { Button };