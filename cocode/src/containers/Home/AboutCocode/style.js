import styled from 'styled-components';

const AboutCocode = styled.section`
	& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 100vh;
		padding: 5rem;
	}
`;

const DescriptionPhrase = styled.h1`
	& {
		text-align: center;

		font-size: 2.8rem;
		font-weight: lighter;
		
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.DescriptionPhrase-emphasis {
		color: ${({ theme }) => theme.mainColor};
		font-weight: 400;
		display: contents;
	}
`;

export { AboutCocode, DescriptionPhrase };
