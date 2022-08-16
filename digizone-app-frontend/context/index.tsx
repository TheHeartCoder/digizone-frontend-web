import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
interface CommonHeaderProperties {
	'X-CSRF-Token': string;
}

type Props = {
	children: React.ReactNode;
};

// initial state
const intialState = {
	user: null,
};

type Context = {
	state: Record<string, any>;
	dispatch: (action: {
		type: string;
		payload: Record<string, any> | undefined;
	}) => void;
};

const initialContext: Context = {
	state: intialState,
	dispatch: () => {},
};

// create context
const Context = createContext<Context>(initialContext);

// root reducer
const rootReducer = (
	state: Record<string, any>,
	action: { type: string; payload: Record<string, any> | undefined }
) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return { ...state, user: null };
		case 'UPDATE_USER':
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

// context provider
const Provider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(rootReducer, intialState);

	// router
	const router = useRouter();

	useEffect(() => {
		return dispatch({
			type: 'LOGIN',
			payload: JSON.parse(window.localStorage.getItem('_digi_user') || '{}'),
		});
	}, []);

	axios.interceptors.response.use(
		function (response) {
			// any status code that lie within the range of 2XX cause this function
			// to trigger
			return response;
		},
		function (error) {
			console.log('error :: ' + error);

			// any status codes that falls outside the range of 2xx cause this function
			// to trigger
			let res = error.response;
			if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
				return new Promise((resolve, reject) => {
					axios
						.put('/api/v1/users/logout')
						.then((data) => {
							console.log('/401 error > logout');
							dispatch({
								type: 'LOGOUT',
								payload: undefined,
							});
							localStorage.removeItem('_digi_user');
							router.push('/auth');
						})
						.catch((err) => {
							console.log('AXIOS INTERCEPTORS ERR', err);
							reject(error);
						});
				});
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axios.get(
				process.env.NEXT_PUBLIC_BASE_API_PREFIX + '/csrf-token'
			);
			const csrfToken = data.result;
			if (!csrfToken) {
				throw new Error('CSRF Token not found');
			}
			// csrf token to axios header
			axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
			console.log('CSRF Token', csrfToken, axios.defaults.headers);
		};
		getCsrfToken();
	}, []);

	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};

export { Context, Provider };
