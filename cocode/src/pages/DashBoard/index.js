import React, { useContext, useEffect, useState } from 'react';
import ProjectCardList from 'containers/DashBoard/ProjectCardList';
import Header from 'containers/Common/Header';
import useFetch from 'hooks/useFetch';
import { getCoconutsAPICreator } from 'apis/DashBoard';
import { DashBoardContext, UserContext } from 'contexts';

function DashBoard() {
	const { user } = useContext(UserContext);

	//TODO coconutsReducer 만들기
	const [coconuts, setCoconuts] = useState([]);
	const [isFetched, setIsFetched] = useState(false);
	const [{ data, loading, error }, setRequest] = useFetch({});

	useEffect(() => {
		if (user) {
			setRequest(getCoconutsAPICreator(user.username));
		}
	}, [user]);

	useEffect(() => {
		if (!isFetched && data) {
			setCoconuts(data);
			setIsFetched(true);
		}
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
