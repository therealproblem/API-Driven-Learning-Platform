import express from 'express';
import { update, list } from '../../controllers/bookmarksController';
const router = express.Router();

router.get('/list', list);
router.put('/update/', update);

export default router;
