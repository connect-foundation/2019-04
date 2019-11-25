import React from 'react';
import CreateButton from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Dashboard'
};

function createButton() {
	return <CreateButton onClick={action('onClick')} />;
}

export { createButton };
