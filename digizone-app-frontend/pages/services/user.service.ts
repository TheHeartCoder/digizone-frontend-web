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
	loginUser: async (user: {}): Promise<resposnePayload> => {
		const loginUserRes = await requests.post('/users/login', user);
		return loginUserRes;
	},
	// update user details
	updateUser: async (user: {}): Promise<resposnePayload> => {
		const updateUserRes = await requests.put('/users/1', user);
		return updateUserRes;
	},
	// forgot user's password
	forgotUserPassword: async (user: {}): Promise<resposnePayload> => {
		const forgotUserPasswordRes = await requests.post(
			'/users/forgot-password',
			user
		);
		return forgotUserPasswordRes;
	},
};
