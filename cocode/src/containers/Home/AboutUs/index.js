import React from 'react';
import * as Styled from './style';

import profiles from './profiles';
import ScrollTopButton from 'components/Home/ScrollTopButton';

function AboutUsProfileCard({ name, nickName, src }) {
	return (
		<Styled.AboutUsProfileCard>
			<Styled.AboutUsProfileImage
				className="AboutUsProfileCard-item"
				src={src}
				alt={`profiles/${nickName}.png`}
				title={nickName}
			/>
			<Styled.AboutUsProfileName className="AboutUsProfileCard-item">
				{name}
			</Styled.AboutUsProfileName>
			<Styled.AboutUsProfileLink
				className="AboutUsProfileCard-item"
				href={`https://github.com/${nickName}`}
			>
				@{nickName}
			</Styled.AboutUsProfileLink>
		</Styled.AboutUsProfileCard>
	);
}

function AboutUs() {
	return (
		<Styled.AboutUs>
			<Styled.Content>
				<Styled.AboutUsTitle className="AboutUs-item">
					Who's making
					<font className="AboutUsTitle-main"> cocode</font>?
				</Styled.AboutUsTitle>
				<Styled.AboutUsProfiles className="AboutUs-item">
					{profiles.map((profile, index) => (
						<AboutUsProfileCard {...profile} key={index} />
					))}
				</Styled.AboutUsProfiles>
			</Styled.Content>
			<ScrollTopButton />
		</Styled.AboutUs>
	);
}

export default AboutUs;
