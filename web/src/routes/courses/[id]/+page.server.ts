import { fail, type Actions } from '@sveltejs/kit';
import axios, { AxiosError } from 'axios';
import type { PageServerLoad } from './$types';
import config from '../../../config/config';
import { setTokenCookies } from '@/token-utils';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const cookiesHeader =
		cookies
			.getAll()
			.map((e) => `${e.name}=${e.value}`)
			.join(';') + ';';
	let res;
	try {
		res = await axios.post(
			`${config.api}/courses/id`,
			{ id: params.id },
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

	return {
		id: params.id,
		...res.data.result
	};
};

export const actions = {
	updateProgress: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		if (!data.videoId || data.videoId === '') return fail(400, { error: 'Missing id' });
		let res;
		try {
			res = await axios.get(``);
		} catch (err) {
			const error = err as AxiosError;
			return fail(400, { message: (error.response?.data as { error: string }).error, error: true });
		}
		return {
			success: true,
			title: res.data.title,
			creator: res.data.author_name,
			thumbnailURL: res.data.thumbnail_url,
			id: data.id
		};
	}
} satisfies Actions;
