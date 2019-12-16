import ReactDOM from 'react-dom';
import React from 'react';
import ToastContainer from './ToastContainer';

function addToast(message, options) {
	const toastElement = document.getElementById('toast-root');

	const newToast = {
		id: Math.random(),
		type: options.type || 'info',
		message,
		...options
	};

	ReactDOM.render(<ToastContainer toast={newToast} />, toastElement);
}

const types = ['info', 'error'];
types.forEach(
	type =>
		(addToast[type] = (message, options) => {
			addToast(message, { ...options, type });
		})
);

export default addToast;
