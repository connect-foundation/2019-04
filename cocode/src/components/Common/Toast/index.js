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

const setAddToastFunctionAtToastTypeProperty = type =>
	(addToast[type] = (message, options) =>
		addToast(message, { ...options, type }));

const TOAST_TYPES = ['info', 'error'];
TOAST_TYPES.forEach(setAddToastFunctionAtToastTypeProperty);

export default addToast;
