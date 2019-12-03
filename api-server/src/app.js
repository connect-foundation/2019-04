import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from './middlewares/passport';
import apiRouter from './routes';
import { PORT, DATABASE_URI, CORS_OPTION, MONGO_OPTION } from './config';

const app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to Mongo'));

mongoose.connect(DATABASE_URI, MONGO_OPTION);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(morgan('dev'));
app.use(cors(CORS_OPTION));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
