import type { Request, Response } from 'express';

export interface AppError extends Error {
	status?: number;
}

const errorMiddleware = (err: AppError, req: Request, res: Response) => {
	res.status(err.status || 500).json({
		message: err.message || 'Internal Server Error'
	});
};

export default errorMiddleware;
