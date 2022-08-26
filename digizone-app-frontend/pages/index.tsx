import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge, Button, Card, Container } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import StarRatingComponent from 'react-star-rating-component';
import Router from 'next/router';
import axios from 'axios';

interface Props {
	products: Record<string, any>;
}
const Home: NextPage<Props> = ({ products }) => {
	return (
		<>
			<h3 className={styles.productCats}>Latest Products</h3>
			<Row xs={1} md={4} className='g-4'>
				{Array.from({ length: 4 }).map((_, idx) => (
					// eslint-disable-next-line react/jsx-key
					<Col>
						<Card className='productCard'>
							<Card.Img
								variant='top'
								src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
							/>
							<Card.Body>
								<Card.Title>Microsoft Window 10</Card.Title>
								<StarRatingComponent
									name='rate2'
									editing={false}
									starCount={5}
									value={4}
								/>
								<Card.Text>
									<span className='priceText'>₹949.00 - ₹1699.00</span>
								</Card.Text>
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<br />
								<Button variant='outline-dark' className='viewProdBtn'>
									View Details
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<hr />
			<h3 className={styles.productCats}>Top Rated Products</h3>
			<Row xs={1} md={4} className='g-4'>
				{Array.from({ length: 8 }).map((_, idx) => (
					// eslint-disable-next-line react/jsx-key
					<Col>
						<Card className='productCard'>
							<Card.Img
								variant='top'
								src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
							/>
							<Card.Body>
								<Card.Title>Microsoft Window 10</Card.Title>
								<StarRatingComponent
									name='rate2'
									editing={false}
									starCount={5}
									value={4}
								/>
								<Card.Text>
									<span className='priceText'>
										<span className='priceText'>₹949.00 - ₹1699.00</span>
									</span>
								</Card.Text>
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<br />
								<Button variant='outline-dark' className='viewProdBtn'>
									View Details
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<Row>
				<Col>
					<Button
						variant='primary'
						className={styles.viewMoreBtn}
						onClick={() => Router.push('/products')}
					>
						View More
					</Button>
				</Col>
			</Row>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
): Promise<any> => {
	try {
		const { data } = await axios.get('http://localhost:3100/api/v1/products');
		return {
			props: {
				products: data?.result?.products || {},
			},
		};
	} catch (error) {
		console.log(error);
	}
};

export default Home;
