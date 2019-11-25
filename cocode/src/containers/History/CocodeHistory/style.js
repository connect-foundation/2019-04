import styled from 'styled-components';

const CocodeHistory = styled.main`
	text-align: center;
`;

const Version = styled.section`
	padding: 5rem;
`;

const VersionTitle = styled.h1`
	font-size: 4rem;
	font-weight: normal;
`;

const VersionDesctiption = styled.ul`
	margin-top: 1rem;

	list-style-type: none;

	font-size: 2rem;
	font-weight: lighter;

	li {
		margin: 0.5rem 0;
	}
`;

export { CocodeHistory, Version, VersionTitle, VersionDesctiption };
