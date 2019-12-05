import { API_READY, API_LOADING, API_SUCCESS, API_FAIL } from 'actions/types';

const ready = () => ({
	data: false,
	loading: false,
	error: false,
	status: false
});

const loading = () => ({
	data: undefined,
	loading: true,
	error: false,
	status: false
});

const success = (state, { data, status }) => ({
	...state,
	data,
	status,
	loading: false
});

const fail = state => ({
	...state,
	loading: false,
	error: true
});

function APIReducer(state, { type, payload }) {
	const reducers = {
		[API_READY]: ready,
		[API_LOADING]: loading,
		[API_SUCCESS]: success,
		[API_FAIL]: fail
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default APIReducer;
