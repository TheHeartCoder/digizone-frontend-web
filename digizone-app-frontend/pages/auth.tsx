import React from 'react';
import { Button } from 'react-bootstrap';
import { Card, Col, Form, Row } from 'react-bootstrap';

const Auth = () => {
	return (
		<Row>
			<Col sm={6}>
				<Card>
					<Card.Header>Login</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group
								className='mb-3'
								controlId='exampleForm.ControlInput1'
							>
								<Form.Label>Email address</Form.Label>
								<Form.Control type='email' placeholder='name@example.com' />
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='exampleForm.ControlInput1'
							>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter your password'
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Button variant='info' type='submit' className='btnAuth'>
									Login
								</Button>
							</Form.Group>
						</Form>
						<a style={{ textDecoration: 'none' }} href=''>
							Forgot your password?
						</a>
					</Card.Body>
				</Card>
			</Col>
			<Col sm={6}>
				<Card>
					<Card.Header>Register</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group
								className='mb-3'
								controlId='exampleForm.ControlInput1'
							>
								<Form.Label>Full name</Form.Label>
								<Form.Control type='text' placeholder='Enter your full name' />
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='exampleForm.ControlInput1'
							>
								<Form.Label>Email address</Form.Label>
								<Form.Control type='email' placeholder='name@example.com' />
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='exampleForm.ControlInput1'
							>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Enter your password'
								/>
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='exampleForm.ControlInput1'
							>
								<Form.Label>Re-type password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Re-type your password'
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Button variant='info' type='submit' className='btnAuth'>
									Register
								</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default Auth;
