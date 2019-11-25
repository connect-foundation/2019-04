import styled from 'styled-components';

const Content = styled.div`
	& {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
`;

const AboutUs = styled.section`
	& {
		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;
		justify-content: center;

		padding: 5rem;
	}
	
	.AboutUs-item {
		padding: 3rem 5rem;
	}
`;

const AboutUsTitle = styled.h1`
	& {
		text-align: center;

		font-size: 2.8rem;
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
		height: 9.8rem;
		width: 9.8rem;
		
		padding: 0.5rem;
		margin-bottom: 1.3rem;
	}
`;

const AboutUsProfileName = styled.h2`
	& {
		text-align: center;

		font-size: 1.3rem;
		font-weight: 100;
	}
`;

const AboutUsProfileLink = styled.a`
	& {
		text-align: center;
		text-decoration: none;

		color: ${({ theme }) => theme.textColor};
		font-size: 1.3rem;
		font-weight: 100;
	}

	&:hover {
		color: ${({ theme }) => theme.mainColor};
	}
`;

export {
	Content,
	AboutUs,
	AboutUsTitle,
	AboutUsProfiles,
	AboutUsProfileCard,
	AboutUsProfileImage,
	AboutUsProfileName,
	AboutUsProfileLink
};
