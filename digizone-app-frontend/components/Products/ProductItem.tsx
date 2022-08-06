import Link from 'next/link';
import { FC } from 'react';
import { Button, Card, Col, Badge } from 'react-bootstrap';
import { Eye, Pen, Upload } from 'react-bootstrap-icons';
import StarRatingComponent from 'react-star-rating-component';

interface IProductItemProps {
	userType: string;
	product: Record<string, any>;
}

const ProductItem: FC<IProductItemProps> = ({ userType, product }) => {
	return (
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
						value={3}
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
					{userType === 'admin' ? (
						<div className='btnGrpForProduct'>
							<div className='file btn btn-md btn-outline-primary fileInputDiv'>
								<Upload />
								<input type='file' name='file' className='fileInput' />
							</div>
							<Link href='/products/update-product?productId='>
								<a className='btn btn-outline-dark viewProdBtn'>
									<Pen />
								</a>
							</Link>
							<Link href='/products/update-product'>
								<a className='btn btn-outline-dark viewProdBtn'>
									<Eye />
								</a>
							</Link>
						</div>
					) : (
						<Button variant='outline-dark' className='viewProdBtn'>
							View Details
						</Button>
					)}
				</Card.Body>
			</Card>
		</Col>
	);
};

export default ProductItem;
