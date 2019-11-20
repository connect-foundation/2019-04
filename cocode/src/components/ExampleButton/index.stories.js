import React from 'react';

import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Button } from '.';

export default {
	title: 'Button'
};

function basicButton() {
	return <Button onClick={action('onClick')}>{text('Value', 'Text')}</Button>;
}

function hrefButton() {
	return (
		<Button href={text('href', 'https://www.naver.com')}>
			{text('Value', 'Text')}
		</Button>
	);
}

function redButton() {
	return <Button red={boolean('red', true)}>{text('Value', 'Text')}</Button>;
}

export { basicButton, hrefButton, redButton };
