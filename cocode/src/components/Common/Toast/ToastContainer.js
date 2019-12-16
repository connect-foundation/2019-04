import React, { useEffect, useState } from 'react';
import * as Styled from './style';
import ToastItem from './ToastItem';

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

export default ToastContainer;
