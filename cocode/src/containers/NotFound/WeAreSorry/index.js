//https://pixabay.com/illustrations/coconut-coconut-oil-coconut-milk-2327882/
import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './style';
import coconut from './coconut.png';

function WeAreSorry() {
	return (
		<Styled.WeAreSorry>
			<Styled.CoconutImage src={coconut} alt={'coconut'} />
			<Styled.Title>
				This page isn't available. Sorry about that.
			</Styled.Title>
			<Styled.Description>
				If you want start over, go to the <Link to={'/'}>homepage</Link>
			</Styled.Description>
		</Styled.WeAreSorry>
	);
}

export default WeAreSorry;
