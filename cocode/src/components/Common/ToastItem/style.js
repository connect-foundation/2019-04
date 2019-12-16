import styled, { keyframes } from 'styled-components';
import { DEFAULT_THEME } from 'constants/theme';

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

const Toasts = styled.div`
	width: 25rem;
	visibility: visible;
	background-color: rgb(14,18,34);
	padding: 3rem 0.3rem;
	margin-bottom: 1rem;
	cursor: pointer;
	position: relative;

	animation-name: ${({ isWillDisappear }) =>
	isWillDisappear ? fadeOut : fadeIn};
	animation-duration: 1s;
	animation-fill-mode: both;

	border-style: solid;
	border-left-width: 0.3rem;
	border-radius: 0.2rem;
	border-color: ${props => (props.error ? 'red' : DEFAULT_THEME.mainColor)};
`;

const MessageContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 80%;
	width: 80%;
`;

const InfoIcon = styled.span`
	& {
		position: absolute;
		top: 20%;
		left: 5%;
		text-align: center;
		font-weight: 100;
		line-height: 1.6;
		width: 1.3rem;
		height: 1.3rem;
		border: 0;
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
		background-color: rgba(34, 32, 31, 0.55);
	}

	&:before {
		top: 25%;
		height: 0.15rem;
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
		left: 3%;
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
		background-color: red;
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

export { Toasts, Text, MessageContainer, InfoIcon, Close };
