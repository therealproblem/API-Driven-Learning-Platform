import cors from 'cors';
import config from '../config/config';

const allowedOrigins = [config.webUrl];
const corsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true); // Allow the request
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Cookie'],
	credentials: true
};

export default cors(corsOptions);
