import React from 'react';
import Profile from '.';
import avatar from './avatar.jpeg';

export default {
	title: 'Profile'
};
const profileData = {
	username: 'BasilToast',
	avatar: avatar,
	menuItems: [
		{
			value: 'dashboard',
			onClick: () => console.log('dashboard')
		},
		{
			value: 'sign out',
			onClick: () => console.log('sign out')
		}
	]
};

export const profile = () => <Profile {...profileData} />;
