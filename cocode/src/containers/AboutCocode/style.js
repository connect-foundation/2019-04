import styled from 'styled-components';

const AboutCocode = styled.section`
	&,
	.AboutCocode {
		height: 100vh;
	}
`;

const DescriptionPhrase = styled.h1`
	& {
		text-align: center;

		font-size: 3rem;
		font-weight: lighter;
	}

	.DescriptionPhrase-emphasis {
		color: ${({ theme }) => theme.mainColor};
		font-weight: 600;
	}
`;

export { AboutCocode, DescriptionPhrase };