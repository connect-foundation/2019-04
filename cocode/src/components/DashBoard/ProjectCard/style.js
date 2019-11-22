import styled from 'styled-components';

const ProjectCard = styled.section`
	& {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		height: ${({ cardHeight }) => cardHeight};
		width: ${({ cardWidth }) => cardWidth};

		background-color: ${({ cardBackgroundColor }) => cardBackgroundColor};
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

		flex: 1;
	}
`;

const ProjectTitle = styled.h1`
	& {
		color: ${({ cardTextColor }) => cardTextColor};
		font-size: ${({ cardTitleFontSize }) => cardTitleFontSize};

		margin: 0;
		margin-left: 1.5rem;
		padding: 0;
	}
`;

const ProjectDescription = styled.p`
	& {
		font-size: ${({ cardDescriptFontSize }) => cardDescriptFontSize};

		margin: 0;
		margin-left: 1.5rem;
		padding: 0;
	}
`;

const ProejctMenuButton = styled.button`
	& {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		position: relative;
		top: 70%;
		right: 15%;

		background-color: #00000000;

		height: 2.3rem;
		width: 1.3rem;

		outline: none;
		border: none;
		margin: 0;
		padding: 0.5rem;
	}
	&:hover {
		cursor: pointer;
	}
`;

const ProjectMenuButtonDot = styled.div`
	& {
		height: 0.3rem;
		width: 0.3rem;
		background-color: #7c7c7c;

		border-radius: 0.15rem;
	}
`;

export {
	ProjectCard,
	ProjectArticle,
	ProjectTitle,
	ProjectDescription,
	ProejctMenuButton,
	ProjectMenuButtonDot
};
