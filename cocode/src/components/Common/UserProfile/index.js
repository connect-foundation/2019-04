import React from 'react';
import * as Styled from './style';

import DropDownMenu from 'components/Common/DropDownMenu';
import down from './down.svg';

function UserProfile({ username, avatar, menuItems }) {
	return (
		<Styled.UserProfile>
			<Styled.UserName>{username}</Styled.UserName>
			<Styled.UserAvatar src={avatar} alt="프로필" />
			<DropDownMenu menuItems={menuItems}>
				<Styled.DownArrow src={down} />
			</DropDownMenu>
		</Styled.UserProfile>
	);
}

export default UserProfile;
