import styled from 'styled-components';

const Header = styled.header`
	& {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		height: ${({ theme }) => theme.headerHeignt};

		background-color: ${({ theme }) => theme.backgroundColor};
		padding: 2rem 2.3rem;
	}
`;

const HeaderCategory = styled.button`
	& {
		margin-left: 1.5rem;

		font-size: 1.4rem;
		font-weight: 100;
	}
`;

const HeaderRightSideArea = styled.div`
	& {
		margin-left: auto;
	}
`;

const SignInButton = styled.button`
	& {
		font-size: 1.4rem;
		font-weight: 100;
	}

	&:hover {
		font-weight: 400;
	}
`;

export { Header, SignInButton, HeaderCategory, HeaderRightSideArea };
