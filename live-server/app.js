const io = require('socket.io')();
const port = 3040;

const rooms = {};

io.on('connection', socket => {
    const isNotHost = (host, username) => host.username !== username;
    const isFirstVisit = (participants, username) => indexOfUser(participants, username) === -1;
    const indexOfUser = (participants, username) =>
        participants.findIndex(participant => participant.username === username);

    const HandleCreateRoom = ({ projectId, user, project }) => {
        socket.user = user;
        socket.room = projectId;
        socket.join(projectId);

        if (rooms[projectId]) { // 방에 참여하는 경우
            const room = rooms[socket.room];
            const { host, participants } = room;
            const { user: { username }} = socket;

            // 호스트 혹은 이미 접속한 사람이 재접속했을 때 참가자에 추가되는 것을 방지
            if (isNotHost(host, username) && isFirstVisit(participants, username))
                participants.push(socket.user);

            // 본인에게 알리기
            io.to(socket.id).emit('alreadyExistRoom', { host, project });
        } else { // 방을 생성하는 경우
            rooms[projectId] = {};
            rooms[projectId]['host'] = user;
            rooms[projectId]['project'] = project;
            rooms[projectId]['participants'] = [];

            // 본인에게 알리기
            io.to(socket.id).emit('successCreatedRoom', { project });
        }

        const room = rooms[socket.room];
        const { participants } = room;

        // 해당 방에 있는 사람들에게 알리기
        io.in(socket.room).emit('joinUser', { participants });
    };

    const handleDisconnect = () => {
        const room = rooms[socket.room];
        if (!room) return;
        const { host, participants } = room;
        const { user: { username }} = socket;
        socket.leave(socket.room);

        if (host.username === username) { // 호스트가 연결이 끊긴 경우
            rooms[socket.room] = null;
            io.sockets.in(socket.room).emit('close');
        } else { // 게스트가 연결이 끊긴 경우
            participants.splice(indexOfUser(participants, username), 1);
            io.in(socket.room).emit('leaveUser', { participants });
        }
    };

    socket.emit('connected');
    socket.on('createRoom', HandleCreateRoom);
    socket.on('disconnect', handleDisconnect);
});

io.listen(port);