import styled from 'styled-components';
import { DEPENDENCY_TAB_THEME } from 'constants/theme';

const SearchBar = styled.input.attrs(() => ({
	type: 'text',
	placeholder: 'Search on enter npm dependency',
}))`
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.8rem;
    background-color: ${DEPENDENCY_TAB_THEME.dependencyTabInputBGColor};
    font-size: 0.8rem;
    color: white;
`;

const DependencySearchList = styled.ul`
    & {
        list-style: none;
    }
`;

export {
	SearchBar,
	DependencySearchList
};
