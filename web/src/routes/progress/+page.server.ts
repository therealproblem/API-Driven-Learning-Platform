import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import axios, { AxiosError } from 'axios';
import config from '../../config/config';
import { z } from 'zod';
import { setTokenCookies } from '@/utils/cookies';

const updateSchema = z.object({
	id: z.string(),
	lastWatched: z.string()
});

const update = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());
	const result = updateSchema.safeParse(data);
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
			`${config.api}/progress/update`,
			{ ...data, id: data.id, lastWatched: parseInt(data.lastWatched) },
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
	return;
};

export const actions = {
	update
} satisfies Actions;
