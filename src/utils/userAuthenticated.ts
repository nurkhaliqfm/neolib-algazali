export const isUserLogin = (): boolean => {
	return !!localStorage.getItem('oauthData');
};

export const isTokenExpired = (time: number): boolean => {
	return Date.now() >= time && isUserLogin();
};
