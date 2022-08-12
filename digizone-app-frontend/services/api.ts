// api skull with axios
import axios, { AxiosResponse } from 'axios';
// allow headers in axios instanse

// interface for response data
export interface resposnePayload {
	success: boolean;
	message: string;
	result: any;
}

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) =>
		axios.get(process.env.NEXT_PUBLIC_BASE_API_PREFIX + url).then(responseBody),
	post: (url: string, body: {}) =>
		axios
			.post(process.env.NEXT_PUBLIC_BASE_API_PREFIX + url, body)
			.then(responseBody),
	put: (url: string, body: {}) =>
		axios
			.put(process.env.NEXT_PUBLIC_BASE_API_PREFIX + url, body)
			.then(responseBody),
	patch: (url: string, body: {}) =>
		axios
			.patch(process.env.NEXT_PUBLIC_BASE_API_PREFIX + url, body)
			.then(responseBody),
	delete: (url: string) =>
		axios
			.delete(process.env.NEXT_PUBLIC_BASE_API_PREFIX + url)
			.then(responseBody),
};
export default requests;
