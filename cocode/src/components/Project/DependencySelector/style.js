import styled from 'styled-components';
import { DEPENDENCY_TAB_THEME } from 'constants/theme';

const Select = styled.select`
	& {
		padding: 0 0.7rem 0 0.1rem;
		float: right;

		cursor: pointer;
		color: ${DEPENDENCY_TAB_THEME.dependencyTextColor};
		font-size: 0.8rem;

		background-color: ${DEPENDENCY_TAB_THEME.dependencyTabSelectBGColor};
		background-image: url('https://i.imgur.com/AzGpKhN.png');
		background-repeat: no-repeat;
		background-position: right center;
		background-size: 0.4rem;

		border-radius: 0.3rem;
		border: 2px solid ${DEPENDENCY_TAB_THEME.dependencyTabSelectBGColor};
		border-right: 3px solid
			${DEPENDENCY_TAB_THEME.dependencyTabSelectBGColor};

		-webkit-appearance: none;
	}
`;

export {
	Select
};
