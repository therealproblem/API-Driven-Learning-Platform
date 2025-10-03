import cors from 'cors';

const allowedOrigins = ['http://localhost:5173'];
const corsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true); // Allow the request
		} else {
			callback(new Error('Not allowed by CORS')); // Block the request
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
	allowedHeaders: ['Content-Type', 'Cookie'], // Allowed request headers
	credentials: true // Allow sending cookies and HTTP authentication credentials
};

export default corsOptions;
