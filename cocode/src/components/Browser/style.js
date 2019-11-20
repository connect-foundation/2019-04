import styled from 'styled-components';

const Browser = styled.section`
	& {
		display: flex;
		flex-direction: column;
		justify-content: stretch;

		height: 88.8vh;
	}
`;

const BrowserHeader = styled.header`
	& {
		display: flex;
		flex-direction: row;
		align-items: center;

		padding: 0.4rem 0.6rem;

		background-color: #1d2022;
	}

	.BrowserHeader-item {
		margin: 0 0.5rem;
	}
`;

const AddressInput = styled.input`
	& {
		flex-grow: 2;

		padding: 0.5rem 1rem;

		background: black;
		color: white;
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
