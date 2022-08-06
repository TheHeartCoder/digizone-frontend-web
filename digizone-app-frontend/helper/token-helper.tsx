// set token to session storage
export const setToken = (token: string, type: string) => {
	sessionStorage.setItem('_digi_auth_token', token);
	sessionStorage.setItem('_user_type', type);
};

// get token
export const getToken = () => {
	return sessionStorage.getItem('_digi_auth_token');
};

// get user type
export const getUserType = () => {
	return sessionStorage.getItem('_user_type');
};

// remove token
export const removeToken = () => {
	sessionStorage.removeItem('_digi_auth_token');
};

// remove user type
export const removeUserType = () => {
	sessionStorage.removeItem('_user_type');
};
