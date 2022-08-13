import styles from '../../styles/Product.module.css';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import queryString from 'query-string';

import {
	Badge,
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	ListGroup,
	Modal,
	Row,
} from 'react-bootstrap';
import BreadcrumbDisplay from '../../components/shared/BreadcrumbDisplay';
import PaginationDisplay from '../../components/shared/PaginationDisplay';
import StarRatingComponent from 'react-star-rating-component';
import { PlusCircle } from 'react-bootstrap-icons';
import { useContext, useEffect } from 'react';
import { getUserType } from '../../helper/token-helper';
import { useState } from 'react';
import ProductItem from '../../components/Products/ProductItem';
import Link from 'next/link';
import { Products } from '../../services/product.service';
import { useToasts } from 'react-toast-notifications';
import { Context } from '../../context';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
	products: Record<string, any>[];
	metadata: Record<string, any>;
	length: number;
}

const AllProducts: NextPage<Props> = ({ products, metadata, length }) => {
	const { addToast } = useToasts();
	const [userType, setUserType] = useState('customer');
	const router = useRouter();

	const {
		state: { user },
		dispatch,
	} = useContext(Context);

	useEffect(() => {
		if (user && user.email) {
			setUserType(user.type);
		}
	}, [user]);

	console.log(products, metadata, length);

	return (
		<>
			<Row>
				<Col md={8}>
					<BreadcrumbDisplay
						childrens={[
							{
								active: false,
								href: '/',
								text: 'Home',
							},
							{
								active: true,
								href: '',
								text: 'Products',
							},
						]}
					/>
				</Col>
				<Col md={4}>
					<DropdownButton
						variant='outline-secondary'
						title='Sort By'
						id='input-group-dropdown-2'
						className={styles.dropdownBtn}
						onSelect={(e) => {
							if (e) {
								router.query.sort = e;
								router.push(router);
							} else {
								delete router.query.sort;
								router.push(router);
							}
						}}
					>
						<Dropdown.Item href='#' eventKey='-feedbackDetails.avgRating'>
							Rating
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='-createdAt'>
							Latest
						</Dropdown.Item>
					</DropdownButton>
					{userType === 'admin' && (
						<Link href='/products/update-product'>
							<a className='btn btn-primary btnAddProduct'>
								<PlusCircle className='btnAddProductIcon' />
								Add Product
							</a>
						</Link>
					)}
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<Card>
						<Card.Header>Filter By</Card.Header>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<DropdownButton
									variant='outline-secondary'
									title='Category'
									id='input-group-dropdown-1'
									className={styles.dropdownFilterBtn}
									onSelect={(e) => {
										if (e) {
											router.query.category = e;
											router.push(router);
										} else {
											delete router.query.category;
											router.push(router);
										}
									}}
								>
									<Dropdown.Item href='#' eventKey=''>
										Select category
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='Operating System'>
										Operating System
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='Application Software'>
										Application Software
									</Dropdown.Item>
								</DropdownButton>
							</ListGroup.Item>
							<ListGroup.Item>
								<DropdownButton
									variant='outline-secondary'
									title='Platform'
									id='input-group-dropdown-1'
									className={styles.dropdownFilterBtn}
									onSelect={(e) => {
										if (e) {
											router.query.platformType = e;
											router.push(router);
										} else {
											delete router.query.platformType;
											router.push(router);
										}
									}}
								>
									<Dropdown.Item href='#' eventKey=''>
										Select platform
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='Windows'>
										Windows
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='Android'>
										Android
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='iOS'>
										iOS
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='Linux'>
										Linux
									</Dropdown.Item>
									<Dropdown.Item href='#' eventKey='Mac'>
										Mac
									</Dropdown.Item>
								</DropdownButton>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
				<Col sm={10}>
					<Row xs={1} md={3} className='g-3'>
						{products && products.length > 0 ? (
							products.map((product: Record<string, any>) => (
								<ProductItem
									key={product._id as string}
									userType={userType}
									product={product}
								/>
							))
						) : (
							<h1>No Products</h1>
						)}
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<PaginationDisplay metadata={metadata} />
				</Col>
			</Row>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
): Promise<any> => {
	try {
		// get products with axios
		const url = queryString.stringifyUrl({
			url: 'http://localhost:3100/api/v1/products',
			query: context.query,
		});
		const { data } = await axios.get(url);
		return {
			props: {
				products: data?.result?.products || ([] as Record<string, any>[]),
				metadata: data?.result?.metadata || {},
				length: data?.result?.products?.length || 0,
			},
		};
	} catch (error) {
		console.log(error);
	}
};

export default AllProducts;
