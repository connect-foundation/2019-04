import React from 'react';
import * as Styled from './style';
import { Link } from 'react-router-dom';

import ReactLogo from 'components/Home/ReactLogo';
import ScrollDownButton from 'components/Home/ScrollDownButton';

function Title() {
	return (
		<>
			<Styled.Title>
				<font className="Title-emphasis">co</font>
				code
			</Styled.Title>
			<Styled.SubTitle>
				The online code editor for
				<font className="SubTitle-emphasis"> React</font>
			</Styled.SubTitle>
		</>
	);
}

function OpenButton() {
	return <Styled.Button>OPEN REACT</Styled.Button>;
}

function Description() {
	return (
		<Styled.Description>
			<Title />
			<Link to="/project">
				<OpenButton />
			</Link>
		</Styled.Description>
	);
}

function Main() {
	return (
		<Styled.Main>
			<Styled.Content>
				<Description />
				<ReactLogo className="Logo-floatRight Logo-alignCenter" />
			</Styled.Content>
			<ScrollDownButton />
		</Styled.Main>
	);
}

export default Main;
