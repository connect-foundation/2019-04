import React, { useContext } from 'react';
import * as Styled from './style';
import { UserContext } from 'contexts';

function LiveUserProfile({ username, avatar }) {
	const { user } = useContext(UserContext);

	return (
		<Styled.UserProfile>
			<Styled.UserAvatar src={avatar} alt="프로필" />
			<Styled.UserName>{username}</Styled.UserName>
			{user.username === username && (
				<Styled.SelfLabel>(you)</Styled.SelfLabel>
			)}
		</Styled.UserProfile>
	);
}

function LiveUsers({ owner, participants }) {
	if (!participants.length) participants = [];

	return (
		<Styled.Container>
			<Styled.Title>OWNERS</Styled.Title>
			<LiveUserProfile username={owner.username} avatar={owner.avatar} />
			<Styled.Title>USERS</Styled.Title>
			{participants.map(({ username, avatar }, index) => {
				return (
					<LiveUserProfile
						key={`liveParticipants-${index}`}
						username={username}
						avatar={avatar}
					/>
				);
			})}
		</Styled.Container>
	);
}

export default LiveUsers;
