import { eq, count, and, ilike, sql, desc } from 'drizzle-orm';
import db from '../db.ts';
import bookmarks from '../schema/bookmark.ts';
import courses from '../schema/courses.ts';
import progress from '../schema/progress.ts';

export const getCourseByUserAndCourseId = async (id: string, userId: number) => {
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
		.leftJoin(bookmarks, and(eq(courses.id, bookmarks.courseId), eq(bookmarks.userId, userId)))
		.leftJoin(progress, and(eq(courses.id, progress.courseId), eq(progress.userId, userId)))
		.where(eq(courses.id, id))
		.limit(1);
	return result[0] ?? null;
};

export const getCourses = async (userId: number, filter: string, page: number, count: number) => {
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
		.leftJoin(bookmarks, and(eq(courses.id, bookmarks.courseId), eq(bookmarks.userId, userId)))
		.leftJoin(progress, and(eq(courses.id, progress.courseId), eq(progress.userId, userId)))
		.where(filter !== '' ? ilike(courses.title, `%${filter}%`) : sql`true`)
		.orderBy(desc(courses.createdAt))
		.limit(count)
		.offset((page - 1) * count);
	return result ?? [];
};

export const getNumCourses = async (filter: string) => {
	const result = await db
		.select({ count: count() })
		.from(courses)
		.where(ilike(courses.title, `%${filter}%`));
	return result[0] ?? null;
};

export const insertCourse = async (
	id: string,
	title: string,
	duration: number,
	creatorName: string
) => {
	const [result] = await db
		.insert(courses)
		.values({ id, title, duration, creatorName })
		.returning();
	return result;
};

export const deleteCourse = async (id: string) => {
	const result = await db.delete(courses).where(eq(courses.id, id));
	return result;
};
