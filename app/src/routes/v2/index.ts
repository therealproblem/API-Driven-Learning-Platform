import express from 'express';

const router = express.Router();

router.use('/status', (_, res) => res.status(200).send('OK'));

export default router;
