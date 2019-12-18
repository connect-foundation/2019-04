import React, { useContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import ProjectCardList from 'containers/DashBoard/ProjectCardList';
import Header from 'containers/Common/Header';
import CoconutSpinner from 'components/Common/CoconutSpinner';
import * as Styled from './style';

import { UserContext, DashBoardContext } from 'contexts';
import DashBoardReducer from 'reducers/DashboardReducer';
import useFetch from 'hooks/useFetch';
import { getCoconutsAPICreator } from 'apis/DashBoard';
import { fetchCoconutActionCreator } from 'actions/Dashboard';
import { LOADING_DASHBOARD } from 'constants/notificationMessage';

function LoadingSpinner() {
	return (
		<Styled.LoadingDisplay>
			<CoconutSpinner />
			<Styled.LoadingPhrase>{LOADING_DASHBOARD}</Styled.LoadingPhrase>
		</Styled.LoadingDisplay>
	);
}

function DashBoard() {
	const { user } = useContext(UserContext);
	const history = useHistory();
	const [coconuts, dispatchDashboard] = useReducer(DashBoardReducer, []);
	const [{ data, loading, error }, setRequest] = useFetch({});

	const handleRequestGetCoconutAPI = () => {
		user && setRequest(getCoconutsAPICreator(user.username));
	};
	const handleSetDashBoardState = () => {
		data && dispatchDashboard(fetchCoconutActionCreator(data));
	};

	useEffect(handleRequestGetCoconutAPI, [user]);
	useEffect(handleSetDashBoardState, [data]);

	if (loading) return <LoadingSpinner />;
	if (error) history.push('/weAreSorry');

	return (
		<DashBoardContext.Provider value={{ coconuts, dispatchDashboard }}>
			<Header />
			<ProjectCardList />
		</DashBoardContext.Provider>
	);
}

export default DashBoard;
