import styled from 'styled-components';
import { TAB_CONTAINER_THEME, LIVE_TAB_THEME } from 'constants/theme';

const Container = styled.div`
	& {
		margin: 1rem 0;
	}
`;

const Title = styled.h1`
	& {
		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: ${TAB_CONTAINER_THEME.tabContainerTitleSize};
		font-weight: ${TAB_CONTAINER_THEME.tabContainerTitleWeight};
	}
`;

const UserProfile = styled.div`
	& {
		display: flex;
		margin: 0.7rem 0;
	}
`;

const UserName = styled.div`
	& {
		align-self: center;
		margin-left: 0.5rem;
		font-weight: 100;
		font-size: 1rem;
	}
`;

const UserAvatar = styled.img`
	& {
		width: 2rem;
		height: 2rem;
		border-radius: 0.3rem;
	}
`;

const SelfLabel = styled(UserName)`
	& {
		color: ${LIVE_TAB_THEME.liveSelfLabelColor};
	}
`;

export {
	Container,
	Title,
	UserProfile,
	UserName,
	UserAvatar,
	SelfLabel
};
