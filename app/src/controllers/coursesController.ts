import type { Request, Response } from 'express';
import {
	getCourseByUserAndCourseId,
	getCourses,
	getNumCourses
} from '../db/services/coursesService';

export const list = async (req: Request, res: Response) => {
	if (!req.user) return res.send(403);
	const { searchTerm, page, count } = req.query;
	const userId = (req.user as { id: number })!.id;
	let result = await getCourses(
		userId,
		searchTerm as string,
		parseInt(page as string),
		parseInt(count as string)
	);
	const total = await getNumCourses(searchTerm as string);
	result = result.map((r) => ({
		...r,
		pctComplete: Math.floor((r.lastWatched / r.duration) * 100)
	}));
	return res.status(200).json({ result, total: total?.count ?? 0 });
};

export const byId = async (req: Request, res: Response) => {
	if (!req.user) return res.send(403);
	const { id } = req.query;
	const userId = (req.user as { id: number })!.id;
	const result = await getCourseByUserAndCourseId(id as string, userId);
	if (!result) return res.send(400);
	result['pctComplete'] = Math.floor((result.lastWatched / result.duration) * 100);
	return res.status(200).json({ result });
};
