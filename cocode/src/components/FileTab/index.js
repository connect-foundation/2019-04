import React from 'react';
import * as Styled from './style';

function FileTab({ index, FileName, icon, type, className, onClick }) {
    const handleTabClick = () => onClick(index);

    return (
        <Styled.Tab onClick={handleTabClick} className={className}>
            <Styled.Icon src={icon} alt={type} />
            {FileName}
        </Styled.Tab>
    );
}

export default FileTab;