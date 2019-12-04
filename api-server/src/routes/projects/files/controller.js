import Transaction from '../../../utils/transaction';
import { File } from '../../../models';

const FILE_MODEL_NAME = 'File';

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

export { createFile };
