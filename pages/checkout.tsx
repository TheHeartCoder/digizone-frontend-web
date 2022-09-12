import React from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import CartItems from '../components/CartItems';
import BreadcrumbDisplay from '../components/shared/BreadcrumbDisplay';
import validator from 'validator';

const Checkout = () => {
	const [billingForm, setBillingForm] = React.useState({
		name: '',
		email: '',
		phone: '',
		address: '',
	});
	const placeOrder = () => {
		try {
			const { name, email, phone, address } = billingForm;
			if (!validator.isEmail(email)) {
				throw new Error('Invalid email');
			}
			alert('Order placed successfully');
		} catch (error: any) {
			alert(error.message);
		}
	};
	return (
		<>
			{' '}
			<Row>
				<BreadcrumbDisplay />
				<Col sm={8}>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Full name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your full name'
								onChange={(e) =>
									setBillingForm({ ...billingForm, name: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='name@example.com'
								onChange={(e) =>
									setBillingForm({ ...billingForm, email: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Phone no</Form.Label>
							<Form.Control
								type='tel'
								placeholder='Enter your phone number'
								onChange={(e) =>
									setBillingForm({ ...billingForm, phone: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Billing Address</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								onChange={(e) =>
									setBillingForm({ ...billingForm, address: e.target.value })
								}
							/>
						</Form.Group>
					</Form>
				</Col>
				<Col sm={4}>
					<CartItems rmvdeleteBtn={true} />
					<Button
						variant='primary'
						style={{ width: '100%' }}
						onClick={placeOrder}
					>
						Place Order
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default Checkout;
