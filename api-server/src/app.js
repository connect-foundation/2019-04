import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { PORT, DATABASE_URI } from './config';

import passport from './middlewares/passport';
import apiRouter from './routes';

const app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to Mongo'));

mongoose.connect(DATABASE_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const corsOption = {
	origin: (origin, callback) => callback(null, true),
	exposedHeaders: ['Set-Cookie'],
	credentials: true
};

app.use(morgan('dev'));
app.use(cors(corsOption));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
