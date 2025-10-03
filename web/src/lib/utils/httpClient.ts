import type { HttpClientRequest, HttpClientResponse } from '../types/Api';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { setTokenCookies } from './cookies';
import z from 'zod';
import Profile from '@/stores/user-store';
import { browser } from '$app/environment';
import config from '../../config/config';

const HttpClient = {
	send: async (req: HttpClientRequest): Promise<HttpClientResponse> => {
		const response: HttpClientResponse = { status: 400, success: false, data: {} };

		const { url, body, validator, method, cookies, headers } = req;
		const parseResult = validator.safeParse(body);
		if (!parseResult.success) {
			const msg = parseResult.error.issues.map((e) => e.message).join('\n');
			response.error = msg;
			return response;
		}

		const cookiesHeader = cookies
			?.getAll()
			.map((e) => `${e.name}=${e.value}`)
			.join(';');

		let res: AxiosResponse;
		try {
			res = await axios({
				url,
				method,
				params: method === 'GET' ? { ...body } : undefined,
				data: method !== 'GET' ? { ...body } : undefined,
				headers: {
					'Content-Type': 'application/json',
					...(cookies ? { Cookie: `${cookiesHeader};` } : {}),
					...headers
				},
				withCredentials: true
			});
		} catch (e) {
			const error = e as AxiosError;
			if (error.status === 401) {
				if (cookies) {
					cookies.delete('refreshToken', { path: '/' });
					cookies.delete('accessToken', { path: '/' });
				}
				Profile.alias.set('P');
				Profile.name.set('');
				Profile.email.set('');
			}
			response.error = (error.response?.data as { error: string }).error;
			return response;
		}

		if (res.headers['set-cookie'] && cookies) setTokenCookies(cookies, res.headers['set-cookie']);
		response.status = res.status;
		response.data = res.data;
		response.error = undefined;
		response.success = true;

		return response;
	}
};

export const validators = {
	courseListSchema: z.object({
		searchTerm: z.string().trim(),
		page: z.number(),
		count: z.number()
	}),
	bookmarkListSchema: z.object({
		page: z.number(),
		count: z.number()
	}),
	progressUpdateSchema: z.object({ id: z.string().trim(), lastWatched: z.number() }),
	courseIdSchema: z.object({
		id: z.string().trim()
	}),
	bookmarkUpdateSchema: z.object({ id: z.string().trim(), bookmarked: z.boolean() }),
	registerSchema: z
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
		}),
	loginSchema: z.object({
		password: z.string().trim(),
		email: z.email().trim()
	})
};

export const getApiHost = () => {
	if (browser) return config.csApi;
	else return config.ssApi;
};

export default HttpClient;
