import styled from 'styled-components';

const Logo = styled.img`
    padding-right: 0.8rem;
`;

const LoginModalBody = styled.div`
	& {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 25rem;
	}
`;

const LoginModalBodyTitle = styled.h1`
	& {
		text-align: center;
		font-size: 3rem;
	}
`;

const LoginModalBodyButton = styled.button`
	& {
		margin: 3rem 0 1.5rem 0;
		padding: 0.5rem 1.5rem;

		font-size: 1.25rem;

		background-color: black;
		opacity: 0.85;
		border-radius: 0.5rem;
	}
	
	&:hover {
		opacity: 1;
	}
`;

export { Logo, LoginModalBody, LoginModalBodyTitle, LoginModalBodyButton };
