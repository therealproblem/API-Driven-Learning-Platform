import type { Response } from 'express';

export interface AppError extends Error {
	status?: number;
}

const errorMiddleware = (err: AppError, res: Response) => {
	res.status(err.status || 500).json({
		message: err.message || 'Internal Server Error'
	});
};

export default errorMiddleware;
