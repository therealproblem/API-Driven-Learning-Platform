import { pgTable, serial, timestamp, integer, text } from 'drizzle-orm/pg-core';
import courses from './courses.js';
import users from './users.js';

const bookmarks = pgTable('bookmarks', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	courseId: text('course_id')
		.notNull()
		.references(() => courses.id),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export default bookmarks;
