import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import {
	Button,
	Card,
	Form,
	InputGroup,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Archive, Check2Circle, Pen } from 'react-bootstrap-icons';
import { Table } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { Products } from '../../services/product.service';
import axios from 'axios';
import Link from 'next/link';

const initialForm = {
	productName: '' as string,
	description: '' as string,
	category: '' as string,
	platformType: '' as string,
	baseType: '' as string,
	productUrl: '' as string,
	requirmentSpecification: [] as Record<string, string>[],
	highlights: [] as string[],
	downloadUrl: '' as string,
};

interface ProductProps {
	product: Record<string, any>;
	productIdForUpdate: string;
}

const UpdateProduct: NextPage<ProductProps> = ({
	product,
	productIdForUpdate,
}) => {
	const { addToast } = useToasts();
	const [productForm, setProductForm] = React.useState(initialForm);
	const [requirementName, setRequirementName] = React.useState('');
	const [requirementDescription, setRequirementDescription] =
		React.useState('');
	const [hightlight, setHightlight] = React.useState('');
	const [updateRequirementIndex, setUpdateRequirementIndex] =
		React.useState(-1);
	const [updateHightlightIndex, setUpdateHightlightIndex] = React.useState(-1);
	const [isLoading, setIsLoading] = React.useState(false);

	useEffect(() => {
		if (product && product.productName) {
			setProductForm({ ...initialForm, ...product });
		}
	}, [product]);

	const hanldleHightlightAdd = () => {
		if (updateHightlightIndex > -1) {
			setProductForm({
				...productForm,
				highlights: productForm.highlights.map((value, index) => {
					if (index === updateHightlightIndex) {
						return hightlight;
					}
					return value;
				}),
			});
		} else {
			setProductForm({
				...productForm,
				highlights: [...productForm.highlights, hightlight],
			});
		}
		setHightlight('');
		setUpdateHightlightIndex(-1);
	};

	const handleRequirementAdd = () => {
		if (updateRequirementIndex > -1) {
			setProductForm({
				...productForm,
				requirmentSpecification: productForm.requirmentSpecification.map(
					(requirement, index) => {
						if (index === updateRequirementIndex) {
							return {
								[requirementName]: requirementDescription,
							};
						} else {
							return requirement;
						}
					}
				),
			});
		} else {
			setProductForm({
				...productForm,
				requirmentSpecification: [
					...productForm.requirmentSpecification,
					{
						[requirementName]: requirementDescription,
					},
				],
			});
		}

		setRequirementName('');
		setRequirementDescription('');
		setUpdateRequirementIndex(-1);
	};

	const handlerSubmitForm = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		try {
			setIsLoading(true);
			productIdForUpdate
				? await Products.updateProduct(productIdForUpdate, productForm)
				: await Products.saveProduct(productForm);
			addToast('Product saved successfully', {
				appearance: 'success',
				autoDismiss: true,
			});
			setProductForm(initialForm);
		} catch (error: any) {
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} finally {
			setIsLoading(false);
		}
		e.preventDefault();
	};

	return (
		<Card
			className='updateProductCard'
			style={{ padding: '15px', marginTop: '20px' }}
		>
			<Row>
				<h4 className='text-center productFormHeading'>Product Details Form</h4>
				<hr />
				<Col>
					<Form>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Product Name'
								value={productForm.productName}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setProductForm({
										...productForm,
										productName: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Product Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={5}
								placeholder='Enter Product Description'
								value={productForm.description}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setProductForm({
										...productForm,
										description: e.target.value,
									})
								}
							/>
						</Form.Group>
						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Product Requirements</Form.Label>
							<InputGroup className='mb-3'>
								<Form.Control
									as='textarea'
									rows={2}
									placeholder='Enter Requirement Name'
									value={requirementName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setRequirementName(e.target.value)
									}
								/>
								<Form.Control
									as='textarea'
									rows={2}
									placeholder='Enter Requirement Description'
									value={requirementDescription}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setRequirementDescription(e.target.value)
									}
								/>
								<Button
									variant='outline-secondary'
									onClick={handleRequirementAdd}
								>
									<Check2Circle />
								</Button>
							</InputGroup>
						</Form.Group>
						<div>
							<p style={{ color: '#10557a' }}>Requirements are listed here:</p>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Description</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{productForm.requirmentSpecification.length > 0 ? (
										productForm.requirmentSpecification.map((item, index) => (
											<tr key={index}>
												<td>{Object.keys(item)[0]}</td>
												<td>{Object.values(item)[0]}</td>
												<td>
													<Button
														variant='secondary'
														size='sm'
														style={{ marginRight: '4px' }}
														onClick={() => {
															setUpdateRequirementIndex(index);
															setRequirementName(Object.keys(item)[0]);
															setRequirementDescription(Object.values(item)[0]);
														}}
													>
														<Pen />
													</Button>
													<Button
														variant='danger'
														size='sm'
														onClick={(
															e: React.MouseEvent<HTMLButtonElement, MouseEvent>
														) => {
															e.preventDefault();
															setProductForm({
																...productForm,
																requirmentSpecification:
																	productForm.requirmentSpecification.filter(
																		(item, key) => key !== index
																	),
															});
															setRequirementDescription('');
															setRequirementName('');
														}}
													>
														<Archive />
													</Button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={3} className='text-center'>
												No Requirements
											</td>
										</tr>
									)}
								</tbody>
							</Table>
						</div>
					</Form>
				</Col>
				<Col>
					<Form>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Product Category</Form.Label>
							<Form.Select
								aria-label='Default select example'
								value={productForm.category}
								onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
									const value = event.target.value;
									setProductForm({
										...productForm,
										category: value as string,
									});
								}}
							>
								<option value=''>Choose the category</option>
								<option value='Operating System'>Operating System</option>
								<option value='Application Software'>
									Application Software
								</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Platform Type</Form.Label>
							<Form.Select
								aria-label='Default select example'
								value={productForm.platformType}
								onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
									const value = event.target.value;
									setProductForm({
										...productForm,
										platformType: value as string,
									});
								}}
							>
								<option value=''>Choose the platform type</option>
								<option value='Windows'>Windows</option>
								<option value='Android'>iOS</option>
								<option value='Linux'>Linux</option>
								<option value='Mac'>Mac</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Base Type</Form.Label>
							<Form.Select
								aria-label='Default select example'
								value={productForm.baseType}
								onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
									const value = event.target.value;
									setProductForm({
										...productForm,
										baseType: value as string,
									});
								}}
							>
								<option>Choose the base type</option>
								<option value='Computer'>Computer</option>
								<option value='Mobile'>Mobile</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product URL</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Product URL'
								value={productForm.productUrl}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const value = event.target.value;
									setProductForm({
										...productForm,
										productUrl: value as string,
									});
								}}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product Download URL</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Product Download URL'
								value={productForm.downloadUrl}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const value = event.target.value;
									setProductForm({
										...productForm,
										downloadUrl: value as string,
									});
								}}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product Highlights</Form.Label>
							<InputGroup className='mb-3'>
								<Form.Control
									type='text'
									placeholder='Enter Product Highlight'
									value={hightlight}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setHightlight(event.target.value);
									}}
									onKeyPress={(
										event: React.KeyboardEvent<HTMLInputElement>
									) => {
										if (event.charCode === 13 || event.which === 13) {
											hanldleHightlightAdd();
										}
									}}
								/>
								<Button variant='secondary' onClick={hanldleHightlightAdd}>
									<Check2Circle />
								</Button>
							</InputGroup>
						</Form.Group>
						<p style={{ color: '#10557a' }}>
							Product highlights are listed below:
						</p>
						<ListGroup>
							{productForm.highlights.length > 0 ? (
								productForm.highlights.map((highlight, index) => (
									<ListGroup.Item key={index}>
										{highlight}
										<span style={{ float: 'right' }}>
											<Pen
												className='pointer'
												onClick={() => {
													setHightlight(highlight);
													console.log(index);
													setUpdateHightlightIndex(index);
												}}
											/>{' '}
											&nbsp;&nbsp;
											<Archive
												className='pointer'
												onClick={() => {
													setProductForm({
														...productForm,
														highlights: productForm.highlights.filter(
															(highlight, key) => key !== index
														),
													});
													setHightlight('');
												}}
											/>
										</span>
									</ListGroup.Item>
								))
							) : (
								<ListGroup.Item className='text-center'>
									No Highlights
								</ListGroup.Item>
							)}
						</ListGroup>
					</Form>
				</Col>
			</Row>
			<br />
			<Row>
				<Col></Col>
				<Col style={{ textAlign: 'end' }}>
					<Link href={`/products`}>
						<Button variant='secondary'>Back</Button>
					</Link>{' '}
					<Button
						variant='info'
						onClick={(
							event: React.MouseEvent<HTMLButtonElement, MouseEvent>
						) => {
							event.preventDefault();
							setProductForm(initialForm);
						}}
					>
						Cancel
					</Button>{' '}
					<Button
						variant='primary'
						type='submit'
						onClick={handlerSubmitForm}
						disabled={isLoading}
					>
						{isLoading && (
							<span
								className='spinner-border spinner-border-sm'
								role='status'
								aria-hidden='true'
							></span>
						)}
						Submit
					</Button>
				</Col>{' '}
			</Row>
		</Card>
	);
};
export const getServerSideProps: GetServerSideProps<ProductProps> = async (
	context
): Promise<any> => {
	try {
		if (!context.query?.productId) {
			return {
				props: {
					product: {},
				},
			};
		}
		const { data } = await axios.get(
			`${
				process.env.NODE_ENV !== 'production'
					? process.env.NEXT_PUBLIC_BASE_API_URL_LOCAL
					: process.env.NEXT_PUBLIC_BASE_API_URL
			}/products/` + context.query?.productId
		);
		return {
			props: {
				product: data?.result?.product || ({} as Record<string, any>),
				productIdForUpdate: context.query?.productId,
			},
		};
	} catch (error) {
		return {
			props: {
				product: {},
			},
		};
	}
};

export default UpdateProduct;
