import styled from 'styled-components';

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

		color: white;
		background-color: black;
		border-radius: 0.5rem;
	}
`;

export { LoginModalBody, LoginModalBodyTitle, LoginModalBodyButton };
