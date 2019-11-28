import React from 'react';
import * as Styled from './style';

import DependencySelector from 'components/Project/DependencySelector';
import close from './close.svg';

function DependencyItem({ name, version, versions }) {
    return (
        <Styled.Item>
            {name}
            <Styled.Close src={close}/>
            <DependencySelector options={versions} />
            <Styled.Version>^{version}</Styled.Version>
        </Styled.Item>
    );
}

export default DependencyItem;