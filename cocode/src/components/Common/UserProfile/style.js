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
        cursor: pointer;
    }
`;

export { UserProfile, UserName, UserAvatar };