import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Button, Card, Col, Badge } from 'react-bootstrap';
import { Eye, Pen, Trash, Upload } from 'react-bootstrap-icons';
import StarRatingComponent from 'react-star-rating-component';
import { useToasts } from 'react-toast-notifications';
import { isArray } from 'util';
import { Products } from '../../services/product.service';

interface IProductItemProps {
	userType: string;
	product: Record<string, any>;
}

const ProductItem: FC<IProductItemProps> = ({ userType, product }) => {
	const { addToast } = useToasts();
	const router = useRouter();
	const deleteProduct = async () => {
		try {
			const deleteConfirm = confirm(
				'Want to delete? You will lost all details, skus and licences for this product'
			);
			if (deleteConfirm) {
				const deleteProductRes = await Products.deleteProduct(product._id);
				if (!deleteProductRes.success) {
					throw new Error(deleteProductRes.message);
				}
				router.push('/products/');
				addToast(deleteProductRes.message, {
					appearance: 'success',
					autoDismiss: true,
				});
			}
		} catch (error: any) {
			if (error.response) {
				if (
					isArray(error.response.data?.message) &&
					error.response.data?.message?.length > 0
				) {
					return error.response.data.message.forEach((message: any) => {
						addToast(message, { appearance: 'error', autoDismiss: true });
					});
				} else {
					return addToast(error.response.data.message, {
						appearance: 'error',
						autoDismiss: true,
					});
				}
			}
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		}
	};
	return (
		// eslint-disable-next-line react/jsx-key
		<Col>
			<Card className='productCard'>
				<Card.Img variant='top' src={product?.image} />
				<Card.Body>
					<Card.Title>{product.productName}</Card.Title>
					<StarRatingComponent
						name='rate2'
						editing={false}
						starCount={5}
						value={product?.feedbackDetails?.avgRating || 0}
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
							<Link href={`/products/update-product?productId=${product?._id}`}>
								<a className='btn btn-outline-dark viewProdBtn'>
									<Pen />
								</a>
							</Link>
							<Button
								variant='outline-dark'
								className='btn btn-outline-dark viewProdBtn'
								onClick={() => deleteProduct(product._id)}
							>
								<Trash />
							</Button>
							<Link href={`/products/${product?._id}`}>
								<a className='btn btn-outline-dark viewProdBtn'>
									<Eye />
								</a>
							</Link>
						</div>
					) : (
						<Link href={`/products/${product?._id}`}>
							<a className='btn btn-outline-dark viewProdBtn'>
								<Eye />
								View Details
							</a>
						</Link>
					)}
				</Card.Body>
			</Card>
		</Col>
	);
};

export default ProductItem;
