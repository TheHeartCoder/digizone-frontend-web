import requests, { resposnePayload } from './api';
import queryString from 'query-string';
// create order service
export const Orders = {
	// checkout session for order
	checkoutSession: async (
		cartItems: Record<string, any>
	): Promise<resposnePayload> => {
		const checkoutSessionRes = await requests.post('/orders/checkout', {
			checkoutDetails: cartItems,
		});
		return checkoutSessionRes;
	},
};
