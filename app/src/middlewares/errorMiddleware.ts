import type { Request, Response, NextFunction} from 'express';

export interface AppError extends Error {
    status?: number;
}

const errorMiddleware = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorMiddleware;