import React from 'react';
import * as Styled from './style';

import Arrow from './Arrow.svg';

function ScrollTopButton() {
    const handleScrollTop = () => window.scrollTo(0, 0);

    return (
        <Styled.Button onClick={handleScrollTop}>
            <Styled.Image src={Arrow} alt="화살표" />
        </Styled.Button>
    );
}

export default ScrollTopButton;