import styled from 'styled-components';

const BrowserV1 = styled.div`
	& {
		height: ${({ height }) => height};

		background-color: white;
		color: black;
	}
`;

export { BrowserV1 };
