import type { NextPage } from 'next';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
	Button,
	Card,
	Container,
	Nav,
	Navbar,
	NavDropdown,
} from 'react-bootstrap';
import { CartFill, PersonSquare, Search } from 'react-bootstrap-icons';
import styles from '../styles/Home.module.css';
import Heading from '../components/shared/Heading';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Badge } from 'react-bootstrap';
const Home: NextPage = () => {
	return (
		<div>
			<Heading />
			<Container>
				<Row className='mt-3'>
					<Col xs={6} md={3}>
						<h3 className={styles.logoHeading}>Digizone</h3>
					</Col>
					<Col xs={6} md={6}>
						{' '}
						<InputGroup>
							<InputGroup.Text id='inputGroup-sizing-default'>
								<Search />
							</InputGroup.Text>
							<Form.Control
								aria-label='Default'
								aria-describedby='inputGroup-sizing-default'
								placeholder='Search the product here...'
							/>
						</InputGroup>
					</Col>
					<Col xs={6} md={3}>
						<CartFill
							height='40'
							width='40'
							color='#4c575f'
							className={styles.personIcon}
						/>
						<PersonSquare
							height='40'
							width='40'
							color='#4c575f'
							className={styles.personIcon}
						/>
					</Col>
				</Row>
				<Navbar
					collapseOnSelect
					expand='lg'
					bg='light'
					variant='light'
					color='#4c575f'
				>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='#features'>Home</Nav.Link>
							<NavDropdown title='Applications' id='collasible-nav-dropdown'>
								<NavDropdown.Item href='#action/3.1'>Computer</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.2'>Mobile</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							<Nav.Link className={styles.cartItems}>
								Items: 3 (Rs. 250.00)
							</Nav.Link>
							<Nav.Link href='#deets'>Checkout</Nav.Link>
							<Nav.Link eventKey={2} href='#memes'>
								Contact Us
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<h3 className={styles.productCats}>Latest Products</h3>
				<Row xs={1} md={4} className='g-4'>
					{Array.from({ length: 4 }).map((_, idx) => (
						// eslint-disable-next-line react/jsx-key
						<Col>
							<Card>
								<Card.Img
									variant='top'
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
								/>
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<Card.Text>
										This is a longer card with supporting text below as a
										natural lead-in to additional content. This content is a
										little bit longer.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				<hr />
				<h3 className={styles.productCats}>Hot Selling Products</h3>
				<Row xs={1} md={4} className='g-4'>
					{Array.from({ length: 8 }).map((_, idx) => (
						// eslint-disable-next-line react/jsx-key
						<Col>
							<Card>
								<Card.Img
									variant='top'
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
								/>
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<Card.Text>
										This is a longer card with supporting text below as a
										natural lead-in to additional content. This content is a
										little bit longer.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default Home;
