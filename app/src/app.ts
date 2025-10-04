import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { generateData } from './controllers/dummyController';
import apiVersioningMiddleware from './middlewares/apiVersioningMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import corsMiddleware from './middlewares/corsMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.post('/api/dummy/generate', generateData);

// Middlewares
app.use(helmet());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(authMiddleware);
app.use('/api', apiVersioningMiddleware);

app.use(errorMiddleware);

export default app;
