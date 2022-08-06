import styles from '../../styles/Product.module.css';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
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
import { useEffect } from 'react';
import { getUserType } from '../../helper/token-helper';
import { useState } from 'react';
import ProductItem from '../../components/Products/ProductItem';
import Link from 'next/link';
import { Products } from '../../pages/services/product.service';
import { useToasts } from 'react-toast-notifications';

const AllProducts: NextPage = () => {
	const { addToast } = useToasts();
	const [userType, setUserType] = useState('customer');
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const userRole = getUserType();
		setUserType(userRole === 'admin' ? 'admin' : 'customer');
		fetchProducts({ limit: 12 }, userRole ? userRole : '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchProducts = async (
		query: Record<string, any>,
		userRole: string
	) => {
		try {
			if (!userRole) {
				return false;
			}
			const { success, message, result } =
				userRole === 'admin'
					? await Products.getProductsForAdmin(query)
					: await Products.getProductsForCustomer(query);
			if (!success) console.log(message);
			setProducts(result.products);
		} catch (error: any) {
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	};
	return (
		<>
			<Row>
				<Col md={8}>
					<BreadcrumbDisplay />
				</Col>
				<Col md={4}>
					<DropdownButton
						variant='outline-secondary'
						title='Sort By'
						id='input-group-dropdown-2'
						className={styles.dropdownBtn}
					>
						<Dropdown.Item href='#'>Action</Dropdown.Item>
						<Dropdown.Item href='#'>Another action</Dropdown.Item>
						<Dropdown.Item href='#'>Something else here</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item href='#'>Separated link</Dropdown.Item>
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
								>
									<Dropdown.Item href='#'>Action</Dropdown.Item>
									<Dropdown.Item href='#'>Another action</Dropdown.Item>
									<Dropdown.Item href='#'>Something else here</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href='#'>Separated link</Dropdown.Item>
								</DropdownButton>
							</ListGroup.Item>
							<ListGroup.Item>
								<DropdownButton
									variant='outline-secondary'
									title='Platform'
									id='input-group-dropdown-1'
									className={styles.dropdownFilterBtn}
								>
									<Dropdown.Item href='#'>Action</Dropdown.Item>
									<Dropdown.Item href='#'>Another action</Dropdown.Item>
									<Dropdown.Item href='#'>Something else here</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href='#'>Separated link</Dropdown.Item>
								</DropdownButton>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
				<Col sm={10}>
					<Row xs={1} md={3} className='g-3'>
						{products.length > 0 ? (
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
					<PaginationDisplay />
				</Col>
			</Row>
		</>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const query = context.query as unknown as string;
// 	const productsRes = await Products.getProducts(query);
// 	console.log(productsRes)

// 	return {
// 		props: productsRes, // will be passed to the page component as props
// 	};
// };

export default AllProducts;
