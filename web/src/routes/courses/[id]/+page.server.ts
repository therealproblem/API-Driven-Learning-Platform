import type { PageServerLoad } from './$types';
import type { HttpClientRequest } from '$lib/types/Api';
import HttpClient, { getApiHost } from '@/utils/httpClient';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const accessToken = cookies.get('accessToken');
	const req: HttpClientRequest = {
		url: `${getApiHost()}/courses/id/${params.id}`,
		method: 'GET',
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
