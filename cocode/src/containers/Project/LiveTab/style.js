import styled from 'styled-components';
import { TAB_CONTAINER_THEME, LIVE_TAB_THEME } from 'constants/theme';

const Wrapper = styled.div`
	& {
		padding: 0.7rem 1rem;
	}

	& > * {
		padding: 0.5rem 0;
	}
`;

const Title = styled.h1`
	& {
		padding: 0.7rem 1rem;
		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: ${TAB_CONTAINER_THEME.tabContainerTitleSize};
		font-weight: ${TAB_CONTAINER_THEME.tabContainerTitleWeight};
		background-color: ${TAB_CONTAINER_THEME.tabContainerHeaderBGColor};
	}
`;

const Description = styled.div`
	& {
		color: ${LIVE_TAB_THEME.liveFontColor};
		font-size: 1rem;
		font-weight: 100;
	}
`;

const Button = styled.button`
	& {
		width: -webkit-fill-available;
		margin: 1rem 0;
		padding: 1rem 2.2rem;
		border-radius: 0.3rem;
		background-color: ${LIVE_TAB_THEME.liveButtonBGColor};
		font-size: 1rem;
		font-weight: 400;
	}

	&:hover {
		background-color: ${LIVE_TAB_THEME.liveButtonBGColorHover};
	}
`;

const LiveStatusLabel = styled.div`
	& {
		display: flex;
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
		background-color: ${LIVE_TAB_THEME.liveLinkBGColor};
		color: ${LIVE_TAB_THEME.liveFontColor};
		font-size: 0.9rem;
		padding-left: 1rem;
	}
`;

export {
	Wrapper,
	Title,
	Description,
	Button,
	LiveStatusLabel,
	LiveStatusSpan,
	LinkURL
};
