import styled from 'styled-components';
import { EXPLORER_TAB_CONTAINER_THEME } from 'constants/theme';

const {
	explorerTabContainerIconColor,
	explorerTabContainerIconHoverColor
} = EXPLORER_TAB_CONTAINER_THEME;

const Svg = styled.svg`
	& {
		vertical-align: middle;

		fill: ${explorerTabContainerIconColor};
	}

	&:hover {
		fill: ${explorerTabContainerIconHoverColor};
	}
`;

export { Svg };
