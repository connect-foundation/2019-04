import styled from 'styled-components';
import { PROJECT_CARD_THEME } from 'constants/theme';

const ProjectArticle = styled.article`
	& {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: relative;

		height: ${PROJECT_CARD_THEME.cardHeight};
		width: ${PROJECT_CARD_THEME.cardWidth};

		padding: 2rem 1.2rem 1.6rem 1.8rem;

		background-color: ${PROJECT_CARD_THEME.cardBackgroundColor};
		border-radius: 1rem;
	}
`;

const ProjectTitle = styled.h2`
	& {
		margin-bottom: 1rem;
		color: ${({ theme }) => theme.backgroundColor};
		font-size: ${PROJECT_CARD_THEME.cardTitleFontSize};
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&[contenteditable='true'] br {
		display: none;
	}
`;

const ProjectDescription = styled.div`
	display: flex;
	align-items: flex-end;
	color: ${({ theme }) => theme.backgroundColor};

	> * {
		flex: none;
	}

	> div {
		display: inline-block;
		margin-left: auto;
	}
`;

const ProjectTimeLabel = styled.span`
	font-size: ${PROJECT_CARD_THEME.cardDescriptionFontSize};
	padding: 0;
`;

const ProjectMenuButton = styled.button`
	& {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-end;

		height: 1.5rem;
		width: 1.5rem;
	}
`;

const ProjectMenuButtonDot = styled.div`
	display: inline;
	flex-grow: 0;
	height: 0.3rem;
	width: 0.3rem;
	background-color: ${PROJECT_CARD_THEME.buttonDotColor};

	border-radius: 50%;
`;

const SpinnerContainer = styled.div`
	& {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;

		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.7);
	}
`;

const LoadingPhrase = styled.p`
	& {
		margin-top: 1rem;

		font-size: 1rem;
		font-weight: lighter;
	}
`;

export {
	ProjectArticle,
	ProjectTitle,
	ProjectDescription,
	ProjectTimeLabel,
	ProjectMenuButton,
	ProjectMenuButtonDot,
	SpinnerContainer,
	LoadingPhrase
};
