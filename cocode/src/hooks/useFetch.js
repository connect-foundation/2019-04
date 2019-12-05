import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { DEFAULT_REQUEST_OPTION } from 'config';
import APIReducer from 'reducers/APIReducer';
import {
	fetchReadyActionCreator,
	fetchLoadActionCreator,
	fetchSuccessActionCreator,
	fetchFailActionCreator
} from 'actions/API';

const API = axios.create(DEFAULT_REQUEST_OPTION);

function useFetch({ method, url, data = {} }) {
	const [request, setRequest] = useState({ method, url, data });
	const [state, dispatchFetchState] = useReducer(APIReducer, {
		data: false,
		loading: false,
		error: false,
		status: false
	});

	const requestToServer = () => {
		dispatchFetchState(fetchLoadActionCreator);
		API(request)
			.then(res => dispatchFetchState(fetchSuccessActionCreator(res)))
			.catch(error => dispatchFetchState(fetchFailActionCreator(error)));
	};

	useEffect(() => {
		if (!request.url) return;

		requestToServer();
		return () => dispatchFetchState(fetchReadyActionCreator());
	}, [request]);

	return [state, setRequest];
}

export default useFetch;
