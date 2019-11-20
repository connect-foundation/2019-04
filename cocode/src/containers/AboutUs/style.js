import styled from 'styled-components';

const AboutUs = styled.section`
	& {
		height: 100vh;
		width: 100vw;

		padding: 5rem 10rem;
	}
	& > * > * {
		padding: 5rem;
	}
`;

const AboutUsTitle = styled.h1`
	& {
		text-align: center;

		font-size: 3rem;
		font-weight: lighter;
	}

	.AboutUsTitle-main {
		color: ${({ theme }) => theme.mainColor};
	}
`;

const AboutUsProfileCard = styled.div`
	& {
		display: flex;
		flex-direction: column;
	}

	& > * {
		margin: 0.5rem;
	}
`;

const AboutUsProfileImage = styled.img`
	& {
		height: 12rem;
		width: 12rem;

		margin: 0 auto;
	}
`;

const AboutUsProfileName = styled.h2`
	& {
		text-align: center;

		font-size: 2rem;
		font-weight: 100;
	}
`;

const AboutUsProfileLink = styled.a`
	& {
		text-align: center;
		text-decoration: none;

		color: ${({ theme }) => theme.textColor};
		font-size: 2rem;
		font-weight: 100;
	}
`;

export {
	AboutUs,
	AboutUsTitle,
	AboutUsProfileCard,
	AboutUsProfileImage,
	AboutUsProfileName,
	AboutUsProfileLink
};
