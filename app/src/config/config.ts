import dotenv from 'dotenv';
import type Config from '../interfaces/Config.js';

dotenv.config();

const config: Config = {
	port: Number(process.env['PORT']) || 3000,
	nodeEnv: process.env['NODE_ENV'] || 'development',
	jwtSecret: process.env['JWT_TOKEN_SECRET'] || '',
	refreshTokenSecret: process.env['REFRESH_TOKEN_SECRET'] || ''
};

export default config;
