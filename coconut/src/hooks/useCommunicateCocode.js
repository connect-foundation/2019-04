import { useEffect, useCallback } from 'react';

import { cloneProjectActionCreator } from 'actions/Project';

function useCommunicateCocode(dispatchProject) {
	const sendToCocode = message => window.parent.postMessage(message, '*');

	const handleAddListener = () =>
		window.addEventListener('message', receiveMsgFromCocode);

	const updateProject = useCallback(
		messageFromCocode => {
			window.fileSystem = {};

			const { project } = messageFromCocode;

			const cloneProjectAction = cloneProjectActionCreator({ project });
			dispatchProject(cloneProjectAction);
		},
		[dispatchProject]
	);

	const receiveMsgFromCocode = useCallback(
		({ data }) => {
			const { command } = data;
			if (!command) return;

			const coconutActions = { updateProject };
			coconutActions[command] && coconutActions[command](data);
		},
		[updateProject]
	);

	useEffect(handleAddListener, []);

	return [sendToCocode];
}

export default useCommunicateCocode;
