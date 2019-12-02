import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './style';

const VERSION_HISTORIES = [
	{
		title: 'Version 1',
		link: '/history/version1',
		descriptions: ['하나의 React File을 build 할 수 있습니다']
	}
];

function HistoryItem({ title, link, descriptions }) {
	return (
		<Styled.Version>
			<Styled.VersionTitle>
				<Link to={link}>{title}</Link>
			</Styled.VersionTitle>
			<Styled.VersionDesctiption>
				{descriptions.map((description, index) => (
					<li key={index}>{description}</li>
				))}
			</Styled.VersionDesctiption>
		</Styled.Version>
	);
}

function CocodeHistory() {
	return (
		<Styled.CocodeHistory>
			{VERSION_HISTORIES.map((history, index) => {
				return <HistoryItem key={index} {...history} />;
			})}
		</Styled.CocodeHistory>
	);
}

export default CocodeHistory;
