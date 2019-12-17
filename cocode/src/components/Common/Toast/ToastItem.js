import React, { useEffect, useState } from 'react';
import * as Styled from './style';

const DEFAULT_APPEAR_TIME = 5000;
const DEFAULT_DISAPPEAR_ANIMATION_TIME = 500;

function ToastItem({ id, close, type, message, time }) {
	const [toastState, setToastState] = useState({
		isAppear: true,
		isWillDisappear: false,
		isDidDisappear: false
	});

	const error = type === 'error';
	const { isAppear, isWillDisappear, isDidDisappear } = toastState;

	const handleStartTimerForDisplay = () => {
		setTimeout(() => {
			setToastState({
				...toastState,
				isWillDisappear: true
			});
		}, time || DEFAULT_APPEAR_TIME);
	};

	const handleDelayTimeForAnimation = () => {
		if (!isWillDisappear) return;

		setTimeout(() => {
			setToastState({
				...toastState,
				isDidDisappear: true
			});
		}, DEFAULT_DISAPPEAR_ANIMATION_TIME);
	};

	const handleExceptMeFromParent = () => {
		if (!isDidDisappear) return;
		close(id);
		setToastState({
			...toastState,
			isAppear: false
		});
	};

	useEffect(handleStartTimerForDisplay, []);
	useEffect(handleDelayTimeForAnimation, [isWillDisappear]);
	useEffect(handleExceptMeFromParent, [isDidDisappear]);

	return (
		<>
			{isAppear && (
				<Styled.ToastItem
					error={error}
					isWillDisappear={isWillDisappear}
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
