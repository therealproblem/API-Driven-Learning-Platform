import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').unique().notNull(),
	passwordHash: text('password').notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export default users;
