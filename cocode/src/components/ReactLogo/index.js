import React from 'react';
import * as Styled from './style';
import logo from './react.svg';

function ReactLogo({ className }) {
    return (
        <article className={className}>
            <Styled.Image src={logo} />
            <Styled.Blur src={logo} />
        </article>
    );
}

export default ReactLogo;
