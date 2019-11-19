import React from 'react';
import * as Styled from './style';
import Logo from 'components/Logo';
import { Grid } from '@material-ui/core';

function Header() {
	return (
		<Styled.Header>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
			>
				<Grid item xs={1}>
					<Logo />
				</Grid>
				<Grid item xs={1} className="Header-text-right">
					<Styled.SignInButton>Sign In</Styled.SignInButton>
				</Grid>
			</Grid>
		</Styled.Header>
	);
}

export default Header;
