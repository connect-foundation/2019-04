import dotenv from 'dotenv';
dotenv.config();

const PORT = 3030;

const {
	DEV_GITHUB_CLIENT_ID,
	DEV_GITHUB_CLIENT_SECRET,
	PROD_GITHUB_CLIENT_ID,
	PROD_GITHUB_CLIENT_SECRET,
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

const PASSPORT_CLIENT_OPTION =
	process.env.NODE_ENV === 'production'
		? {
			clientID: PROD_GITHUB_CLIENT_ID,
			clientSecret: PROD_GITHUB_CLIENT_SECRET,
			callbackURL: GITHUB_REDIRECT_URI
		} : {
			clientID: DEV_GITHUB_CLIENT_ID,
			clientSecret: DEV_GITHUB_CLIENT_SECRET,
			callbackURL: GITHUB_REDIRECT_URI
		};

const CORS_OPTION = {
	origin: (origin, callback) => callback(null, true),
	exposedHeaders: ['Set-Cookie'],
	credentials: true
};

const MONGO_OPTION = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
};

export {
	PORT,
	DATABASE_URI,
	COCODE_CLIENT_URI,
	PASSPORT_CLIENT_OPTION,
	JWT_SECRET,
	CORS_OPTION,
	MONGO_OPTION
};
