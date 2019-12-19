import styled from 'styled-components';

const Logo = styled.img`
	padding-right: 1rem;
	padding-top: 0.3rem;

	height: 1.5rem;
	filter: invert(1);
`;

const Wrapper = styled.div`
	& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 70vh;
		padding: 5rem;
	}
`;

const Title = styled.h1`
	& {
		text-align: center;
		font-size: 3rem;
		font-weight: 700;
	}
`;

const LoginButton = styled.button`
	& {
		margin: 2rem 0 1.5rem 0;
		padding: 1rem 2.5rem;

		font-size: 1.5rem;

		background-color: white;
		color: black;
		border-radius: 0.5rem;
	}
`;

export { Logo, Wrapper, LoginButton, Title };
