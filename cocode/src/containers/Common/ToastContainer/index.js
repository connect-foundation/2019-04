import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as Styled from './style';
import ToastItem from 'components/Common/ToastItem';

function ToastContainer({ toast }) {
	const [toasts, setToasts] = useState([]);

	useEffect(() => {
		if (toast) setToasts([...toasts, toast]);
	}, [toast]);

	const close = id => {
		const newToasts = toasts.filter(toast => toast.id !== id);
		setToasts(newToasts);
	};

	return (
		<Styled.ToastsWrapper>
			{toasts.map(({ id, ...props }) => (
				<ToastItem key={id} {...props} id={id} close={close} />
			))}
		</Styled.ToastsWrapper>
	);
}

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
