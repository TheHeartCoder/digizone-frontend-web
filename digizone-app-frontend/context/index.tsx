import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
	cartItems: any;
	cartDispatch: (action: {
		type: string;
		payload: Record<string, any>;
	}) => void;
};

const initialContext: Context = {
	state: intialState,
	dispatch: () => {},
	cartItems: [],
	cartDispatch: function (action: {
		type: string;
		payload: Record<string, any>;
	}): void {
		throw new Error('Function not implemented.');
	},
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

// cart reducer
const cartReducer = (
	state: any,
	action: { type: string; payload: Record<string, any> | undefined }
) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			// add items to localStorage
			const cartItems = [...state, action.payload];
			window.localStorage.setItem('_digi_cart', JSON.stringify(cartItems));
			return cartItems;
		case 'REMOVE_FROM_CART':
			// remove items from localStorage
			const newCartItems = state.filter(
				(item: { skuId: string }) => item.skuId !== action.payload?.skuId
			);
			window.localStorage.setItem('_digi_cart', JSON.stringify(newCartItems));
			return newCartItems;
		case 'UPDATE_CART':
			// update items in localStorage
			const updatedCartItems = state.map((item: any) => {
				if (item.skuId === action.payload?.skuId) {
					return action.payload;
				}
				return item;
			});
			window.localStorage.setItem(
				'_digi_cart',
				JSON.stringify(updatedCartItems)
			);
			return updatedCartItems;
		case 'GET_CART_ITEMS':
			return action.payload;
		case 'CLEAR_CART':
			// clear cart from localStorage
			window.localStorage.removeItem('_digi_cart');
			return [];
		default:
			return state;
	}
};

// context provider
const Provider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(rootReducer, intialState);
	const [cartItems, cartDispatch] = useReducer(cartReducer, []);

	// router
	const router = useRouter();

	useEffect(() => {
		dispatch({
			type: 'LOGIN',
			payload: JSON.parse(window.localStorage.getItem('_digi_user') || '{}'),
		});
		// get cart items from localStorage
		const cartItems = JSON.parse(
			window.localStorage.getItem('_digi_cart') || '[]'
		);
		cartDispatch({ type: 'GET_CART_ITEMS', payload: cartItems });
		return;
	}, []);

	axios.interceptors.response.use(
		function (response) {
			// any status code that lie within the range of 2XX cause this function
			// to trigger
			return response;
		},
		function (error) {
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
		<Context.Provider value={{ state, dispatch, cartItems, cartDispatch }}>
			{children}
		</Context.Provider>
	);
};

export { Context, Provider };
