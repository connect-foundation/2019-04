import styled from 'styled-components';
import { LIVE_TAB_THEME } from 'constants/theme';

const Container = styled.div`
	& {
		margin: 0.7rem 1rem;
	}
`;

const Description = styled.div`
	& {
		margin-bottom: 1rem;
		color: ${LIVE_TAB_THEME.liveFontColor};
		font-size: 1rem;
		font-weight: 100;
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

const Close = styled.img`
	& {
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.5rem;
	}
`;

const LiveStatusLabel = styled.div`
	& {
		display: flex;
		margin-bottom: 1rem;
		color: ${LIVE_TAB_THEME.liveStatusLabelColor};
		font-size: 1.1rem;
		font-weight: lighter;
	}
`;

const LiveStatusSpan = styled.span`
	& {
		background-color: ${LIVE_TAB_THEME.liveStatusLabelColor};
		margin: auto 1rem auto 0.3rem;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
	}
`;

const LinkURL = styled.div`
	& {
		display: flex;
		width: 100%;
		overflow: auto;
		padding: 0.5rem 1rem;
    	margin-bottom: 0.5rem;
    	align-items: center;
		background-color: ${LIVE_TAB_THEME.liveLinkBGColor};
		color: ${LIVE_TAB_THEME.liveFontColor};
		font-size: 0.9rem;
	}
`;

const Copy = styled.img`
	& {
		width: 0.8rem;
		height: 0.8rem;
		cursor: pointer;
		margin-right: 0.5rem;
    	user-select: none;
	}
`;

export {
	Container,
	Description,
	Button,
	Close,
	LiveStatusLabel,
	LiveStatusSpan,
	LinkURL,
	Copy
};
