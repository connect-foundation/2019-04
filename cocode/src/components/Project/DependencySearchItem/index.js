import React from 'react';
import * as Styled from './style';

import PlusImage from 'components/Project/PlusImage';
import GitHubLogo from 'components/Project/GitHubLogo';
import NpmLogo from 'components/Project/NpmLogo';
import DependencySelector from 'components/Project/DependencySelector';

function DependencySearchItem({ name, versions, github, npm }) {
    return (
        <Styled.Item>
            {name}
            <Styled.Description>
                {/*<DependencySelector options={versions} />*/}
                <PlusImage />
                <GitHubLogo href={github}/>
                <NpmLogo href={npm}/>
            </Styled.Description>
        </Styled.Item>
    );
}

export default DependencySearchItem;
