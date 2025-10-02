import { pgTable, serial, boolean, timestamp, integer } from 'drizzle-orm/pg-core';
import courses from './courses.ts';
import users from './users.ts';

const progress = pgTable('progress', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id),
	lastWatched: integer('last_watched').default(0),
	completed: boolean('completed').default(false),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export default progress;
