import React, { useEffect, useState } from 'react';
import ProjectCardList from 'containers/DashBoard/ProjectCardList';
import Header from 'containers/Common/Header';
import useFetch from 'hooks/useFetch';
import { getCoconutsAPICreator } from 'apis/DashBoard';
import { DashBoardContext } from 'contexts';

function DashBoard() {
	//임시 Mock 데이터입니다. userContext가 구현되면 바꿀 예정입니다.
	const { username } = { username: 'lallaheeee' };

	//TODO coconutsReducer 만들기
	const [coconuts, setCoconuts] = useState([]);
	const [isFetched, setIsFetched] = useState(false);
	const [{ data, loading, error }] = useFetch(
		getCoconutsAPICreator(username)
	);

	useEffect(() => {
		if (!isFetched && data) {
			setCoconuts(data);
			setIsFetched(true);
		}
	}, [data]);

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
