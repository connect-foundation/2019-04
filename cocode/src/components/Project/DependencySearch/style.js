import styled from 'styled-components';
import { DEPENDENCY_TAB_THEME } from 'constants/theme';

const SearchBar = styled.input.attrs(() => ({
	type: 'text',
	placeholder: 'Search on enter npm dependency'
}))`
	width: -webkit-fill-available;
	margin: 0.5rem 1rem;
	padding: 0.8rem;
	background-color: ${DEPENDENCY_TAB_THEME.dependencyTabInputBGColor};
	font-size: 0.8rem;
	color: white;
`;

const SpinnerContainer = styled.div`
	& > * {
		margin: 1rem auto;
	}
`;

const DependencySearchList = styled.ul`
	& {
		list-style: none;
		overflow: scroll;
		height: 50vh;
	}
`;

export { SearchBar, SpinnerContainer, DependencySearchList };
