import styled from 'styled-components';
import { DEFAULT_THEME } from 'constants/theme';

const WeAreSorry = styled.section`
	& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 70vh;
		padding: 5rem;
	}
`;

const Title = styled.h1`
	& {
		text-align: center;

		font-size: 2.8rem;
		font-weight: lighter;

		flex: 0 1;
	}
`;

const Description = styled.p`
	& {
		text-align: center;

		font-size: 1.8rem;
		font-weight: lighter;

		flex: 0 1;

		a {
			color: ${DEFAULT_THEME.mainColor};
		}
		a:hover {
			color: ${DEFAULT_THEME.mainOpaqueColor};
		}
	}
`;

const CoconutImage = styled.img`
	& {
		height: 9.8rem;
		width: 9.8rem;

		padding: 0.5rem;
		margin-bottom: 1.3rem;
	}
`;
export { WeAreSorry, Title, Description, CoconutImage };
