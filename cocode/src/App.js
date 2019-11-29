import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { DEFAULT_THEME } from 'constants/theme';

import GlobalStyle from 'components/Common/GlobalStyle';
import { Home, DashBoard, Project, History } from 'pages';

import UserContext from 'contexts/UserContext';
import useFetch from 'hooks/useFetch';
import { getUserAPICreator } from 'apis/User';

function App() {
	const [user, setUser] = useState(null);
	const [{ data }] = useFetch(getUserAPICreator());

	useEffect(() => {
		setUser(data);
	}, [data]);

	return (
		<UserContext.Provider value={{ user }}>
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
		</UserContext.Provider>
	);
}

export default App;
