import React, {
	useReducer,
	useEffect,
	useState,
	useContext,
	useCallback
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Styled from './style';
import io from 'socket.io-client';

import Header from 'containers/Common/Header';
import TabBar from 'containers/Live/TabBar';
import TabContainer from 'containers/Live/TabContainer';
import Editor from 'containers/Live/Editor';
import LoadingSpinner from 'containers/Common/LoadingSpinner';
import BrowserV2 from 'components/Project/BrowserV2';
import { SplitPaneContainer } from 'components/Common/SplitPane';
import addToast from 'components/Common/Toast';

import { LiveContext, ProjectContext, UserContext } from 'contexts';
import { ProjectReducer } from 'reducers';
import {
	fetchProjectActionCreator,
	updateFilesActionCreator
} from 'actions/Project';
import {
	liveOnActionCreator,
	liveOffActionCreator,
	liveJoinUserActionCreator,
	liveLeaveUserActionCreator
} from 'actions/Live';

import { TAB_BAR_THEME } from 'constants/theme';
import { COCODE_SERVER } from 'config';
import useFetch from 'hooks/useFetch';
import { getProjectInfoAPICreator } from 'apis/Project';
import {
	SHUT_DOWN_LIVE_SHARE,
	LOADING_LIVE
} from 'constants/notificationMessage';
import { getCookie } from 'utils/controlCookie';

const DEFAULT_CLICKED_TAB_INDEX = 0;
let socket;

function Live() {
	const history = useHistory();
	const { projectId } = useParams();
	const { user } = useContext(UserContext);
	const { liveServer, dispatchLive } = useContext(LiveContext);
	const [{ data, loading, error }, setRequest] = useFetch({});
	const [isFetched, setIsFetched] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [clickedTabIndex, setClickedTabIndex] = useState(
		DEFAULT_CLICKED_TAB_INDEX
	);
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	if (!getCookie('jwt')) {
		localStorage.setItem('redirectURL', window.location.href);
		history.replace('../signin');
	}

	const handleFetchProject = () => {
		const getProjectInfoAPI = getProjectInfoAPICreator(projectId);
		setRequest(getProjectInfoAPI);
	};

	const handleSetProjectState = project => {
		const fetchProjectAction = fetchProjectActionCreator({ project });
		dispatchProject(fetchProjectAction);
		setIsFetched(true);
	};

	const handleSetProject = () => {
		if (!data) return;
		if (!isFetched) handleSetProjectState(data);
	};

	const handleConnected = () => {
		socket.emit('createRoom', { user, projectId, project });
	};

	const handleAlreadyExistRoom = ({ host, project, participants }) => {
		const { files } = project;
		const filesCopy = JSON.parse(JSON.stringify(files));
		const updateFilesAction = updateFilesActionCreator({
			files: filesCopy
		});
		dispatchProject(updateFilesAction);
		dispatchLive(
			liveOnActionCreator({
				socket,
				url: `${COCODE_SERVER}/live/${projectId}`,
				owner: host,
				project,
				participants
			})
		);
	};

	const handleSuccessCreatedRoom = ({ project, participants }) => {
		dispatchLive(
			liveOnActionCreator({
				socket,
				url: `${COCODE_SERVER}/live/${projectId}`,
				owner: user,
				project,
				participants
			})
		);
	};

	const handleJoinUser = ({ participants }) => {
		dispatchLive(
			liveJoinUserActionCreator({
				participants
			})
		);
	};

	const handleLeaveUser = ({ participants }) => {
		dispatchLive(
			liveLeaveUserActionCreator({
				participants
			})
		);
	};

	const handleCloseSocket = () => {
		socket.close();
		dispatchLive(liveOffActionCreator());
		addToast.error(SHUT_DOWN_LIVE_SHARE);
	};

	const handleConnectSocket = useCallback(() => {
		if (!Object.keys(project).length || isConnected || !user) return;
		setIsConnected(true);
		socket = io(liveServer);
		socket.on('connected', handleConnected);
		socket.on('alreadyExistRoom', handleAlreadyExistRoom);
		socket.on('successCreatedRoom', handleSuccessCreatedRoom);
		socket.on('joinUser', handleJoinUser);
		socket.on('leaveUser', handleLeaveUser);
		socket.on('close', handleCloseSocket);
	}, [project]);

	useEffect(handleFetchProject, []);
	useEffect(handleConnectSocket, [project]);
	useEffect(handleSetProject, [data, isFetched]);

	if (loading) return <LoadingSpinner message={LOADING_LIVE} />;
	if (error) history.push('/weAreSorry');

	return (
		<ProjectContext.Provider
			value={{
				project,
				dispatchProject,
				clickedTabIndex,
				setClickedTabIndex
			}}
		>
			<Header name={project.name} />
			{isFetched && (
				<Styled.Main>
					<TabBar theme={TAB_BAR_THEME} />
					<SplitPaneContainer split="vertical" defaultSize="20vw">
						<TabContainer />
						<SplitPaneContainer split="vertical" defaultSize="40vw">
							<Editor isConnected={isConnected} />
							<BrowserV2 />
						</SplitPaneContainer>
					</SplitPaneContainer>
				</Styled.Main>
			)}
		</ProjectContext.Provider>
	);
}

export default Live;
