import type { GetServerSideProps, NextPage } from 'next';
import {
	Badge,
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
	ListGroup,
	Nav,
	SplitButton,
	Tabs,
} from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import NumericInput from 'react-numeric-input';
import {
	Archive,
	BagCheckFill,
	Check2Circle,
	Eye,
	Pen,
	PersonFill,
} from 'react-bootstrap-icons';
import { Tab } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import CartOffCanvas from '../../components/CartOffCanvas';
import axios from 'axios';
import SkuDetailsList from '../../components/Product/SkuDetailsList';
import { getFormatedStringFromDays } from '../../helper/utils';
import ProductItem from '../../components/Products/ProductItem';
import { Context } from '../../context';

interface ProductProps {
	product: Record<string, any>;
	relatedProducts: Record<string, any>[];
}

const Product: NextPage<ProductProps> = ({ product, relatedProducts }) => {
	const [show, setShow] = useState(false);
	const [allSkuDetails, setAllSkuDetails] = React.useState(
		product?.skuDetails || []
	);

	const [cartForm, setCartForm] = useState({
		skuId: '',
		quantity: 1,
	});

	const {
		cartItems,
		cartDispatch,
		state: { user },
	} = useContext(Context);

	// const handleShow = () => setShow(true);
	const handleCart = () => {
		cartDispatch({
			type: 'ADD_TO_CART',
			payload: {
				skuId: cartForm.skuId,
				quantity: cartForm.quantity,
				validity: product.skuDetails.find(
					(sku: { skuId: string }) => sku.skuId === cartForm.skuId
				),
				price: product.skuDetails.find(
					(sku: { skuId: string }) => sku.skuId === cartForm.skuId
				).price,
				productName: product.name,
				productImage: product.image,
				productId: product._id,
			},
		});
		setShow(true);
	};

	return (
		<>
			<Row className='firstRow'>
				<Col sm={4}>
					<Card className='productImgCard'>
						<Card.Img variant='top' src={product?.image} />
					</Card>
				</Col>
				<Col sm={8}>
					<h2>{product?.productName}</h2>
					<div className='divStar'>
						<StarRatingComponent
							name='rate2'
							editing={false}
							starCount={5}
							value={product?.feedbackDetails?.avgRating || 0}
						/>
						({product?.feedbackDetails?.info?.length || 0} reviews)
					</div>
					<p className='productPrice'>
						{product?.skuDetails && product?.skuDetails?.length > 1
							? `₹${Math.min.apply(
									Math,
									product?.skuDetails.map((sku: { price: number }) => sku.price)
							  )} - ₹${Math.max.apply(
									Math,
									product?.skuDetails.map((sku: { price: number }) => sku.price)
							  )}`
							: `₹${product?.skuDetails?.[0]?.price || '000'}`}{' '}
						<Badge bg='warning' text='dark'>
							2 Years
						</Badge>
					</p>
					<ul>
						{product?.highlights &&
							product?.highlights.length > 0 &&
							product?.highlights.map((highlight: string, key: any) => (
								<li key={key}>{highlight}</li>
							))}
					</ul>
					<div>
						{product?.skuDetails &&
							product?.skuDetails?.length > 0 &&
							product?.skuDetails
								.sort(
									(a: { validity: number }, b: { validity: number }) =>
										a.validity - b.validity
								)
								.map((sku: Record<string, any>, key: any) => (
									<Badge bg='warning' text='dark' className='skuBtn' key={key}>
										{sku.lifetime
											? 'Lifetime'
											: getFormatedStringFromDays(sku.validity)}
									</Badge>
								))}
					</div>
					<div className='productSkuZone'>
						<NumericInput min={1} max={5} value={1} size={5} />
						{/* <Form.Select
							aria-label='Default select example'
							className='selectValidity'
						>
							<option>Select validity</option>
							<option value='1'>One</option>
							<option value='2'>Two</option>
							<option value='3'>Three</option>
						</Form.Select> */}
						{/* {user?.type !== 'admin' && ( */}
						<Button variant='primary' className='cartBtn' onClick={handleCart}>
							<BagCheckFill className='cartIcon' />
							Add to cart
						</Button>
						{/* )} */}
					</div>
				</Col>
			</Row>
			<br />
			<hr />
			<Row>
				<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
					<Row>
						<Col sm={3}>
							<Nav variant='pills' className='flex-column'>
								<Nav.Item>
									<Nav.Link eventKey='first' href='#'>
										Descriptions
									</Nav.Link>
								</Nav.Item>
								{product?.requirmentSpecification &&
									product?.requirmentSpecification.length > 0 && (
										<Nav.Item>
											<Nav.Link eventKey='second' href='#'>
												Requirements
											</Nav.Link>
										</Nav.Item>
									)}

								<Nav.Item>
									<Nav.Link eventKey='third' href='#'>
										Reviews
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='fourth' href='#'>
										Product SKUs
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey='first'>{product?.description}</Tab.Pane>
								<Tab.Pane eventKey='second'>
									<Table responsive>
										<tbody>
											{product?.requirmentSpecification &&
												product?.requirmentSpecification.length > 0 &&
												product?.requirmentSpecification.map(
													(requirement: string, key: any) => (
														<tr key={key}>
															<td width='30%'>
																{Object.keys(requirement)[0]}{' '}
															</td>
															<td width='70%'>
																{Object.values(requirement)[0]}
															</td>
														</tr>
													)
												)}
										</tbody>
									</Table>
								</Tab.Pane>
								<Tab.Pane eventKey='third'>
									<div>
										<Button variant='outline-info' className='addReview'>
											Add review
										</Button>
										<div className='reviewInputZone'>
											<Form>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Label>Your Rating</Form.Label>
													<br />
													<StarRatingComponent
														name='rate2'
														editing={true}
														starCount={5}
														value={0}
													/>
												</Form.Group>
												<Form.Group
													className='mb-3'
													controlId='formBasicPassword'
												>
													<Form.Label>Your Review</Form.Label>
													<Form.Control as='textarea' rows={3} />
												</Form.Group>
												<Form.Group
													className='mb-3'
													controlId='formBasicCheckbox'
												></Form.Group>
												<Button variant='primary' type='submit'>
													Submit
												</Button>
											</Form>
										</div>
										<DropdownButton
											variant='outline-secondary'
											title='Filter by rating'
											id='input-group-dropdown-2'
										>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={5}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={4}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={3}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={2}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={1}
												/>
											</Dropdown.Item>
										</DropdownButton>
										<div className='reviewZone'>
											{' '}
											{[
												'Light',
												'Light',
												'Light',
												'Light',
												'Light',
												'Light',
											].map((variant) => (
												<Card
													bg={variant.toLowerCase()}
													key={variant}
													text={
														variant.toLowerCase() === 'light' ? 'dark' : 'white'
													}
													style={{ width: '100%' }}
													className='mb-2'
												>
													<Card.Header className='reviewHeader'>
														<PersonFill className='personReview' />
														Arindam Paul{' '}
														<StarRatingComponent
															name='rate2'
															editing={false}
															starCount={5}
															value={3}
														/>
													</Card.Header>
													<Card.Body>
														<Card.Text>
															<p className='reviewDt'>20th September 2017</p>
															Some quick example text to build on the card title
															and make up the bulk of the cards content.
														</Card.Text>
													</Card.Body>
												</Card>
											))}
										</div>
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey='fourth'>
									<SkuDetailsList
										skuDetails={allSkuDetails}
										productId={product._id}
										setAllSkuDetails={setAllSkuDetails}
									/>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Row>
			<br />
			<div className='separator'>Related Products</div>
			<br />
			<Row xs={1} md={4} className='g-3'>
				{relatedProducts.map((relatedProduct) => (
					<Col key={relatedProduct._id}>
						<ProductItem product={relatedProduct} userType={'customer'} />
					</Col>
				))}
			</Row>
			<CartOffCanvas setShow={setShow} show={show} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps<ProductProps> = async (
	context
): Promise<any> => {
	try {
		if (!context.params?.id) {
			return {
				props: {
					product: {},
				},
			};
		}
		const { data } = await axios.get(
			'http://localhost:3100/api/v1/products/' + context.params?.id
		);
		return {
			props: {
				product: data?.result?.product || ({} as Record<string, any>),
				relatedProducts:
					data?.result?.relatedProducts ||
					([] as unknown as Record<string, any[]>),
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				product: {},
			},
		};
	}
};

export default Product;
