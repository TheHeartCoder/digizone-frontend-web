import React from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import BreadcrumbDisplay from '../components/shared/BreadcrumbDisplay';

const Checkout = () => {
	return (
		<>
			{' '}
			<Row>
				<Col sm={8}>
					<BreadcrumbDisplay />
					<br />
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Full name</Form.Label>
							<Form.Control type='text' placeholder='Enter your full name' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Email address</Form.Label>
							<Form.Control type='email' placeholder='name@example.com' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Phone no</Form.Label>
							<Form.Control type='tel' placeholder='Enter your phone number' />
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Billing Address</Form.Label>
							<Form.Control as='textarea' rows={3} />
						</Form.Group>
					</Form>
				</Col>
				<Col sm={4}>
					{' '}
					<div className='cartBody'>
						<div className='cartItems'>
							<div className='itemTitle'>
								<Image
									height={50}
									width={50}
									roundedCircle={true}
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
									alt=''
								/>
								<p style={{ marginLeft: '5px' }}>
									Windows 10 Home License Key 32-Bit asfdsaf das fsdf sag afsg
									as
									<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
								</p>
							</div>
						</div>
						<div className='cartItems'>
							<div className='itemTitle'>
								<Image
									height={50}
									width={50}
									roundedCircle={true}
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
									alt=''
								/>
								<p style={{ marginLeft: '5px' }}>
									Windows 10 Home License Key 32-Bit asfdsaf das fsdf sag afsg
									as
									<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
								</p>
							</div>
						</div>
						<div className='cartItems'>
							<div className='itemTitle'>
								<Image
									height={50}
									width={50}
									roundedCircle={true}
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
									alt=''
								/>
								<p style={{ marginLeft: '5px' }}>
									Windows 10 Home License Key 32-Bit asfdsaf das fsdf sag afsg
									as
									<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
								</p>
							</div>
						</div>
					</div>
					<hr />
					<div className='calPlace'>
						<p className='cartTotal' style={{ textAlign: 'end' }}>
							Total: ₹900
						</p>
						<Button variant='primary' style={{ width: '100%' }}>
							Place Order
						</Button>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Checkout;
