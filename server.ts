import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(
	dev
		? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
		: process.env.NEXT_PUBLIC_BASE_API_URL
);
app
	.prepare()
	.then(() => {
		const server = express();

		// apply proxy in dev mode
		console.log('DEV ;;;; ', dev);
		if (dev) {
			server.use('/api', () =>
				createProxyMiddleware({
					target: dev
						? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
						: process.env.NEXT_PUBLIC_BASE_API_URL,
					changeOrigin: true,
				})
			);
		}

		server.all('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(3000, () => {
			console.log(
				`Proxy > Ready on ${
					dev
						? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
						: process.env.NEXT_PUBLIC_BASE_API_URL
				}`
			);
		});

		server.on('error', (err) => {
			console.error(err);
		});
	})
	.catch((err) => {
		console.log('Error', err);
	});
