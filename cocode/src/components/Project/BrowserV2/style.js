import styled from 'styled-components';

const BrowserV2 = styled.div`
	& {
		height: ${({ height }) => height};

		background-color: white;
		color: black;
	}
`;

export { BrowserV2 };
