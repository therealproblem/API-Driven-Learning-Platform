import type { Request, Response } from 'express';
import {
	insertProgress,
	getProgressByUserAndCourseId,
	updateProgress
} from '../db/services/progressService';

export const update = async (req: Request, res: Response) => {
	if (!req.user) return res.send(403);
	const { id, lastWatched } = req.body;
	const userId = (req.user as { id: number })!.id;
	const progress = await getProgressByUserAndCourseId(userId, id);
	if (!progress) await insertProgress(userId, id, lastWatched);
	else await updateProgress(progress.id, lastWatched);
	return res.send(200);
};
