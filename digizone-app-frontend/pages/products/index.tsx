import styles from '../../styles/Product.module.css';
import type { NextPage } from 'next';
import {
	Badge,
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	ListGroup,
	Modal,
	Row,
} from 'react-bootstrap';
import BreadcrumbDisplay from '../../components/shared/BreadcrumbDisplay';
import PaginationDisplay from '../../components/shared/PaginationDisplay';
import StarRatingComponent from 'react-star-rating-component';
import { PlusCircle } from 'react-bootstrap-icons';

const Products: NextPage = () => {
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
					<Button variant='primary' className='btnAddProduct'>
						<PlusCircle className='btnAddProductIcon' />
						Add Product
					</Button>
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
						{Array.from({ length: 15 }).map((_, idx) => (
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
										<Button variant='outline-dark' className='viewProdBtn'>
											View Details
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
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

export default Products;
