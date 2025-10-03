import express from 'express';
import { byId, list } from '../controllers/coursesController.js';
const router = express.Router();

router.post('/list', list);
router.post('/id', byId);

export default router;
