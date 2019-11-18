import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Home, DashBoard, Project } from './pages';

function App() {
	return (
		<Router>
			<GlobalStyle />
			<Link to="/">홈</Link>
			<Link to="/dashboard">대시보드</Link>
			<Link to="/project">project</Link>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/dashboard" component={DashBoard} />
				<Route path="/project" component={Project} />
			</Switch>
		</Router>
	);
}

export default App;
