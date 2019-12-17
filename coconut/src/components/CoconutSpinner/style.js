import styled from 'styled-components';

const Container = styled.div`
	position: relative;

	width: 3.5rem;
	height: 3.5rem;
`;

const Content = styled.div`
	position: absolute;
	top: 1.1rem;
	left: 0.8rem;
`;

const SpinningArc = styled.div`
	position: absolute;
	width: 3.5rem;
	height: 3.5rem;
	background-color: transparent;

	box-sizing: content-box;
	border: 3px solid white;
	border-radius: 100%;
	border-bottom-color: transparent;

	animation: 1s linear 0s infinite normal both running spin;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

export { Container, Content, SpinningArc };
