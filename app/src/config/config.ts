import dotenv from 'dotenv';
import type Config from '../interfaces/Config';

dotenv.config();

const config: Config = {
	port: Number(process.env['PORT']) || 3000,
	nodeEnv: process.env['NODE_ENV'] || 'development',
	jwtSecret: process.env['JWT_TOKEN_SECRET'] || '',
	refreshTokenSecret: process.env['REFRESH_TOKEN_SECRET'] || '',
	webUrl: process.env['WEB_URL'] || 'localhost:5173'
};

export default config;
