import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import io from 'socket.io-client';
import { Operation, merge } from './ot';

// 임시 주소
const target = `http://127.0.0.1:3030`;
const live = {};
const url = 'basiltoast';

function App() {
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');

    // 자신의 요청이 되돌아오기 전까지 이벤트를 막는다.
    const [isPending, setIsPending] = useState(false);

    // code변경 시 사용자의 키 입력이 아닌 다른경우 이벤트를 막기 위한 flag
    const [isBusy, setIsBusy] = useState(false);

    const monacoRef = useRef();

    // 소켓 연결을 한 뒤, 이벤트를 정의할 때 현재 변경된 코드를 받아오기 위한 레퍼런스
    const codeRef = useRef('');

    const handleInit = useCallback(() => {
        // 소켓 연결
        live.socket = io(target);
        const { socket } = live;
        socket.on('connection', id => {
            live.id = id;
            socket.emit('join', url, code);
        });

        // 연결 후 프로젝트 정보 초기화
        socket.on('initialize', initailData => {
            setIsBusy(true);
            setCode(initailData);
        });

        // 다른 클라이언트에서 에디터 내용을 변경
        socket.on('change', (id, op) => {
            if (id === socket.id) {
                return setTimeout(setIsPending(false), 0);
            }

            setIsBusy(true);
            setCode(merge(op, codeRef.current));
        });
    }, []);

    const handleDidMount = useCallback((_, editor) => {
        monacoRef.current = editor;
    }, []);

    const handleOnChange = useCallback((_, value) => {
        setValue(value);
    });

    useEffect(() => {
        if (code === value) return;
        if (isPending || isBusy) return;
        if (!live.socket) return;
        live.socket.emit('change', new Operation(code, value));
        setIsBusy(true);
        setCode(value);
        setIsPending(true);
    }, [code, value, isPending, isBusy]);

    useEffect(() => {
        if (code !== value) setIsBusy(false);
    }, [code, value]);

    useEffect(() => {
        codeRef.current = code;
    }, [code]);

    useEffect(handleInit, []);

    return (
        <>
            <ControlledEditor
                height="100vh"
                width="100vw"
                theme="vs-dark"
                language="javascript"
                value={code}
                editorDidMount={handleDidMount}
                onChange={handleOnChange}
            />
        </>
    );
}

export default App;
