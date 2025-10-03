import type Config from '$lib/types/Config.ts';

const config: Config = {
	ssApi: import.meta.env['VITE_SS_API_HOST'] || 'http://localhost:3000',
	csApi: import.meta.env['VITE_CS_API_HOST'] || 'http://localhost:3000',
	web: import.meta.env['VITE_ORIGIN'] || 'http://localhost:5173',
	nodeEnv: import.meta.env['VITE_NODE_ENV'] || 'development',
	apiVersion: import.meta.env['VITE_API_VERSION'] || '1'
};

export default config;
