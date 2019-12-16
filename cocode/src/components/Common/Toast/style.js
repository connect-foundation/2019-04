import styled, { keyframes } from 'styled-components';
import { DEFAULT_THEME, TOAST_THEME } from 'constants/theme';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	to {
		opacity: 1;
		transform: none;
	}
`;

const fadeOut = keyframes`
	to {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	from {
		opacity: 1;
		transform: none;
	}
`;

const ToastsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	overflow: hidden;
	position: fixed;

	max-height: 100vh;
	min-width: 30vh;
	bottom: 1rem;
	right: 1rem;

	z-index: 9999;
`;

const ToastItem = styled.div`
	width: 25rem;
	visibility: visible;
	background-color: ${TOAST_THEME.toastBGColor};
	padding: 2.8rem 0.3rem;
	margin-bottom: 1rem;
	position: relative;

	animation-name: ${({ isWillDisappear }) =>
		isWillDisappear ? fadeOut : fadeIn};
	animation-duration: 1s;
	animation-fill-mode: both;

	border-style: solid;
	border-left-width: 0.3rem;
	border-radius: 0.2rem;
	border-color: ${props =>
		props.error ? TOAST_THEME.toastErrorDeco : DEFAULT_THEME.mainColor};
`;

const MessageContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
`;

const InfoIcon = styled.span`
	& {
		position: absolute;
		top: 20%;
		left: 5%;
		text-align: center;
		width: 1.3rem;
		height: 1.3rem;
		background-color: ${DEFAULT_THEME.mainColor};
		border-radius: 50%;
	}

	&:before,
	&:after {
		position: absolute;
		content: ' ';
		width: 0.2rem;
		left: 44%;
		border-radius: 0.1rem;
		background-color: ${TOAST_THEME.toastBGColor};
	}

	&:before {
		top: 25%;
		height: 0.17rem;
	}
	&:after {
		top: 43%;
		height: 0.5rem;
	}
`;

const Close = styled.span`
	& {
		position: absolute;
		top: 20%;
		left: 8%;
		width: 1.3rem;
		height: 1.3rem;
		opacity: 0.3;
	}

	&:before,
	&:after {
		position: absolute;
		content: ' ';
		height: 1.3rem;
		width: 0.1rem;
		background-color: ${TOAST_THEME.toastErrorDeco};
	}

	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(-45deg);
	}
`;

const Text = styled.div`
	position: absolute;
	top: 50%;
	left: 7%;
	width: 100%;
	transform: translate(0%, -50%);
	display: inline-block;
	text-align: justify;
	font-size: 1rem;
`;

export { ToastsWrapper, ToastItem, Text, MessageContainer, InfoIcon, Close };
