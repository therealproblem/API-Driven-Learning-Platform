import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

const courses = pgTable('courses', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	duration: integer('duration').notNull(),
	creatorName: text('creator_name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export default courses;
