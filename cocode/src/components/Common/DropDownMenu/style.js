import styled from 'styled-components';
import { DROPDOWN_THEME } from 'constants/theme';

const DropDownMenu = styled.div`
	& {
		position: relative;
		display: flex;
		justify-content: flex-end;

	}
`;

const DropDownList = styled.ul`
	& {
		position: absolute;
		display: flex;
		flex-direction: column;

		top: 100%;
		
		margin: 0;
		padding: 0;
	}
`;

const DropDownItem = styled.button`
	& {
		height: 2.5rem;
		width: 7rem;
		padding: 0.25rem 1rem;
		z-index: 1;

		font-size: 1rem;
		font-weight: 300;
		vertical-align: center;
		text-align: right;

		background-color: ${DROPDOWN_THEME.dropdownButtonColor};

		border: none;
		border-top: 1px solid ${DROPDOWN_THEME.dropdownButtonBorderColor};
	}
	&:hover {
		background-color: ${DROPDOWN_THEME.dropdownButtonHoverColor};
		cursor: pointer;
	}
`;

export { DropDownMenu, DropDownList, DropDownItem };
