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

	// find order
	getAllOrders: async (status?: string): Promise<resposnePayload> => {
		const findOrderRes = await requests.get(
			status ? `/orders?status=${status}` : `/orders`
		);
		return findOrderRes;
	},

	// get an order
	getOrder: async (orderId: string): Promise<resposnePayload> => {
		const getOrderRes = await requests.get(`/orders/${orderId}`);
		return getOrderRes;
	}
};
