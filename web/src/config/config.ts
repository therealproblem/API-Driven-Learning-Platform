import dotenv from 'dotenv';
import type Config from '$lib/types/Config.ts';

dotenv.config();

const config: Config = {
    api: process.env['API_HOST'] || 'http://localhost:3000',
    nodeEnv: process.env['NODE_ENV'] || 'development',
};

export default config;