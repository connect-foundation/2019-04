import React from 'react';

import Browser from '.';

export default {
	title: 'Browser'
};

function BrowserDefault() {
	return <Browser url={'http://localhost:3000/'} />;
}

export { BrowserDefault };
