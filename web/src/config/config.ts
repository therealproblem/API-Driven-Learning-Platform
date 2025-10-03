// import dotenv from 'dotenv';
import type Config from '$lib/types/Config.ts';

// dotenv.config();

const config: Config = {
	api: import.meta.env['API_HOST'] || 'http://localhost:3000',
	web: import.meta.env['ORIGIN'] || 'http://localhost:5173',
	nodeEnv: import.meta.env['NODE_ENV'] || 'development'
};

export default config;
