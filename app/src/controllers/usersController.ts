import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.ts';
import { createUser, getUserByEmail } from '../db/services/usersService.ts';

const hash = (password: string): string => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hashedPassword = bcrypt.hashSync(password, salt);
	return hashedPassword;
};

export const login = (req: Request, res: Response) => {
	const { passwordHash, createdAt, ...payload } = req.user as any;
	const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
	const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: '7d' });
	res.cookie('accessToken', token);
	res.cookie('refreshToken', refreshToken);
	res.status(200).json(payload);
};

export const register = async (req: Request, res: Response) => {
	const emailExist = (await getUserByEmail(req.body.email)) !== null;
	if (emailExist) return res.status(409).json({ error: 'Email already exist' }); // <-- return here

	const newUser = await createUser(req.body.email, hash(req.body.password), req.body.name);

	if (newUser === null) return res.status(500).json({ error: 'DB Error: unable to insert' }); // <-- return here

	const { passwordHash, createdAt, ...payload } = newUser!;
	const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
	const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: '7d' });
	res.cookie('accessToken', token);
	res.cookie('refreshToken', refreshToken);

	return res.status(200).json(payload); // <-- final response
};
