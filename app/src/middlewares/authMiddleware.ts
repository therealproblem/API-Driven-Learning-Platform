import bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config/config.js';
import { refresh } from '../controllers/usersController.js';
import { getUserByEmail } from '../db/services/usersService.js';

const publicPaths = ['/user/register', '/dummy/generate'];
const basicPaths = ['/user/login'];

const cookieExtractor = (req: Request): string | null => {
	return req?.cookies['accessToken'];
};

passport.use(
	'local',
	new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
		const user = await getUserByEmail(username);
		if (user === null) return done('User do not exist', false);
		const isMatch = bcrypt.compareSync(password, user.passwordHash);
		if (isMatch) return done(null, user);
		else return done('Wrong credentials', false);
	})
);

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: config.jwtSecret
		},
		(payload, done) => {
			if (payload.id === undefined || payload.id === null) return done('Unauthorized', false);
			return done(null, payload);
		}
	)
);

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (publicPaths.includes(req.path)) return next();
	passport.authenticate(
		basicPaths.includes(req.path) ? 'local' : 'jwt',
		{ session: false },
		async (err, user, info) => {
			if (user) req.user = user;
			if (!user && !basicPaths.includes(req.path)) {
				const result = await refresh(req, res);
				if (!result.success) return res.status(401).json({ message: 'Unauthorized' });
			}
			return next();
		}
	)(req, res, next);
};

export default authMiddleware;
