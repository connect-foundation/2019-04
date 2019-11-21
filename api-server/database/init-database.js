import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { File, Project, User } from '../src/models';
import { fileSeed, projectSeed, userSeed } from './seeds';

dotenv.config();

async function dropCollection(db, collection) {
	return db
		.dropCollection(collection)
		.then(() => console.log(`SUCCESS drop ${collection} `))
		.catch(err => console.error(err));
}

async function insertSeed(Model, seed) {
	return Model.insertMany(seed)
		.then(() => console.log('SUCCESS insert seedData'))
		.catch(err => console.error(err));
}

const MONGODB_URI =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_DATABASE_URI
		: process.env.DEV_DATABASE_URI;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
	console.log('Connection Successful!');

	await dropCollection(db, 'files');
	await dropCollection(db, 'projects');
	await dropCollection(db, 'users');

	await insertSeed(File, fileSeed);
	await insertSeed(Project, projectSeed);
	await insertSeed(User, userSeed);
});

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
