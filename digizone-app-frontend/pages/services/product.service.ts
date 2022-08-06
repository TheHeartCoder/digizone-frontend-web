import requests, { resposnePayload } from './api';

// create product service
export const Products = {
	// get product details
	getProducts: async (filter: string): Promise<resposnePayload> => {
		const getProductRes = await requests.get('/products' + filter);
		return getProductRes;
	},
	// get product details
	getProduct: async (id: string): Promise<resposnePayload> => {
		const getProductRes = await requests.get('/products/' + id);
		return getProductRes;
	},
	// save product details
	saveProduct: async (
		product: Record<string, any>
	): Promise<resposnePayload> => {
		const saveProductRes = await requests.post('/products', product);
		return saveProductRes;
	},
	// update product details
	updateProduct: async (id: string, product: Record<string, any>): Promise<resposnePayload> => {
		const updateProductRes = await requests.patch('/products/' + id, product);
		return updateProductRes;
	},
};
