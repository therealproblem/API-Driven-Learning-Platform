import { eq, count, and, sql, desc } from 'drizzle-orm';
import db from '../db.ts';
import bookmarks from '../schema/bookmark.ts';
import courses from '../schema/courses.ts';
import progress from '../schema/progress.ts';

export const getBookmarksByUserId = async (id: number, page: number, count: number) => {
	const result = await db
		.select({
			id: courses.id,
			title: courses.title,
			duration: courses.duration,
			creatorName: courses.creatorName,
			bookmarked: sql<boolean>`(bookmarks.id IS NOT NULL)`,
			lastWatched: sql<number>`COALESCE(progress.last_watched, 0)`
		})
		.from(courses)
		.leftJoin(bookmarks, and(eq(courses.id, bookmarks.courseId), eq(bookmarks.userId, id)))
		.leftJoin(progress, and(eq(courses.id, progress.courseId), eq(progress.userId, id)))
		.where(and(eq(bookmarks.userId, id), sql`bookmarks.id IS NOT NULL`))
		.orderBy(desc(courses.createdAt))
		.limit(count)
		.offset((page - 1) * count);
	return result ?? [];
};

export const getBookmarkByUserAndCourseId = async (userId: number, courseId: string) => {
	const result = await db
		.select()
		.from(bookmarks)
		.innerJoin(courses, eq(courses.id, bookmarks.courseId))
		.where(and(eq(bookmarks.userId, userId), eq(courses.id, courseId)))
		.limit(1);
	return result[0] ?? null;
};

export const getNumBookmarksByUserId = async (id: number) => {
	const result = await db
		.select({ count: count() })
		.from(bookmarks)
		.where(eq(bookmarks.userId, id));
	return result[0] ?? null;
};

export const insertBookmark = async (userId: number, courseId: string) => {
	const [result] = await db.insert(bookmarks).values({ userId, courseId }).returning();
	return result;
};

export const deleteBookmarkById = async (id: number) => {
	const result = await db.delete(bookmarks).where(eq(bookmarks.id, id));
	return result;
};
