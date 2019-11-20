import React from 'react';
import { text } from '@storybook/addon-knobs';

import Browser from '.';

export default {
	title: 'Browser'
};

function BrowserDefault() {
	return <Browser url={text('url', 'http://localhost:3000/')} />;
}

export { BrowserDefault };
