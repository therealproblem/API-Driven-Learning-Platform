import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import axios, { AxiosError } from 'axios';
import config from '../../config/config';
import { z } from 'zod';
import { setTokenCookies } from '@/token-utils';

const listSchema = z.object({
	searchTerm: z.string().trim(),
	page: z.string(),
	count: z.string()
});

const list = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const result = listSchema.safeParse(data);
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
		res = await axios.post(
			`${config.api}/courses/list`,
			{ ...data, page: parseInt(data.page), count: parseInt(data.count) },
			{
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookiesHeader
				}
			}
		);
	} catch (err: unknown) {
		const error = err as AxiosError;
		return fail(400, { message: (error.response?.data as { error: string }).error, error: true });
	}

	if (res.headers['set-cookie']) setTokenCookies(cookies, res.headers['set-cookie']);
	return JSON.stringify({
		courses: res.data.result,
		total: res.data.total
	});
};

export const actions = {
	list
} satisfies Actions;
