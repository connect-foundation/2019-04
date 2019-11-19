import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Home, DashBoard, Project } from './pages';

import { DEFAULT_THEME } from './constants/theme';

function App() {
	return (
		<Router>
			<ThemeProvider theme={DEFAULT_THEME}>
				<GlobalStyle />
				<Link to="/">홈</Link>
				<Link to="/dashboard">대시보드</Link>
				<Link to="/project">project</Link>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/dashboard" component={DashBoard} />
					<Route path="/project" component={Project} />
				</Switch>
			</ThemeProvider>
		</Router>
	);
}

export default App;
