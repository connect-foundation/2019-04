const NOT_SUPPORT_WARNING =
	'이 브라우저에서는 지원하지 않습니다. 크롬으로 접속해주세요!';
const IDB_PERMISSION_WARNING = 'DB 생성 권한이 없습니다.';
const HANDLE_INDEXEDDB_ERROR = 'Fail: handle indexdb';

function checkSupportBrowser() {
	if (window.indexedDB) return true;

	window.alert(NOT_SUPPORT_WARNING);
	return false;
}

function connectToIDB({
	idbName,
	version = 1,
	successHandler,
	failHandler = error => console.log(error)
}) {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open(idbName, version);

		request.onupgradeneeded = ({ target }) => {
			const db = target.result;
			db.createObjectStore(idbName);
		};

		request.onsuccess = () => resolve(request);
		request.onerror = () => reject(IDB_PERMISSION_WARNING);
	})
		.then(({ result }) => {
			const connnection = result;
			connnection.onerror = ({ target }) =>
				console.log(`Database error: ${target.errorCode}`);
			successHandler(connnection);
		})
		.catch(failHandler);
}

function getData({
	idbConnection,
	key,
	successHandler,
	failHandler = error => console.log(error)
}) {
	return new Promise((resolve, reject) => {
		const idbName = idbConnection.name;
		const transaction = idbConnection.transaction([idbName]);

		transaction.oncomplete = () => resolve(true);
		transaction.onerror = () => reject(HANDLE_INDEXEDDB_ERROR);

		const objectStore = transaction.objectStore(idbName);
		const request = objectStore.get(key);

		request.onsuccess = ({ target }) => resolve(target.result);
		request.onerror = () => reject(true);
	})
		.then(result => successHandler(result))
		.catch(failHandler);
}

function updateData({
	idbConnection,
	strategy = 'readwrite',
	key,
	value,
	successHandler,
	failHandler = error => console.log(error)
}) {
	return new Promise((resolve, reject) => {
		const idbName = idbConnection.name;
		const transaction = idbConnection.transaction([idbName], strategy);

		transaction.oncomplete = () => resolve(true);
		transaction.onerror = () => reject(HANDLE_INDEXEDDB_ERROR);

		const objectStore = transaction.objectStore(idbName);
		const request = objectStore.put(value, key);

		request.onerror = () => reject(true);
	})
		.then(result => successHandler(result))
		.catch(failHandler);
}

function removeData({
	idbConnection,
	strategy = 'readwrite',
	key,
	successHandler,
	failHandler = error => console.log(error)
}) {
	return new Promise((resolve, reject) => {
		const idbName = idbConnection.name;
		const transaction = idbConnection.transaction([idbName], strategy);

		transaction.oncomplete = () => resolve(true);
		transaction.onerror = () => reject(HANDLE_INDEXEDDB_ERROR);

		const objectStore = transaction.objectStore(idbName);
		const request = objectStore.delete(key);

		request.onerror = () => reject(true);
	})
		.then(result => successHandler(result))
		.catch(failHandler);
}

function getDataFilterByKeys({
	idbConnection,
	filterKeys,
	successHandler,
	failHandler = error => console.log(error)
}) {
	return new Promise((resolve, reject) => {
		const idbName = idbConnection.name;
		const transaction = idbConnection.transaction([idbName]);

		transaction.oncomplete = () => resolve(true);
		transaction.onerror = () => reject(HANDLE_INDEXEDDB_ERROR);

		const objectStore = transaction.objectStore(idbName);
		const cursorRequest = objectStore.openCursor();

		const result = {};
		let cloneFilterKeys = filterKeys.map(item => item);

		cursorRequest.onsuccess = ({ target }) => {
			const cursor = target.result;
			if (!cursor || cloneFilterKeys.length === 0) {
				resolve({ installed: result, needToInstall: cloneFilterKeys });
				return;
			}

			const { key, value } = cursor;
			const isExist = cloneFilterKeys.some(item => key === item);
			if (isExist) {
				cloneFilterKeys = cloneFilterKeys.filter(item => key !== item);
				result[key] = value;
			}
			cursor.continue();
		};
		cursorRequest.onerror = () => reject(true);
	})
		.then(result => successHandler(result))
		.catch(failHandler);
}

export {
	checkSupportBrowser,
	connectToIDB,
	getData,
	updateData,
	removeData,
	getDataFilterByKeys
};
