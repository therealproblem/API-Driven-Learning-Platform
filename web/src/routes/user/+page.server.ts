import type { Actions } from './$types';
import { createAlias } from '@/utils/alias';
import type { HttpClientRequest } from '$lib/types/Api';
import HttpClient, { getApiHost, validators } from '@/utils/httpClient';

const login = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const req: HttpClientRequest = {
		url: `${getApiHost()}/user/login`,
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
		url: `${getApiHost()}/user/register`,
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

export const actions = {
	login,
	register
} satisfies Actions;
