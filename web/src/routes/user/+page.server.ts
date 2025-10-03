import type { Actions } from './$types';
import config from '../../config/config';
import { createAlias } from '@/utils/alias';
import type { HttpClientRequest } from '$lib/types/Api';
import HttpClient, { validators } from '@/utils/httpClient';

const login = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const req: HttpClientRequest = {
		url: `${config.api}/user/login`,
		method: 'POST',
		validator: validators.loginSchema,
		body: data,
		cookies
	};

	const res = await HttpClient.send(req);

	return {
		success: true,
		email: res.data.result.email,
		name: res.data.result.name,
		alias: createAlias(res.data.result.name)
	};
};

const register = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const req: HttpClientRequest = {
		url: `${config.api}/user/register`,
		method: 'POST',
		validator: validators.registerSchema,
		body: data,
		cookies
	};

	const res = await HttpClient.send(req);
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
