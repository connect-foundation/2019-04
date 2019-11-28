import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import {
	fetchLoadActionCreator,
	fetchSuccessActionCreator,
	fetchFailActionCreator
} from 'actions/API';
import APIReducer from 'reducers/APIReducer';
import { DEFAULT_REQUEST_OPTION } from 'config';

function useFetch({ method, url, data = {} }) {
	const [request, setRequest] = useState({
		method,
		url,
		data,
		...DEFAULT_REQUEST_OPTION
	});
	const [state, dispatchFetchState] = useReducer(APIReducer, {
		data: false,
		loading: false,
		err: false
	});

	const requestToServer = () => {
		dispatchFetchState(fetchLoadActionCreator);
		axios(request)
			.then(res => dispatchFetchState(fetchSuccessActionCreator(res)))
			.catch(error => dispatchFetchState(fetchFailActionCreator(error)));
	};

	useEffect(() => {
		requestToServer();
	}, [request]);

	return [state, setRequest];
}

export default useFetch;
