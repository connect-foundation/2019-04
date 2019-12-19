import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { DEFAULT_THEME } from 'constants/theme';
import UserContext from 'contexts/UserContext';
import useFetch from 'hooks/useFetch';
import { getUserAPICreator } from 'apis/User';
import { LiveStore } from 'stores';

import GlobalStyle from 'components/Common/GlobalStyle';
import { Home, DashBoard, Project, History, NotFound, Live } from 'pages';

function App() {
	const [user, setUser] = useState(null);
	const [{ data }] = useFetch(getUserAPICreator());

	useEffect(() => {
		setUser(data);
	}, [data]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Router>
				<ThemeProvider theme={DEFAULT_THEME}>
					<GlobalStyle />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/dashboard" component={DashBoard} />
						<Route path="/project/:projectId" component={Project} />
						<Route path="/live/:projectId">
							<LiveStore>
								<Live />
							</LiveStore>
						</Route>
						<Route path="/history" component={History} />
						<Route component={NotFound} />
					</Switch>
				</ThemeProvider>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
