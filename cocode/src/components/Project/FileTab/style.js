import styled from 'styled-components';
import { FILE_TAB_THEME } from 'constants/theme';

const Tab = styled.li`
	& {
		padding: 0.8rem;
		display: inline-flex;
		background-color: ${({ clicked }) =>
			clicked
				? FILE_TAB_THEME.fileTabClickedBGColor
				: FILE_TAB_THEME.fileTabDefaultBGColor};
		font-size: ${FILE_TAB_THEME.fileTabFontSize};
		cursor: pointer;
	}

	&:hover {
		& > img {
			visibility: visible;
		}
	}
`;

const Icon = styled.img`
	& {
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.3rem;
	}
`;

const Close = styled.img`
	& {
		width: ${FILE_TAB_THEME.fileTabCloseButtonSize};
		height: ${FILE_TAB_THEME.fileTabCloseButtonSize};
		margin-top: 0.18rem;
		margin-left: 0.5rem;
		visibility: ${({ clicked }) => (clicked ? 'visible' : 'hidden')};
	}
`;

export { Icon, Tab, Close };
