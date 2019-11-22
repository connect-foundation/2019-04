import React from 'react';
import Header from 'containers/Common/Header';
import Main from 'containers/Home/Main';
import AboutCocode from 'containers/Home/AboutCocode';
import AboutUs from 'containers/Home/AboutUs';

function Home() {
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
