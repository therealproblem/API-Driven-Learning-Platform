import express from 'express';
import { update, list } from '../controllers/bookmarksController.js';
const router = express.Router();

router.post('/list', list);
router.post('/update', update);

export default router;
