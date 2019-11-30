import React from 'react';
import * as Styled from './style';

import ScrollTopButton from 'components/Home/ScrollTopButton';
import ScrollDownButton from 'components/Home/ScrollDownButton';

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
			<ScrollDownButton />
		</Styled.AboutCocode>
	);
}

export default AboutCocode;
