import requests, { resposnePayload } from './api';
import queryString from 'query-string';

// create product service
export const Products = {
	// get products for customer
	getProducts: async (
		filter: Record<string, any>,
		serverSide: boolean = false
	): Promise<resposnePayload> => {
		const url = queryString.stringifyUrl({
			url: serverSide ? '' : '/products',
			query: filter,
		});
		const getProductRes = await requests.get(url);
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
	updateProduct: async (
		id: string,
		product: Record<string, any>
	): Promise<resposnePayload> => {
		const updateProductRes = await requests.patch('/products/' + id, product);
		return updateProductRes;
	},

	// upload product image
	uploadProductImage: async (
		id: string,
		image: any
	): Promise<resposnePayload> => {
		const uploadProductImageRes = await requests.put(
			'/products/' + id + '/image',
			image
		);
		return uploadProductImageRes;
	},

	// add sku details for an product
	addSku: async (
		productId: string,
		sku: Record<string, any>
	): Promise<resposnePayload> => {
		const addSkuRes = await requests.post(
			'/products/' + productId + '/skus',
			sku
		);
		return addSkuRes;
	},

	// update sku details for an product
	updateSku: async (
		productId: string,
		skuId: string,
		sku: Record<string, any>
	): Promise<resposnePayload> => {
		const updateSkuRes = await requests.put(
			'/products/' + productId + '/skus/' + skuId,
			sku
		);
		return updateSkuRes;
	},

	// delete sku details for an product
	deleteSku: async (
		productId: string,
		skuId: string
	): Promise<resposnePayload> => {
		const deleteSkuRes = await requests.delete(
			'/products/' + productId + '/skus/' + skuId
		);
		return deleteSkuRes;
	},
};
