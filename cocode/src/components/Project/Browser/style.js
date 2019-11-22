import styled from 'styled-components';

const Browser = styled.section`
	& {
		display: flex;
		flex-direction: column;
		justify-content: stretch;

		height: ${({ height }) => height};
	}
`;

const BrowserHeader = styled.header`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem 0.6rem;

		background-color: ${({ browserHeaderBGColor }) => browserHeaderBGColor};
	}

	.BrowserHeader-item {
		margin: 0 0.5rem;
	}
`;

const AddressInput = styled.input`
	& {
		flex-grow: 2;

		padding: 0.5rem 1rem;

		background: ${({ adressInputBGColor }) => adressInputBGColor};
		color: ${({ adressInputTextColor }) => adressInputTextColor};
		font-size: 1rem;
	}
`;

const Iframe = styled.iframe`
	& {
		flex-grow: 2;
		background-color: white;
	}
`;

export { Browser, BrowserHeader, AddressInput, Iframe };
