import styled from 'styled-components';
import { PROJECT_CARD_THEME } from 'constants/theme';

const ProjectCard = styled.section`
	& {
		height: ${PROJECT_CARD_THEME.cardHeight};
		width: ${PROJECT_CARD_THEME.cardWidth};

		background-color: ${PROJECT_CARD_THEME.cardBackgroundColor};
		border-radius: 1rem;

		padding: 0;
		margin: 0;
	}
`;

const ProjectArticle = styled.article`
	& {
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		margin-left: 2rem;
	}
`;

const ProjectTitle = styled.h1`
	& {
		color: ${({ theme }) => theme.backgroundColor};
		font-size: ${PROJECT_CARD_THEME.cardTitleFontSize};
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
`;

const ProjectDescription = styled.div`
	display: flex;
	margin-right: 0.6rem;

	> * {
		flex: none;
	}

	> div {
		display: inline-block;
		margin-left: auto;
	}
`;

const ProjectTimeLabel = styled.span`
	font-size: ${PROJECT_CARD_THEME.cardDescriptFontSize};
	padding: 0;
`;

const ProjectMenuButton = styled.button`
	& {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		height: 2rem;
		width: 2rem;

		outline: none;
		border: none;
		padding: 0;
	}
	&:hover {
		cursor: pointer;
	}
`;

const ProjectMenuButtonDot = styled.div`
	display: inline;
	flex-grow: 0;
	height: 0.3rem;
	width: 0.3rem;
	background-color: #7c7c7c;

	border-radius: 50%;
`;

export {
	ProjectCard,
	ProjectArticle,
	ProjectTitle,
	ProjectDescription,
	ProjectTimeLabel,
	ProjectMenuButton,
	ProjectMenuButtonDot
};
