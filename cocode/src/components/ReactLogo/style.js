import styled from 'styled-components';

const Logo = styled.article`
    position: relative;
    width: 25rem;
    height: 25rem;
`;

const Image = styled.img`
    position: absolute;
    width: 25rem;
    height: 25rem;
`;

const Blur = styled.img`
    position: absolute;
    width: 25rem;
    height: 25rem;
    filter: blur(3rem);
`;

export { Logo, Image, Blur };