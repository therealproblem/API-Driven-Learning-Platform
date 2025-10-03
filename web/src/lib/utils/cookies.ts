import config from '../../config/config';
import type { Cookies } from '@sveltejs/kit';
const MAX_TOKEN_AGE = 60 * 15;
const MAX_REFRESH_TOKEN_AGE = 60 * 60 * 24 * 7;
// const MAX_TOKEN_AGE = 60 * 1;
// const MAX_REFRESH_TOKEN_AGE = 60 * 1;

export const setTokenCookies = (cookies: Cookies, cookiesHeader: string[]) => {
	const token = cookiesHeader[0].split(';')[0].split('=')[1];
	const refreshToken = cookiesHeader[1].split(';')[0].split('=')[1];

	if (token === null || refreshToken === null) return;

	cookies.set('accessToken', token, {
		httpOnly: true,
		secure: config.nodeEnv === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: MAX_TOKEN_AGE
	});

	cookies.set('refreshToken', refreshToken, {
		httpOnly: true,
		secure: config.nodeEnv === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: MAX_REFRESH_TOKEN_AGE
	});
};
