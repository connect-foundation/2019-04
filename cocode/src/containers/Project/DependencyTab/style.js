import styled from 'styled-components';

const Frame = styled.div`
	& {
		position: relative;

		height: 100%;
	}

	& > * {
		width: 100%;
	}
`;

const InstallingDisplay = styled.div`
	& {
		position: absolute;
		z-index: 1;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 100%;

		background-color: rgba(0, 0, 0, 0.7);
	}
`;

const InstallPhrase = styled.p`
	& {
		margin-top: 2rem;

		font-size: 1rem;
		font-weight: lighter;
	}
`;

const DependencyArea = styled.div`
	& {
		position: absolute;
	}
`;

export { Frame, InstallingDisplay, InstallPhrase, DependencyArea };
