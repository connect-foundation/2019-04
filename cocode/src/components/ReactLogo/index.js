import React from 'react';
import * as Styled from './style';
import logo from './react.svg';

function ReactLogo({ className }) {
    return (
        <Styled.Logo className={className}>
            <Styled.Image src={logo} />
            <Styled.Blur src={logo} />
        </Styled.Logo>
    );
}

export default ReactLogo;
