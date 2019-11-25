import styled from 'styled-components';
import { PROJECT_CARD_THEME } from 'constants/theme';

const Button = styled.button`
	height: 8rem;
	width: 21rem;

	text-align: center;
	font-size: ${PROJECT_CARD_THEME.buttonFontSize};
	font-weight: ${PROJECT_CARD_THEME.buttonFontWight};

	color: ${({ theme }) => theme.textColor};
	background: ${PROJECT_CARD_THEME.buttonBackgroundColor};

	border: 0.1rem dashed ${({ theme }) => theme.mainColor};
	border-radius: 1rem;

	&:hover {
		opacity: 1;
	}
`;

export default Button;
