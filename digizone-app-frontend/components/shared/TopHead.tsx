import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Badge } from 'react-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { CartFill, PersonSquare, Search } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.module.css';
import Router from 'next/router';

const TopHead = () => {
	return (
		<>
			<Row className='mt-3'>
				<Col xs={6} md={3}>
					<h3 className={styles.logoHeading} onClick={() => Router.push('/')}>
						Digizone
					</h3>
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
						onClick={() => {
							Router.push('/my-account');
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
						<Nav.Link onClick={() => Router.push('/')}>Home</Nav.Link>
						<NavDropdown title='Applications' id='collasible-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>Computer</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>Mobile</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link className={styles.cartItems}>
							Items: <Badge bg='secondary'>3</Badge> (Rs. 250.00)
						</Nav.Link>
						<Nav.Link href='#deets'>Checkout</Nav.Link>
						<Nav.Link eventKey={2} href='#memes'>
							Contact Us
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default TopHead;
