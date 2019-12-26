import styled from 'styled-components';

const UserProfile = styled.div`
    & {
        display: flex;
    }
`;

const UserName = styled.div`
    & {
        align-self: center;
        margin-right: 2rem;
        font-weight: 100;
        font-size: 1.4rem;
    }
`;

const UserAvatar = styled.img`
    & {
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
    }
`;

const DownArrow = styled.img`
	& {
		width: 1rem;
		height: 1rem;
		margin: auto 0 auto 1rem;
		cursor: pointer;
		filter: invert(0.3);
	}
	
	&:hover {
		filter: invert(0);
	}
`;

export { UserProfile, UserName, UserAvatar, DownArrow };