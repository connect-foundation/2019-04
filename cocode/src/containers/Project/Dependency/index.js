import React, { useState } from 'react';
import * as Styled from './style';

import MoreLessButton from 'components/Project/MorelessButton';

function Dependency({ title, children }) {
    const [toggle, setToggle] = useState(true);

    const handleClickToggle = () => setToggle(!toggle);

    return (
        <Styled.Dependency>
            <Styled.Header>
                <Styled.Title>{title}</Styled.Title>
                <MoreLessButton onClick={handleClickToggle} toggle={toggle}/>
            </Styled.Header>
            <Styled.Body toggle={toggle}>{children}</Styled.Body>
        </Styled.Dependency>
    );
}

export default Dependency;