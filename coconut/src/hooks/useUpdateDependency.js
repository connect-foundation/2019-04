import { useState, useEffect, useCallback } from 'react';

import IndexedDB from 'indexedDB';

import { useFetch } from 'hooks';

import { getModule } from 'apis/Dependency';

const initialState = {
	success: false,
	loading: true,
	error: false
};

const getDataFailState = {
	...initialState,
	error: true,
	loading: false
};

const getDataSuccessState = {
	...initialState,
	success: true,
	loading: false
};

function useUpdateDependency(idbConnection) {
	const [dependency, setDependency] = useState(undefined);
	const [dependencyState, setDependencyState] = useState(undefined);
	const [needToInstall, setNeedToInstall] = useState(undefined);
	const [response, setRequest] = useFetch({});

	const installDependency = dependency => {
		setDependencyState(undefined);
		setDependency(dependency);
	};

	const updateDependencyToIDB = useCallback(
		(key, value) => IndexedDB.updateData({ idbConnection, key, value }),
		[idbConnection]
	);

	const handleFetchDependency = useCallback(() => {
		if (!idbConnection || !dependency) return;

		const handleSuccessToGetDependency = result => {
			const { installed, needToInstall } = result;

			Object.entries(installed).forEach(([_, modules]) => {
				Object.entries(modules).forEach(([path, content]) => {
					window.fileSystem[path] = content;
				});
			});

			setNeedToInstall(needToInstall);
		};

		const handleFailToGetDependency = () => {
			setDependencyState(getDataFailState);
		};

		const filterKeys = Object.values(dependency).reduce(
			(object, { name, version }) => {
				object[JSON.stringify([name, version])] = true;
				return object;
			},
			{}
		);

		setDependency(undefined);
		IndexedDB.getDataFilterByKeys({ idbConnection, filterKeys })
			.then(handleSuccessToGetDependency)
			.catch(handleFailToGetDependency);
	}, [idbConnection, dependency]);

	const handleInstallDependency = useCallback(() => {
		if (!needToInstall) return;
		if (!needToInstall.length) {
			setNeedToInstall(undefined);
			setDependencyState(getDataSuccessState);
			return;
		}

		const [name, version] = JSON.parse(needToInstall[0]);
		const getModuleAPI = getModule(name, version);
		setRequest(getModuleAPI);
	}, [needToInstall, setRequest]);

	const handleRequestDependencyAPI = useCallback(() => {
		if (!response) return;

		const { data, loading, error } = response;
		if (loading || !data) return;
		if (error) {
			setDependencyState(getDataFailState);
			return;
		}

		const [key] = needToInstall;
		updateDependencyToIDB(key, data);

		Object.entries(data).forEach(([path, content]) => {
			window.fileSystem[path] = content;
		});
		setNeedToInstall(needToInstall.slice(1));
	}, [response, needToInstall, updateDependencyToIDB]);

	useEffect(handleFetchDependency, [idbConnection, dependency]);
	useEffect(handleInstallDependency, [needToInstall]);
	useEffect(handleRequestDependencyAPI, [response]);

	return [dependencyState, installDependency];
}

export default useUpdateDependency;
