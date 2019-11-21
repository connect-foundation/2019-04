import styled from 'styled-components';

const ProjectCard = styled.section`
	& {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		height: 9.5rem;
		width: 24rem;

		background-color: white;
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
		color: ${({ theme }) => theme.backgroundColor};
		font-size: 2rem;
		margin: 0;
		margin-left: 1.5rem;
		padding: 0;
	}
`;

const ProjectDescription = styled.p`
	& {
		font-size: 1.25rem;
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
