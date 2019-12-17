import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Coconut from 'components/Coconut';

function App() {
	return (
		<Router>
			<Route exact path="/coconut/:projectId" component={Coconut} />
		</Router>
	);
}

export default App;
