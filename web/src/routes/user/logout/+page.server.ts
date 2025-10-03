export const load = ({ cookies }) => {
	cookies.delete('refreshToken', { path: '/' });
	cookies.delete('accessToken', { path: '/' });
	return { success: true, email: '', name: '', alias: 'P' };
};
