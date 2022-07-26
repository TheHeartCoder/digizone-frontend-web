import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, SSRProvider } from 'react-bootstrap';
import TopHead from '../components/shared/TopHead';
import Heading from '../components/shared/Heading';
import Footer from '../components/shared/Footer';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		// <SSRProvider>
		<>
			<Heading />
			<Container>
				<TopHead />
				<Component {...pageProps} />
				<Footer />
			</Container>
		</>
		// </SSRProvider>
	);
}

export default MyApp;
