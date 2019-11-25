import styled from 'styled-components';

const Button = styled.button`
    & {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        background-color: ${({ theme }) => theme.mainOpaqueColor};
        align-self: flex-end;
    }
    
    &:hover {
        background-color: ${({ theme }) => theme.mainColor};
    }
`;

const Image = styled.img`
    & {
        width: 2rem;
        height: 2rem;
    }
`;

export { Button, Image };