import styled from 'styled-components';
import { PROJECT_CARD_THEME } from 'constants/theme';

const Button = styled.button`
	height: ${PROJECT_CARD_THEME.cardHeight};
	width: ${PROJECT_CARD_THEME.cardWidth};

	text-align: center;
	font-size: 2rem;
	font-weight: 300;

	color: ${({ theme }) => theme.textColor};
	background: ${PROJECT_CARD_THEME.buttonBackgroundColor};

	border: 0.1rem dashed ${({ theme }) => theme.mainColor};
	border-radius: 1rem;

	&:hover {
		opacity: 1;
	}
`;

export default Button;
