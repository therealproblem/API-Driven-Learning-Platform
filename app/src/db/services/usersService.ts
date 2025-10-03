import { eq } from 'drizzle-orm';
import db from '../db.ts';
import users from '../schema/users.ts';

export const getUserByEmail = async (email: string) => {
	email = email.toLowerCase();
	const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
	return result[0] ?? null;
};

export const createUser = async (email: string, passwordHash: string, name: string) => {
	email = email.toLowerCase();
	const [newUser] = await db.insert(users).values({ email, passwordHash, name }).returning();
	return newUser;
};
