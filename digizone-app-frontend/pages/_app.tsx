import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, SSRProvider } from 'react-bootstrap';
import TopHead from '../components/shared/TopHead';
import Heading from '../components/shared/Heading';
import Footer from '../components/shared/Footer';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<SSRProvider>
				<Heading />
				<Container>
					<ToastProvider>
						<TopHead />
						<Component {...pageProps} />
						<Footer />
					</ToastProvider>
				</Container>
			</SSRProvider>
		</Provider>
	);
}

export default MyApp;