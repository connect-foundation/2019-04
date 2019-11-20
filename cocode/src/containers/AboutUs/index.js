import React from 'react';
import { Grid } from '@material-ui/core';
import * as Styled from './style';

import profiles from './profiles';

function AboutUsProfileCard({ name, nickName, src }) {
	return (
		<Styled.AboutUsProfileCard>
			<Styled.AboutUsProfileImage src={src} />
			<Styled.AboutUsProfileName>{name}</Styled.AboutUsProfileName>
			<Styled.AboutUsProfileLink href={'https://github.com/' + nickName}>
				@{nickName}
			</Styled.AboutUsProfileLink>
		</Styled.AboutUsProfileCard>
	);
}

function AboutUs() {
	return (
		<Styled.AboutUs>
			<Grid container direction="column">
				<Grid item>
					<Styled.AboutUsTitle>
						Who's making{' '}
						<font className="AboutUsTitle-main">cocode</font>?
					</Styled.AboutUsTitle>
				</Grid>
				<Grid item container direction="row" justify="space-around">
					{profiles.map((profile, index) => (
						<Grid
							key={index}
							item
							container
							sm={3}
							direction="column"
							justify="space-between"
							alignContent="center"
						>
							<AboutUsProfileCard {...profile} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Styled.AboutUs>
	);
}

export default AboutUs;
