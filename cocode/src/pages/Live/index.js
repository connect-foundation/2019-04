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
import BrowserV2 from 'components/Project/BrowserV2';
import { SplitPaneContainer } from 'components/Common/SplitPane';

import { LiveContext, ProjectContext, UserContext } from 'contexts';
import ProjectReducer from 'reducers/ProjectReducer';
import { fetchProjectActionCreator } from 'actions/Project';
import {
	liveOnActionCreator,
} from 'actions/Live';

import { TAB_BAR_THEME } from 'constants/theme';
import { COCODE_SERVER } from 'config';
import useFetch from 'hooks/useFetch';
import { getProjectInfoAPICreator } from 'apis/Project';

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

	const handleConnectSocket = useCallback(() => {
		if (!Object.keys(project).length || isConnected || !user) return;
		setIsConnected(true);
		socket = io(liveServer);
		socket.on('connected', handleConnected);
		socket.on('alreadyExistRoom', handleAlreadyExistRoom);
		socket.on('successCreatedRoom', handleSuccessCreatedRoom);
	}, [project]);

	useEffect(handleFetchProject, []);
	useEffect(handleConnectSocket, [project]);
	useEffect(handleSetProject, [data, isFetched]);

	// //TODO loading 컴포넌트 만들기
	if (loading) return <p>Loading...</p>;
	if (error) return <p>다시 시도해주세요.</p>;

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