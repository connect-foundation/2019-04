import styled from 'styled-components';

const AboutUs = styled.section`
	& {
		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;
		justify-content: center;

		padding: 5rem 10rem;
	}
	
	.AboutUs-item {
		padding: 3rem;
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
		font-weight: 400;
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
		padding: 0.2rem;
	}
`;

const AboutUsProfileImage = styled.img`
	& {
		height: 11rem;
		width: 11rem;
		
		padding: 0.5rem;
		margin-bottom: 1.5rem;
	}
`;

const AboutUsProfileName = styled.h2`
	& {
		text-align: center;

		font-size: 1.5rem;
		font-weight: 100;
	}
`;

const AboutUsProfileLink = styled.a`
	& {
		text-align: center;
		text-decoration: none;

		color: ${({ theme }) => theme.textColor};
		font-size: 1.5rem;
		font-weight: 100;
	}

	&:hover {
		color: ${({ theme }) => theme.mainColor};
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
