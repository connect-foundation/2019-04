import React, {
	useReducer,
	useEffect,
	useState,
	useContext,
	useCallback
} from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';
import io from 'socket.io-client';

import Header from 'containers/Common/Header';
import TabBar from 'containers/Live/TabBar';
import TabContainer from 'containers/Live/TabContainer';
import Editor from 'containers/Live/Editor';
import LoadingSpinner from 'containers/Common/LoadingSpinner';
import BrowserV2 from 'components/Project/BrowserV2';
import { SplitPaneContainer } from 'components/Common/SplitPane';

import { LiveContext, ProjectContext, UserContext } from 'contexts';
import ProjectReducer from 'reducers/ProjectReducer';
import { fetchProjectActionCreator } from 'actions/Project';
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
import { LOADING_LIVE } from 'constants/notificationMessage';

const DEFAULT_CLICKED_TAB_INDEX = 0;
let socket;

function Live() {
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
			<Header />
			{isFetched && (
				<Styled.Main>
					<TabBar theme={TAB_BAR_THEME} />
					<SplitPaneContainer split="vertical" defaultSize="20vw">
						<TabContainer />
						<SplitPaneContainer split="vertical" defaultSize="40vw">
							<Editor />
							<BrowserV2 />
						</SplitPaneContainer>
					</SplitPaneContainer>
				</Styled.Main>
			)}
		</ProjectContext.Provider>
	);
}

export default Live;
