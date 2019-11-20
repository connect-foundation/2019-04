import styled from 'styled-components';

const AboutUs = styled.section`
	& {
		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;

		padding: 5rem 10rem;
	}
	.AboutUs-item {
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

const AboutUsProfiles = styled.div`
	& {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
`;
const AboutUsProfileCard = styled.div`
	& {
		display: flex;
		flex-direction: column;
	}

	.AboutUsProfileCard-item {
		padding: 0.5rem;
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

	&:hover {
		text-decoration: underline;
	}
`;

export {
	AboutUs,
	AboutUsTitle,
	AboutUsProfiles,
	AboutUsProfileCard,
	AboutUsProfileImage,
	AboutUsProfileName,
	AboutUsProfileLink
};
