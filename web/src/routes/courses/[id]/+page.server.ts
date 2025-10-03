import type { PageServerLoad } from './$types';
import config from '../../../config/config';
import type { HttpClientRequest } from '$lib/types/API';
import HttpClient, { validators } from '@/utils/httpClient';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const accessToken = cookies.get('accessToken');
	const req: HttpClientRequest = {
		url: `${config.api}/courses/id`,
		method: 'POST',
		validator: validators.courseIdSchema,
		body: { id: params.id },
		cookies
	};

	const res = await HttpClient.send(req);
	const data = res.data.result;

	return {
		loggedIn: !!accessToken,
		id: params.id,
		...data
	};
};
