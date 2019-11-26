import { API_LOADING, API_SUCCESS, API_FAIL } from 'actions/types';

const loading = () => ({
	data: undefined,
	loading: true,
	error: false
});

const success = (state, payload) => ({
	...state,
	data: payload,
	loading: false
});

const fail = state => ({
	...state,
	loading: false,
	error: true
});

function APIReducer(state, { type, payload }) {
	const reducers = {
		[API_LOADING]: loading,
		[API_SUCCESS]: success,
		[API_FAIL]: fail
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default APIReducer;
