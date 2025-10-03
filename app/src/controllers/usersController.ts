import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { createUser, getUserByEmail } from '../db/services/usersService';
import { hash } from '../utils/hashing';

export const login = (req: Request, res: Response) => {
	const payload = req.user;
	if (!payload) return res.status(500).json({ error: 'Missing payload' });
	delete (payload as { passwordHash?: string }).passwordHash;
	delete (payload as { createdAt?: Date }).createdAt;
	const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
	const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: '7d' });
	res.cookie('accessToken', token);
	res.cookie('refreshToken', refreshToken);
	return res.status(200).json({ result: payload });
};

export const register = async (req: Request, res: Response) => {
	const emailExist = (await getUserByEmail(req.body.email)) !== null;
	if (emailExist) return res.status(409).json({ error: 'Email already exist' }); // <-- return here

	const newUser = await createUser(req.body.email, hash(req.body.password), req.body.name);

	if (!newUser) return res.status(500).json({ error: 'DB Error: unable to insert' }); // <-- return here

	delete (newUser as { passwordHash?: string }).passwordHash;
	delete (newUser as { createdAt?: Date }).createdAt;
	const token = jwt.sign(newUser, config.jwtSecret, { expiresIn: '1m' });
	const refreshToken = jwt.sign(newUser, config.refreshTokenSecret, { expiresIn: '7d' });
	res.cookie('accessToken', token);
	res.cookie('refreshToken', refreshToken);

	return res.status(200).json({ result: newUser }); // <-- final response
};

export const refresh = async (req: Request, res: Response) => {
	try {
		const payload = jwt.verify(req.cookies['refreshToken'], config.refreshTokenSecret);
		delete payload['iat'];
		delete payload['exp'];
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1m' });
		const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: '7d' });
		res.cookie('accessToken', token);
		res.cookie('refreshToken', refreshToken);
		req.user = payload;
		return { success: true };
	} catch (err) {
		return { success: false, err };
	}
};
