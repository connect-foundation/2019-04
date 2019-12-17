const NOT_SUPPORT_WARNING =
	'이 브라우저에서는 지원하지 않습니다. 크롬으로 접속해주세요!';
const IDB_PERMISSION_WARNING = 'DB 생성 권한이 없습니다.';
const HANDLE_INDEXEDDB_ERROR = 'Fail: handle indexdb';

const handleAccessToIDB = ({
	idbConnection,
	method,
	args,
	strategy = 'readonly'
}) => (resolve, reject) => {
	if (!idbConnection) reject(true);

	const idbName = idbConnection.name;
	const transaction = idbConnection.transaction([idbName], strategy);

	transaction.oncomplete = () => resolve(true);
	transaction.onerror = () => reject(HANDLE_INDEXEDDB_ERROR);

	const objectStore = transaction.objectStore(idbName);
	const request = objectStore[method](...args);

	request.onsuccess = ({ target }) => resolve(target.result);
	request.onerror = () => reject(true);
};

function checkSupportBrowser() {
	if (window.indexedDB) return true;

	window.alert(NOT_SUPPORT_WARNING);
	return false;
}

function connectToIDB({ idbName, version = 1 }) {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open(idbName, version);

		request.onupgradeneeded = ({ target }) => {
			const db = target.result;
			db.createObjectStore(idbName);
		};

		request.onsuccess = () => resolve(request);
		request.onerror = () => reject(IDB_PERMISSION_WARNING);
	});
}

function getData({ idbConnection, key }) {
	return new Promise(
		handleAccessToIDB({
			idbConnection,
			method: 'get',
			args: [key]
		})
	);
}

function updateData({ idbConnection, key, value }) {
	return new Promise(
		handleAccessToIDB({
			idbConnection,
			method: 'put',
			args: [value, key],
			strategy: 'readwrite'
		})
	);
}

function removeData({ idbConnection, key }) {
	return new Promise(
		handleAccessToIDB({
			idbConnection,
			method: 'delete',
			args: [key],
			strategy: 'readwrite'
		})
	);
}

function getDataFilterByKeys({ idbConnection, filterKeys }) {
	return new Promise((resolve, reject) => {
		const idbName = idbConnection.name;
		const transaction = idbConnection.transaction([idbName]);

		transaction.oncomplete = () => resolve(true);
		transaction.onerror = () => reject(HANDLE_INDEXEDDB_ERROR);

		const objectStore = transaction.objectStore(idbName);
		const cursorRequest = objectStore.openCursor();

		const result = {};
		let cloneFilterKeys = { ...filterKeys };

		cursorRequest.onsuccess = ({ target }) => {
			const cursor = target.result;

			const leftKeys = Object.keys(cloneFilterKeys);
			if (!cursor || !leftKeys.length) {
				resolve({ installed: result, needToInstall: leftKeys });
				return;
			}

			const { key, value } = cursor;
			const isExist = cloneFilterKeys[key];
			if (isExist) {
				delete cloneFilterKeys[key];
				result[key] = value;
			}
			cursor.continue();
		};
		cursorRequest.onerror = () => reject(true);
	});
}

export default {
	checkSupportBrowser,
	connectToIDB,
	getData,
	updateData,
	removeData,
	getDataFilterByKeys
};
