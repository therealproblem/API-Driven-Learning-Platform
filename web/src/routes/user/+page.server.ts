import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import config from '../../config/config';
import { setTokenCookies } from '@/utils/cookies';
import { createAlias } from '@/utils/alias';

const registerSchema = z
	.object({
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(16, 'Password cannot exceed 16 characters')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[0-9]/, 'Password must contain at least one number')
			.trim(),
		email: z.email().trim(),
		confirmPassword: z.string().trim(),
		name: z.string().trim()
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match'
			});
		}
	});
const loginSchema = z.object({
	password: z.string().trim(),
	email: z.email().trim()
});

const login = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const result = loginSchema.safeParse(data);
	if (!result.success)
		return fail(400, {
			message: result.error.issues.map((e) => e.message).join('\n'),
			error: true
		});
	const cookiesHeader =
		cookies
			.getAll()
			.map((e) => `${e.name}=${e.value}`)
			.join(';') + ';';
	let res;
	try {
		res = await axios.post(`${config.api}/user/login`, data, {
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookiesHeader
			}
		});
	} catch (err: unknown) {
		const error = err as AxiosError;
		return fail(400, { message: (error.response?.data as { error: string }).error, error: true });
	}

	setTokenCookies(cookies, res.headers['set-cookie']);
	return {
		success: true,
		email: res.data.result.email,
		name: res.data.result.name,
		alias: createAlias(res.data.result.name)
	};
};

const register = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const result = registerSchema.safeParse(data);
	if (!result.success)
		return fail(400, {
			message: result.error.issues.map((e) => e.message).join('\n'),
			error: true
		});
	const cookiesHeader =
		cookies
			.getAll()
			.map((e) => `${e.name}=${e.value}`)
			.join(';') + ';';
	let res;
	try {
		res = await axios.post(`${config.api}/user/register`, data, {
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookiesHeader
			}
		});
	} catch (err) {
		const error = err as AxiosError;
		return fail(400, { message: (error.response?.data as { error: string }).error, error: true });
	}

	setTokenCookies(cookies, res.headers['set-cookie']);

	return {
		success: true,
		email: res.data.result.email,
		name: res.data.result.name,
		alias: createAlias(res.data.result.name)
	};
};

const logout = async ({ cookies }) => {
	cookies.delete('refreshToken', { path: '/' });
	cookies.delete('accessToken', { path: '/' });
	return { success: true, email: '', name: '', alias: 'P' };
};

export const actions = {
	login,
	register,
	logout
} satisfies Actions;
