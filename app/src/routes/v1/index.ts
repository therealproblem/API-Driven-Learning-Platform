import express from 'express';
import bookmarks from './bookmarksRoutes';
import courses from './coursesRoutes';
import progress from './progressRoutes';
import users from './usersRoutes';
const router = express.Router();

router.use('/bookmarks', bookmarks);
router.use('/courses', courses);
router.use('/progress', progress);
router.use('/user', users);
router.use('/status', (_, res) => res.status(200).send('OK'));

export default router;
