import React from 'react';
import * as Styled from './style';

function UserProfile({ username, avatar }) {
    return (
        <Styled.UserProfile>
            <Styled.UserName>
                {username}
            </Styled.UserName>
            <Styled.UserAvatar src={avatar} alt='프로필' />
        </Styled.UserProfile>
    );
}

export default UserProfile;