import React, { useContext, useEffect, useReducer } from 'react';
import ProjectCardList from 'containers/DashBoard/ProjectCardList';
import Header from 'containers/Common/Header';
import { UserContext, DashBoardContext } from 'contexts';
import DashBoardReducer from 'reducers/DashboardReducer';
import useFetch from 'hooks/useFetch';
import { getCoconutsAPICreator } from 'apis/DashBoard';
import { fetchCoconutActionCreator } from 'actions/Dashboard';

function DashBoard() {
	const { user } = useContext(UserContext);
	const [{ coconuts, isFetched }, dispatch] = useReducer(DashBoardReducer, {
		coconuts: [],
		isFetched: false
	});
	const [{ data, loading, error }, setRequest] = useFetch({});

	useEffect(() => {
		if (user) setRequest(getCoconutsAPICreator(user.username));
	}, [user]);

	useEffect(() => {
		if (!isFetched && data) dispatch(fetchCoconutActionCreator(data));
	}, [data]);

	//TODO loading 컴포넌트 만들기
	if (loading) return <p>Loading...</p>;
	if (error) return <p>다시 시도해주세요.</p>;

	return (
		<DashBoardContext.Provider value={{ coconuts }}>
			<Header />
			<ProjectCardList />
		</DashBoardContext.Provider>
	);
}

export default DashBoard;
