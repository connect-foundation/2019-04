import React from 'react';
import * as Styled from './style';
import DropDownMenu from 'components/Common/DropDownMenu';

function UserProfile({ username, avatar, menuItems }) {
	return (
		<Styled.UserProfile>
			<Styled.UserName>{username}</Styled.UserName>
			<DropDownMenu menuItems={menuItems}>
				<Styled.UserAvatar src={avatar} alt="프로필" />
			</DropDownMenu>
		</Styled.UserProfile>
	);
}

export default UserProfile;
