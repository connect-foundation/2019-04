import styled from 'styled-components';

const BUTTON_COLOR = '#2b2b2b';
const BUTTON_COLOR_HOVER = '#4b4b4b';
const BUTTON_BOUNDARY = '#383838';

const DropDownMenu = styled.div`
	& {
		display: flex;
		justify-content: flex-end;

		position: relative;
	}
`;

const DropDownList = styled.ul`
	& {
		display: flex;
		flex-direction: column;

		position: absolute;

		top: 100%;
		padding: 0;
		margin: 0;
	}
`;

const DropDownItem = styled.button`
	& {
		height: 2.5rem;
		width: 8rem;
		padding: 0.25rem 1rem;
		z-index: 1;

		font-size: 1.5rem;
		vertical-align: center;
		text-align: right;

		background-color: ${BUTTON_COLOR};

		border: none;
		border-top: solid ${BUTTON_BOUNDARY};
	}
	&:hover {
		background-color: ${BUTTON_COLOR_HOVER};
		cursor: pointer;
	}
`;

export { DropDownMenu, DropDownList, DropDownItem };
