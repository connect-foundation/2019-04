import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { File, Project, User } from '../src/models';
import { fileSeed, projectSeed, userSeed } from './seeds';

dotenv.config();

async function drop(connection) {
	return connection
		.dropDatabase()
		.then(() => console.log('SUCCESS drop DATABASE! '))
		.catch(err => console.error(err));
}

async function insertSeed(Model, seed) {
	return Model.insertMany(seed)
		.then(() => console.log(`SUCCESS insert ${Model.modelName}`))
		.catch(err => console.error(err));
}

if (process.env.NODE_ENV === 'production') process.exit(0);
else {
	const MONGODB_URI = process.env.DEV_DATABASE_URI;
	const connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection error:'));
	connection.once('open', async () => {
		console.log('Connection Successful!');

		await drop(connection);

		await insertSeed(File, fileSeed);
		await insertSeed(Project, projectSeed);
		await insertSeed(User, userSeed);

		connection.close();
	});

	mongoose.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}
