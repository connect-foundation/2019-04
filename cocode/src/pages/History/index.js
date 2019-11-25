import React from 'react';
import { Route } from 'react-router-dom';

import { Version1 } from 'pages';
import Header from 'containers/Common/Header';
import CocodeHistory from 'containers/History/CocodeHistory';

function HistoryHome() {
	return <CocodeHistory />;
}

function History({ match }) {
	return (
		<>
			<Header />
			<Route exact path={match.url} render={HistoryHome} />
			<Route path={`${match.url}/version1`} component={Version1} />
		</>
	);
}

export default History;
