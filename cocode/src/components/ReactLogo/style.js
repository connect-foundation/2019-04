import styled from 'styled-components';

const Image = styled.img`
    position: absolute;
    width: 25rem;
    height: 25rem;
`;

const Blur = styled.img`
    width: 25rem;
    height: 25rem;
    filter: blur(3rem);
`;

export { Image, Blur };