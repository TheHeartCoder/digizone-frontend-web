import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BreadcrumbDisplay from '../components/shared/BreadcrumbDisplay';

const ContactUs = () => {
	return (
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
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Comments</Form.Label>
						<Form.Control as='textarea' rows={3} />
					</Form.Group>
				</Form>
			</Col>
			<Col sm={4}>
        <br />
				Please note that we’re currently operating with limited staff and we
				might not be able to respond as quickly as we used to do.
				<li>Please be patient while you wait for a response. </li>
				<li>If you have any questions, please contact us</li>
			</Col>
		</Row>
	);
};

export default ContactUs;
