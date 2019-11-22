import React from 'react';
import Header from 'containers/Header';
import Main from 'containers/Main';
import AboutCocode from 'containers/AboutCocode';
import AboutUs from 'containers/AboutUs';

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
