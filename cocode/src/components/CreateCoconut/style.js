import styled from 'styled-components';

const BUTTON_BACKGROUND_COLOR = '#232e36';

const Button = styled.button`
	height: 9.5rem;
	width: 24rem;
	
	text-align: center;
	font-size: 2rem;
	font-weight: 300;
	
	color: ${({ theme }) => theme.textColor};
	background: ${BUTTON_BACKGROUND_COLOR} ;
	
	border: 0.1rem dashed ${({ theme }) => theme.mainColor};
	border-radius: 1rem;

	&:hover {
		opacity: 1;
	}
`;

export default Button;
