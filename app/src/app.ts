import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware.ts';
import authMiddleware from './middlewares/authMiddleware.ts';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { login, register } from './controllers/usersController.ts';

const app = express();

// Middlewares
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(authMiddleware);

// Routes
app.post('/user/login', login);
app.post('/user/register', register);

app.use(errorMiddleware);

export default app;