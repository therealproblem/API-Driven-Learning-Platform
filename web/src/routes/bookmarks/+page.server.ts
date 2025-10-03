export const load = ({ cookies }) => {
	const accessToken = cookies.get('accessToken');
	return {
		loggedIn: !!accessToken
	};
};
