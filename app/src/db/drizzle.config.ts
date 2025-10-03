import path from 'path';
import type { Config } from 'drizzle-kit';
import config from '../config/config';
import dbConfig from '../config/dbConfig';

export default {
	schema: path.resolve(__dirname, './schema'),
	out: path.resolve(__dirname, './migrations'),
	dialect: 'postgresql',
	dbCredentials: {
		host: dbConfig.host,
		port: dbConfig.port,
		user: dbConfig.user,
		password: dbConfig.password,
		database: dbConfig.name,
		ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
	}
} satisfies Config;
