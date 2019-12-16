import { useState, useEffect, useCallback } from 'react';

import { checkSupportBrowser, connectToIDB } from 'indexedDB';

const initialState = {
	success: false,
	loading: true,
	error: false,
	projectIDB: undefined,
	dependencyIDB: undefined
};

const connectionFailState = {
	...initialState,
	error: true,
	loading: false
};

const connectionSuccessState = (projectIDB, dependencyIDB) => ({
	...initialState,
	projectIDB,
	dependencyIDB,
	success: true,
	loading: false
});

function useConnectToIDB({ projectIDBName, dependencyIDBName }) {
	const [connectionState, setConnectionState] = useState(initialState);

	const closeConnections = useCallback(() => {
		const { projectIDB, dependencyIDB } = connectionState;
		projectIDB && projectIDB.close();
		dependencyIDB && dependencyIDB.close();
	}, [connectionState]);

	const handleConnectToIDB = () => {
		if (!checkSupportBrowser()) {
			setConnectionState(connectionFailState);
			return;
		}

		const projectIDBRequest = connectToIDB({ idbName: projectIDBName });
		const dependencyIDBRequest = connectToIDB({
			idbName: dependencyIDBName
		});

		const handleSuccessToConnect = requests => {
			const connections = requests.map(({ result }) => result);
			setConnectionState(connectionSuccessState(...connections));
		};

		const handleFailToConnect = () => {
			setConnectionState(connectionFailState);
		};

		Promise.all([projectIDBRequest, dependencyIDBRequest])
			.then(handleSuccessToConnect)
			.catch(handleFailToConnect);
	};
	useEffect(handleConnectToIDB, []);

	return [connectionState, closeConnections];
}

export default useConnectToIDB;
