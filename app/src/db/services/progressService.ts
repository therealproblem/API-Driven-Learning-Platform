import { eq, and } from 'drizzle-orm';
import db from '../db.js';
import progress from '../schema/progress.js';

export const getProgressByUserAndCourseId = async (userId: number, courseId: string) => {
	const result = await db
		.select({ id: progress.id })
		.from(progress)
		.where(and(eq(progress.userId, userId), eq(progress.courseId, courseId)))
		.limit(1);
	return result[0] ?? null;
};

export const insertProgress = async (userId: number, courseId: string, lastWatched: number) => {
	const [result] = await db.insert(progress).values({ userId, courseId, lastWatched }).returning();
	return result;
};

export const updateProgress = async (id: number, lastWatched: number) => {
	const result = await db.update(progress).set({ lastWatched }).where(eq(progress.id, id));
	return result;
};
