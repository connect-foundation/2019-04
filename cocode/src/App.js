import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'components/Common/GlobalStyle';
import { Home, DashBoard, Project, History } from 'pages';

import { DEFAULT_THEME } from 'constants/theme';

function App() {
	return (
		<Router>
			<ThemeProvider theme={DEFAULT_THEME}>
				<GlobalStyle />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/dashboard" component={DashBoard} />
					<Route path="/project" component={Project} />
					<Route path="/history" component={History} />
				</Switch>
			</ThemeProvider>
		</Router>
	);
}

export default App;
