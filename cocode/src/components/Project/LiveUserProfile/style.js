import styled from 'styled-components';
import { TAB_CONTAINER_THEME, LIVE_TAB_THEME } from 'constants/theme';

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
	}
`;

const UserName = styled.div`
	& {
		align-self: center;
		margin-left: 0.4rem;
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

export { Title, UserProfile, UserName, UserAvatar, SelfLabel };
