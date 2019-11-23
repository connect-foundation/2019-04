import React, { useEffect } from 'react';
import Header from 'containers/Header';
import Main from 'containers/Main';
import AboutCocode from 'containers/AboutCocode';
import AboutUs from 'containers/AboutUs';

import addWheelEvent from 'utils/addWheelEvent';

function Home() {
	useEffect(addWheelEvent, []);

	return (
		<>
			<Header />
			<Main />
			<AboutCocode />
			<AboutUs />
		</>
	);
}

export default Home;
