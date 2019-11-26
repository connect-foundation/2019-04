import dotenv from 'dotenv';
dotenv.config();

const PORT = 3030;

const {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URI,
	JWT_SECRET
} = process.env;

const DATABASE_URI =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_DATABASE_URI
		: process.env.DEV_DATABASE_URI;
console.log(process.env.NODE_ENV);
const COCODE_CLIENT_URI =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_COCODE_CLIENT_URI
		: process.env.DEV_COCODE_CLIENT_URI;

export {
	PORT,
	DATABASE_URI,
	COCODE_CLIENT_URI,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URI,
	JWT_SECRET
};
