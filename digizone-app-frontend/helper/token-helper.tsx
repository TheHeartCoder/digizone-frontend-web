// set token to session storage
export const setToken = (token: string, type: string) => {
	localStorage.setItem('_digi_auth_token', token);
	localStorage.setItem('_user_type', type);
};

// get token
export const getToken = () => {
	return localStorage.getItem('_digi_auth_token');
};

// get user type
export const getUserType = () => {
	return localStorage.getItem('_user_type');
};

// remove token
export const removeToken = () => {
	localStorage.removeItem('_digi_auth_token');
};

// remove user type
export const removeUserType = () => {
	localStorage.removeItem('_user_type');
};
