import styled, { css } from 'styled-components';
import Link from 'react-router-dom/Link';

const styles = css`
	border: none;
	outline: none;
	background-color: ${props => (props.red ? '#F27777' : '#66B9F4')};

	border-radius: 0.1rem;

	box-sizing: border-box;
	font-size: 1.125em;
	text-align: center;
	color: white;
`;

export const LinkButton = styled(Link)`
	${styles};
`;
export const AButton = styled.a`
	${styles};
`;
export const Button = styled.button`
	${styles};
`;
