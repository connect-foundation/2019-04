import styled from 'styled-components';

const Svg = styled.svg`
	.Target {
		fill: ${({ fillColor }) => fillColor};
		stroke: ${({ fillColor }) => fillColor};
	}
`;

export { Svg };
