const io = require('socket.io')();
const PORT = 3040;

const rooms = {};

io.on('connection', socket => {
	const isNotHost = (host, username) => host.username !== username;
	const isFirstVisit = (participants, username) => indexOfUser(participants, username) === -1;
	const indexOfUser = (participants, username) => participants.findIndex(participant => participant.username === username);

	const handleCreateRoom = ({ projectId, user, project }) => {
		socket.user = user;
		socket.room = projectId;
		socket.join(projectId);

		if (rooms[projectId]) {
			// 방에 참여하는 경우
			const { host, participants } = rooms[socket.room];
			const {
				user: { username }
			} = socket;

			// 호스트 혹은 이미 접속한 사람이 재접속했을 때 참가자에 추가되는 것을 방지
			if (isNotHost(host, username) && isFirstVisit(participants, username)) participants.push(socket.user);

			// 본인에게 알리기
			socket.emit('alreadyExistRoom', { host, project });
		} else {
			// 방을 생성하는 경우
			rooms[projectId] = {
				host: user,
				project,
				participants: []
			};

			// 본인에게 알리기
			socket.emit('successCreatedRoom', { project });
		}

		const { participants } = rooms[socket.room];

		// 해당 방에 있는 사람들에게 알리기
		io.in(socket.room).emit('joinUser', { participants });
	};

	const handleDisconnect = () => {
		if (!rooms[socket.room]) return;
		const { host, participants } = rooms[socket.room];
		const {
			user: { username }
		} = socket;
		socket.leave(socket.room);

		if (host.username === username) {
			// 호스트가 연결이 끊긴 경우
			rooms[socket.room] = null;
			io.sockets.in(socket.room).emit('close');
		} else {
			// 게스트가 연결이 끊긴 경우
			participants.splice(indexOfUser(participants, username), 1);
			io.in(socket.room).emit('leaveUser', { participants });
		}
	};

	const handleCloseSocket = () => {
		// 호스트가 라이브를 중지한 경우
		rooms[socket.room] = null;
		io.sockets.in(socket.room).emit('close');
	};

	const handleOnChange = (filePath, operation) => {
		io.in(socket.room).emit('change', socket.id, filePath, operation);
	};

	const handleOnMoveCursor = (filePath, position) => {
		socket.broadcast.emit('moveCursor', socket.user.username, filePath, position);
	};

	socket.emit('connected');
	socket.on('createRoom', handleCreateRoom);
	socket.on('disconnect', handleDisconnect);
	socket.on('close', handleCloseSocket);
	socket.on('change', handleOnChange);
	socket.on('moveCursor', handleOnMoveCursor);
});

io.listen(PORT);
