import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Badge, Button } from 'react-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle, Search } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Context } from '../../context';
import CartOffCanvas from '../CartOffCanvas';

const TopHead = () => {
	const [show, setShow] = React.useState(false);
	const [searchText, setSearchText] = React.useState('');

	const [baseType, setBaseType] = React.useState('Applications');

	const {
		state: { user },
		cartItems,
	} = useContext(Context);

	const router = useRouter();

	const search = () => {
		router.push(`/products?search=${searchText}`);
	};

	return (
		<>
			<Row className='mt-3'>
				<Col xs={6} md={4}>
					<h3 className={styles.logoHeading} onClick={() => router.push('/')}>
						Digizone
					</h3>
				</Col>
				<Col xs={6} md={4}>
					{' '}
					<InputGroup>
						<InputGroup.Text id='inputGroup-sizing-default'>
							<Search />
						</InputGroup.Text>
						<Form.Control
							aria-label='Default'
							aria-describedby='inputGroup-sizing-default'
							placeholder='Search the product here...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && search()}
						/>
						<Button
							variant='outline-success'
							id='button-addon2'
							onClick={() => search()}
						>
							Search
						</Button>
					</InputGroup>
				</Col>
				<Col xs={6} md={4}>
					{/* <CartFill
						height='40'
						width='40'
						color='#4c575f'
						className={styles.personIcon}
					/> */}
					<PersonCircle
						height='40'
						width='40'
						color='#4c575f'
						className={styles.personIcon}
						onClick={() => {
							if (user && user.email) {
								router.push('/my-account');
							} else {
								router.push('/auth');
							}
						}}
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
						<Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
						<NavDropdown
							title={baseType}
							id='collasible-nav-dropdown'
							onSelect={(e) => {
								setBaseType(e as string);
								e === 'Applications'
									? router.push('/products')
									: router.push(`/products?baseType=${e}`);
							}}
						>
							<NavDropdown.Item eventKey='Computer' onClick={() => {}}>
								Computer
							</NavDropdown.Item>
							<NavDropdown.Item eventKey='Mobile'>Mobile</NavDropdown.Item>
							<NavDropdown.Item eventKey='Applications'>All</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link
							className={styles.cartItems}
							onClick={() => setShow(true)}
						>
							Items: <Badge bg='secondary'>{cartItems.length}</Badge> (₹
							{cartItems
								.map(
									(item: { quantity: number; price: number }) =>
										Number(item.price) * Number(item.quantity)
								)
								.reduce((a: number, b: number) => a + b, 0)}
							)
						</Nav.Link>
						{/* <Nav.Link href='#deets'>Checkout</Nav.Link> */}
						<Nav.Link eventKey={2} href='#memes'>
							{/* Contact Us */}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<CartOffCanvas setShow={setShow} show={show} />
		</>
	);
};

export default TopHead;
