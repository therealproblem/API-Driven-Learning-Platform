import type { Request, Response } from 'express';
import {
	insertBookmark,
	deleteBookmarkById,
	getBookmarkByUserAndCourseId,
	getBookmarksByUserId,
	getNumBookmarksByUserId
} from '../db/services/bookmarksService.js';

export const update = async (req: Request, res: Response) => {
	if (!req.user) return res.send(403);
	const { id, bookmarked } = req.body;
	const userId = (req.user as { id: number })!.id;
	const item = await getBookmarkByUserAndCourseId(userId, id);
	if (!item && bookmarked) await insertBookmark(userId, id);
	else if (item && !bookmarked) await deleteBookmarkById(item.bookmarks.id);
	return res.send(200);
};

export const list = async (req: Request, res: Response) => {
	if (!req.user) return res.send(403);
	const { page, count } = req.body;
	const userId = (req.user as { id: number })!.id;
	let result = await getBookmarksByUserId(userId, page, count);
	const total = await getNumBookmarksByUserId(userId);
	result = result.map((r) => ({
		...r,
		pctComplete: Math.floor((r.lastWatched / r.duration) * 100)
	}));
	return res.status(200).json({ result, total: total?.count ?? 0 });
};
