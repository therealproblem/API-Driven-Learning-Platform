import { pgTable, serial, timestamp, integer } from 'drizzle-orm/pg-core';
import courses from './courses.ts';
import users from './users.ts';

const bookmarks = pgTable('bookmarks', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export default bookmarks;
