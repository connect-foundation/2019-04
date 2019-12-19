import React, { useEffect } from 'react';
import Header from 'containers/Common/Header';

function Empty() {
	useEffect(() => {
		const redirectURL = localStorage.getItem('redirectURL');
		if (redirectURL) {
			window.location.href = redirectURL;
			localStorage.removeItem('redirectURL');
		}
	}, []);

	return (
		<Header />
	);
}

export default Empty;