import React, { useEffect, useState } from 'react';
import * as Styled from './style';

function ToastItem({ id, close, type, message, time }) {
	const [toastState, setToastState] = useState({
		isAppear: true,
		isWillDisappear: false,
		isDidDisappear: false
	});

	const error = type === 'error';

	useEffect(() => {
		setTimeout(() => {
			setToastState({
				...toastState,
				isWillDisappear: true
			});
		}, time || 3000);
	}, []);

	useEffect(() => {
		if (toastState.isWillDisappear)
			setTimeout(() => {
				setToastState({
					...toastState,
					isDidDisappear: true
				});
			}, 500);
	}, [toastState.isWillDisappear]);

	useEffect(() => {
		if (!toastState.isDidDisappear) return;
		close(id);
		setToastState({
			...toastState,
			isAppear: false
		});
	}, [toastState.isDidDisappear]);

	return (
		<>
			{toastState.isAppear && (
				<Styled.ToastItem
					error={error}
					isWillDisappear={toastState.isWillDisappear}
				>
					{error ? <Styled.Close /> : <Styled.InfoIcon />}
					<Styled.MessageContainer>
						<Styled.Text> {message} </Styled.Text>
					</Styled.MessageContainer>
				</Styled.ToastItem>
			)}
		</>
	);
}

export default ToastItem;
