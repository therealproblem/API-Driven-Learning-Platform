import { pgTable, serial, timestamp, integer, text } from 'drizzle-orm/pg-core';
import courses from './courses.js';
import users from './users.js';

const progress = pgTable('progress', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	courseId: text('course_id')
		.notNull()
		.references(() => courses.id),
	lastWatched: integer('last_watched').default(0),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export default progress;
