import React, { useContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCardList from 'containers/DashBoard/ProjectCardList';
import Header from 'containers/Common/Header';
import LoadingSpinner from 'containers/Common/LoadingSpinner';

import { UserContext, DashBoardContext } from 'contexts';
import DashBoardReducer from 'reducers/DashboardReducer';
import useFetch from 'hooks/useFetch';
import { getCoconutsAPICreator } from 'apis/DashBoard';
import { fetchCoconutActionCreator } from 'actions/Dashboard';
import { LOADING_DASHBOARD } from 'constants/notificationMessage';

function DashBoard() {
	const { user } = useContext(UserContext);
	const history = useHistory();
	const [coconuts, dispatchDashboard] = useReducer(DashBoardReducer, []);
	const [{ data, error }, setRequest] = useFetch({});

	const handleRequestGetCoconutAPI = () => {
		user && setRequest(getCoconutsAPICreator(user.username));
	};
	const handleSetDashBoardState = () => {
		data && dispatchDashboard(fetchCoconutActionCreator(data));
	};

	useEffect(handleRequestGetCoconutAPI, [user]);
	useEffect(handleSetDashBoardState, [data]);

	const loading = true;

	if (loading) return <LoadingSpinner message={LOADING_DASHBOARD} />;
	if (error) history.push('/weAreSorry');

	return (
		<DashBoardContext.Provider value={{ coconuts, dispatchDashboard }}>
			<Header />
			<ProjectCardList />
		</DashBoardContext.Provider>
	);
}

export default DashBoard;
