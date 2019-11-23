import React from 'react';
import * as Styled from './style';

import ScrollTopButton from 'components/ScrollTopButton';

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
			<ScrollTopButton />
		</Styled.AboutCocode>
	);
}

export default AboutCocode;
