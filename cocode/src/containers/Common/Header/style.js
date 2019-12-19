import styled from 'styled-components';

const Header = styled.header`
	& {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		height: ${({ theme }) => theme.headerHeight};

		background-color: ${({ theme }) => theme.backgroundColor};
		padding: 2rem 2.3rem;
	}
`;

const ProjectName = styled.div`
	& {
		font-size: 1.3rem;
	}
`;

const SignInButton = styled.button`
	& {
		font-size: 1.4rem;
		font-weight: 100;
	}

	&:hover {
		color: ${({ theme }) => theme.mainColor};
	}
`;

export { Header, SignInButton, ProjectName };
