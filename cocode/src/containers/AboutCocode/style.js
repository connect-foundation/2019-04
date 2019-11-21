import styled from 'styled-components';

const AboutCocode = styled.section`
	& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 100vh;
	}
`;

const DescriptionPhrase = styled.h1`
	& {
		text-align: center;

		font-size: 2.8rem;
		font-weight: lighter;
	}

	.DescriptionPhrase-emphasis {
		color: ${({ theme }) => theme.mainColor};
		font-weight: 400;
	}
`;

export { AboutCocode, DescriptionPhrase };
