import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dbConfig from '../config/dbConfig.ts';
import * as schema from './schema/index.ts';
import 'dotenv/config'; // Load environment variables
import config from '../config/config.ts';

const pool = new Pool({
	host: dbConfig.host,
	port: dbConfig.port,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.name,
	ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
});

const db = drizzle(pool, { schema });

export default db;
