import type { NextFunction, Request, Response } from 'express';

const errorMiddleware = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).send('Not Found');
};

export default errorMiddleware;
