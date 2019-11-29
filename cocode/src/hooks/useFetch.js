import { useState, useEffect, useReducer } from 'react';
import APIReducer from 'reducers/APIReducer';
import axios from 'axios';
import { DEFAULT_REQUEST_OPTION } from 'config';
import APIReducer from 'reducers/APIReducer';
import {
	fetchLoadActionCreator,
	fetchSuccessActionCreator,
	fetchFailActionCreator
} from 'actions/API';
<<<<<<< HEAD
=======


const API = axios.create(DEFAULT_REQUEST_OPTION);
>>>>>>> 113826c1... fix: request 변경시 디폴트 옵션이 적용되지 않아 수정

function useFetch({ method, url, data = {} }) {
	const [request, setRequest] = useState({ method, url, data });
	const [state, dispatchFetchState] = useReducer(APIReducer, {
		data: false,
		loading: false,
		err: false
	});

	const requestToServer = () => {
		dispatchFetchState(fetchLoadActionCreator);
		API(request)
		.then(res => dispatchFetchState(fetchSuccessActionCreator(res)))
		.catch(error => dispatchFetchState(fetchFailActionCreator(error)));
	};

	useEffect(() => {
		if (request.url) requestToServer();
	}, [request]);

	return [state, setRequest];
}

export default useFetch;
