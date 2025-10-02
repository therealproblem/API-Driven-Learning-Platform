import dotenv from 'dotenv';
import type DBConfig from '../models/DBConfig.ts';

dotenv.config();

const config: DBConfig = {
    port: Number(process.env['DB_PORT']) || 5432,
    host: process.env['DB_HOST'] || 'development',
    user: process.env['DB_USER'] || '',
    password: process.env['DB_PASSWORD'] || '',
    name: process.env['DB_NAME'] || '',
};

export default config;