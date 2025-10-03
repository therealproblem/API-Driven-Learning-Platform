import express from 'express';
import { update } from '../../controllers/progressController';
const router = express.Router();

router.post('/update', update);

export default router;
