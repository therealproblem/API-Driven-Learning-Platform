import express from 'express';
import { byId, list } from '../../controllers/coursesController';
const router = express.Router();

router.get('/list', list);
router.get('/id', byId);

export default router;
