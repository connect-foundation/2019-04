import Transaction from 'mongoose-transactions';
import { File } from '../../../models';

const FILE_MODEL_NAME = 'File';

async function createFile(req, res) {
	const { _id } = req.project;
	const projectId = _id;
	const { parentId, ...newFileInfo } = req.body;

	const transaction = new Transaction();

	const createFileAndUpdateChildOdParent = ({ _doc: { _id, child } }) => {
		const newFile = { ...newFileInfo, projectId };
		const newFileId = transaction.insert(FILE_MODEL_NAME, newFile);

		const parentFileId = _id;
		const newDataOfParent = { child: [...child, newFileId] };

		transaction.update(FILE_MODEL_NAME, parentFileId, newDataOfParent);

		transaction
			.run()
			.then(() => res.sendStatus(200))
			.catch(error => {
				console.error(error);
				transaction
					.rollback()
					.then(() => {
						transaction.clean();
						res.sendStatus(500);
					})
					.catch(() => res.sendStatus(500));
			});
	};

	File.findById(parentId)
		.then(createFileAndUpdateChildOdParent)
		.catch(() => res.sendStatus(500));
}

export { createFile };
