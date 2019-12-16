import styled from 'styled-components';

const ToastsWrapper = styled.div`
	bottom: 1em;
	right: 1em;
	position: fixed;
	z-index: 9999;
	max-height: 100vh;
	min-width: 30vh;
	text-align: right;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	overflow: hidden;
	background-color: rgba(255,0,0,0);
`;

export { ToastsWrapper };
