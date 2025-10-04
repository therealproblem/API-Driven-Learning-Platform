import express from 'express';
import { update } from '../../controllers/progressController';
const router = express.Router();

router.put('/update/', update);

export default router;
