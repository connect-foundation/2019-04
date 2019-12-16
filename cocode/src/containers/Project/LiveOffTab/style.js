import styled from 'styled-components';
import { LIVE_TAB_THEME } from 'constants/theme';

const Container = styled.div`
	& {
		margin: 0.7rem 1rem;
	}
`;

const Description = styled.div`
	& {
		color: ${LIVE_TAB_THEME.liveFontColor};
		font-size: 1rem;
		font-weight: 100;
    	margin-bottom: 1rem;
	}
`;

const Button = styled.button`
	& {
		display: flex;
    	align-items: center;
    	justify-content: center;
	    width: -webkit-fill-available;
		padding: 0.7rem 2.2rem;
		border-radius: 0.7rem;
		background-color: ${LIVE_TAB_THEME.liveButtonBGColor};
		font-size: 1rem;
		font-weight: 400;
	}

	&:hover {
		background-color: ${LIVE_TAB_THEME.liveButtonBGColorHover};
	}
`;

const Circle = styled.div`
	& {
		width: 0.5rem;
		height: 0.5rem;
		margin-right: 0.5rem;
		background-color: ${LIVE_TAB_THEME.liveCircleBGColor};
		border-radius: 50%;
	}
`;

export {
	Container,
	Description,
	Button,
	Circle
};
