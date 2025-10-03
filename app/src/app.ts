import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';
import authMiddleware from './middlewares/authMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import routes from './routes/index.js';

const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
// app.post('/dummy/generate', generateData);
app.use(authMiddleware);

// Routes
app.use('/user', routes.users);
app.use('/courses', routes.courses);
app.use('/bookmarks', routes.bookmarks);
app.use('/progress', routes.progress);

app.use(errorMiddleware);

export default app;
