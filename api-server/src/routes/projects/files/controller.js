import Transaction from '../../../utils/transaction';
import { File } from '../../../models';

const FILE_MODEL_NAME = 'File';

async function preloadFile(req, res, next, fileId) {
	File.findById(fileId)
		.then(file => {
			if (!file) return res.sendStatus(404);

			req.file = file;
			return next();
		})
		.catch(() => res.sendStatus(404));
}

async function createFile(req, res) {
	const { _id } = req.project;
	const projectId = _id;
	const { parentId, ...newFileInfo } = req.body;

	const transaction = new Transaction();

	const createFileAndUpdateChildOfParent = ({ _doc: { _id, child } }) => {
		const newFile = { ...newFileInfo, projectId };
		const newFileId = transaction.insert(FILE_MODEL_NAME, newFile);

		const parentFileId = _id;
		const newDataOfParent = { child: [...child, newFileId] };

		transaction.update(FILE_MODEL_NAME, parentFileId, newDataOfParent);

		const successHandler = () => res.sendStatus(201);
		transaction.runAndTerminate({ successHandler });
	};

	File.findById(parentId)
		.then(createFileAndUpdateChildOfParent)
		.catch(() => res.sendStatus(500));
}

// file move, file rename, update contents
async function updateFile(req, res) {
	const file = req.file;

	const { contents, name, newParentId, oldParentId } = req.body;
	if (contents) file.contents = contents;
	if (name) file.name = name;

	if (!newParentId) {
		console.log(newParentId);
		file.save()
			.then(() => res.sendStatus(200))
			.catch(() => res.sendStatus(500));
		return;
	}

	const moveFileFromOldParentToNewParent = files => {
		const newParentFile = files.filter(
			({ _id }) => newParentId === String(_id)
		)[0];
		const oldParentFile = files.filter(
			({ _id }) => oldParentId === String(_id)
		)[0];

		const transaction = new Transaction();

		const dataOfNewParent = { child: [...newParentFile.child, file._id] };
		const dataOfOldParent = {
			child: oldParentFile.child.filter(id => file._id !== id)
		};

		transaction.update(FILE_MODEL_NAME, newParentId, dataOfNewParent);
		transaction.update(FILE_MODEL_NAME, oldParentId, dataOfOldParent);

		const successHandler = () => res.sendStatus(200);
		transaction.runAndTerminate({ successHandler });
	};

	File.find({ _id: { $in: [newParentId, oldParentId] } })
		.then(moveFileFromOldParentToNewParent)
		.catch(() => res.sendStatus(500));
}

async function deleteFile(req, res) {
	const fileId = req.file._id;
	const { parentId } = req.body;

	const deleteFileAndUpdateChildOfParent = ({ _doc: { child } }) => {
		const transaction = new Transaction();

		const dataOfParent = {
			child: child.filter(id => String(id) !== String(fileId))
		};

		transaction.update(FILE_MODEL_NAME, parentId, dataOfParent);
		transaction.remove(FILE_MODEL_NAME, fileId);

		const successHandler = () => res.sendStatus(204);
		transaction.runAndTerminate({ successHandler });
	};

	File.findById(parentId)
		.then(deleteFileAndUpdateChildOfParent)
		.catch(() => res.sendStatus(500));
}

export { createFile, preloadFile, updateFile, deleteFile };
