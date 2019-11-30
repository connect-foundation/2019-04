import React from 'react';
import * as Styled from './style';

function TabIcon({ theme, index, name, icon, onClick, clicked }) {
    const handleTabClick = () => onClick(index);

    return (
        <Styled.Button clicked={clicked} onClick={handleTabClick} theme={theme}>
            <Styled.Icon src={icon} alt={name} />
        </Styled.Button>
    );
}

export default TabIcon;
