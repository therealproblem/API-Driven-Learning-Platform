import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import type Tokens from '../models/Tokens.ts';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import type { StrategyOptions } from 'passport-jwt';
import config from '../config/config.ts';
import { getUserByEmail } from '../db/helpers/usersHelper.ts';
import bcrypt from "bcrypt";


const publicPaths = ['/user/register'];
const basicPaths = ['/user/login'];

const cookieExtractor = (req: Request): string | null => {
    let token: string | null = null;
    let tokens: Tokens | null = null;
    if (req && req.cookies) {
        tokens = {
            jwt: req.cookies['accessToken'],
            refresh: req.cookies['refreshToken']
        }
    }
    switch (req.path) {
        case '/refreshToken':
            token = tokens?.refresh ?? null;
            break;
        default:
            token = tokens?.jwt ?? null;
            break;
    }
    return token;
};


passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        const user = await getUserByEmail(username);
        if (user === null) return done('User do not exist', false)
        const isMatch = bcrypt.compareSync(password, user.passwordHash);
        if (isMatch)
            return done(null, user)
        else
            return done('Wrong credentials', false)
    })
);

const jwtOptions: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwtSecret
};

passport.use(
    new JwtStrategy(jwtOptions, (payload, done) => {
        console.log(payload);
        // try {
        //     const user = await User.findById(payload.id); // Assuming payload contains user ID
        //     if (user) {
        //         return done(null, user);
        //     }
        //     return done(null, false);
        // } catch (error) {
        //     console.error(error);
        //     return done(error, false);
        // }
        return done(null, {})
    })
);


const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    if (publicPaths.includes(req.path)) return next();
    passport.authenticate(basicPaths.includes(req.path) ? 'local' : 'jwt', { session: false }, (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) 
            return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        return next();
    })(req, res, next);
}

export default authMiddleware;