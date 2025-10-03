import type { Request, Response, NextFunction } from 'express';
import allVersionsRouter from '../routes/index';

const apiVersioningMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const acceptHeader = req.headers['accept'];
	let version: string | undefined = undefined;
	if (acceptHeader && typeof acceptHeader === 'string') {
		const match = acceptHeader.match(/application\/vnd\.lxp\.v(\d+)\+json/);
		if (match) version = `v${match[1]}`;
	}

	let router = allVersionsRouter['v1'];
	if (Object.keys(allVersionsRouter).includes(version ?? 'v1'))
		router = allVersionsRouter[version ?? 'v1'];

	return router(req, res, next);
};

export default apiVersioningMiddleware;
