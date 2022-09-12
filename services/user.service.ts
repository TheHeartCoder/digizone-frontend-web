import requests, { resposnePayload } from './api';

// create user service
export const Users = {
	// get user details
	getUser: async (): Promise<resposnePayload> => {
		const getUserRes = await requests.get('/users/1');
		return getUserRes;
	},
	// get all users
	getUsers: async (): Promise<resposnePayload> => {
		const getUsersRes = await requests.get('/users');
		return getUsersRes;
	},
	// save user details or register an user
	registerNewUser: async (user: {}): Promise<resposnePayload> => {
		const registerNewUserRes = await requests.post('/users', {
			...user,
			type: 'customer',
		});
		return registerNewUserRes;
	},
	// login an user
	loginUser: async (user: any): Promise<resposnePayload> => {
		const loginUserRes = await requests.post('/users/login', user);
		window.localStorage.setItem(
			'_digi_user',
			JSON.stringify(loginUserRes.result.user)
		);
		return loginUserRes;
	},
	// update user details
	updateUser: async (user: any, id: string): Promise<resposnePayload> => {
		const updateUserRes = await requests.patch(
			`/users/update-name-password/${id}`,
			user
		);
		// get data from localStorage
		const userData = JSON.parse(
			window.localStorage.getItem('_digi_user') || ''
		);
		// update user data
		userData.name = user?.name;
		// set user data
		window.localStorage.setItem('_digi_user', JSON.stringify(userData));

		return updateUserRes;
	},
	// forgot user's password
	forgotUserPassword: async (email: string): Promise<resposnePayload> => {
		const forgotUserPasswordRes = await requests.get(
			`/users/forgot-password/${email}`
		);
		return forgotUserPasswordRes;
	},

	// resend otp
	resendOTP: async (email: string): Promise<resposnePayload> => {
		const resendOTPRes = await requests.get('/users/send-otp-mail/' + email);
		return resendOTPRes;
	},

	// verify OTP
	verifyOTP: async (otp: string, email: string): Promise<resposnePayload> => {
		const verifyOTPRes = await requests.get(
			`/users/verify-email/${otp}/${email}`
		);
		return verifyOTPRes;
	},

	//logout user
	logoutUser: async (): Promise<resposnePayload> => {
		const logoutUserRes = await requests.put('/users/logout', {});
		window.localStorage.removeItem('_digi_user');
		return logoutUserRes;
	},
};
