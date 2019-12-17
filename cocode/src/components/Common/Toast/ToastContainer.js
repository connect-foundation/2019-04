import React, { useCallback, useEffect, useState } from 'react';
import * as Styled from './style';
import ToastItem from './ToastItem';

function ToastContainer({ toast }) {
	const [toasts, setToasts] = useState([]);

	const updateToastItems = () => {
		if (toast) setToasts([...toasts, toast]);
	};
	const close = useCallback(id => {
		const newToasts = toasts.filter(toast => toast.id !== id);
		setToasts(newToasts);
	});

	useEffect(updateToastItems, [toast]);

	return (
		<Styled.ToastsWrapper>
			{toasts.map(({ id, ...props }) => (
				<ToastItem key={id} {...props} id={id} close={close} />
			))}
		</Styled.ToastsWrapper>
	);
}

export default ToastContainer;
