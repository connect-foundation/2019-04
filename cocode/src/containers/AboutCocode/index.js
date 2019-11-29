import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as Styled from './style';

function AboutCocode() {
	return (
		<Styled.AboutCocode>
			<Styled.DescriptionPhrase>
				<font className="DescriptionPhrase-emphasis">Cocode </font>
				is an online editor
				<br />
				that helps you create web applications based on
				<font className="DescriptionPhrase-emphasis"> React</font>
			</Styled.DescriptionPhrase>
		</Styled.AboutCocode>
	);
}

export default AboutCocode;
