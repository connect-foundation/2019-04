import React from 'react';
import ProjectCardList from 'containers/DashBoard/ProjectCardList';
import Header from 'containers/Common/Header';

function DashBoard() {
	return (
		<>
			<Header />
			<ProjectCardList coconuts={coconut} />
		</>
	);
}

export default DashBoard;
