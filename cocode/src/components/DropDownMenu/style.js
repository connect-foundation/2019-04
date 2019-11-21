import styled from 'styled-components';

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
		color: ${({ theme }) => theme.textColor};
		vertical-align: center;
		text-align: right;

		background-color: #2b2b2b;

		border: none;
		border-top: solid #383838;
	}
	&:hover {
		background-color: #4b4b4b;
		cursor: pointer;
	}
`;

export { DropDownMenu, DropDownList, DropDownItem };
