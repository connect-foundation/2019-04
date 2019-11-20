import React from 'react';

import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Button } from '.';

export default {
	title: 'Button'
};

export const basicButton = () => {
	return <Button onClick={action('onClick')}>{text('Value', 'Text')}</Button>;
};

export const hrefButton = () => {
	return (
		<Button href={text('href', 'https://www.naver.com')}>
			{text('Value', 'Text')}
		</Button>
	);
};

export const redButton = () => {
	return <Button red={boolean('red', true)}>{text('Value', 'Text')}</Button>;
};
