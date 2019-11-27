import styled from 'styled-components';

const Image = styled.svg`
    & {
        width: 1rem;
        height: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
        color: gray;
        transition: .2s;
        transform: ${({ toggle }) => toggle ? 'rotate(0)' : 'rotate(-90deg)'};
    }
    
    &:hover {
        color: white;
    }
`;

export {
	Image
};