import React from 'react';
import {
	Button,
	Card,
	Dropdown,
	DropdownButton,
	Form,
	Nav,
	Tab,
	Table,
} from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

const MyAccount = () => {
	return (
		<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
			<Row>
				<Col sm={3}>
					<Nav variant='pills' className='flex-column'>
						<Nav.Item>
							<Nav.Link eventKey='first' href='#'>
								Account Details
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='second' href='#'>
								All Orders
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='third' href='#'>
								Support tickets
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='third' href='#'>
								Logout
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
				<Col sm={9}>
					<Tab.Content>
						<Tab.Pane eventKey='first'>
							{' '}
							<Card>
								<Card.Header>Register</Card.Header>
								<Card.Body>
									<Form>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>Full name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Enter your full name'
											/>
										</Form.Group>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>Email address</Form.Label>
											<Form.Control
												type='email'
												placeholder='name@example.com'
											/>
										</Form.Group>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>Current Password</Form.Label>
											<Form.Control
												type='password'
												placeholder='Enter your password'
											/>
										</Form.Group>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>New Password</Form.Label>
											<Form.Control
												type='password'
												placeholder='Enter your new password'
											/>
										</Form.Group>
										<Form.Group
											className='mb-3'
											controlId='exampleForm.ControlInput1'
										>
											<Form.Label>Re-type Password</Form.Label>
											<Form.Control
												type='password'
												placeholder='Re-type your password'
											/>
										</Form.Group>
										<Form.Group className='mb-3'>
											<Button variant='info' type='submit' className='btnAuth'>
												Update
											</Button>
										</Form.Group>
									</Form>
								</Card.Body>
							</Card>
						</Tab.Pane>
						<Tab.Pane eventKey='second'>
							<Row>
								<DropdownButton
									variant='outline-secondary'
									title='Filter by status'
									id='input-group-dropdown-2'
								>
									<Dropdown.Item href='#'>Pending</Dropdown.Item>
									<Dropdown.Item href='#'>Placed</Dropdown.Item>
									<Dropdown.Item href='#'>Confirmed</Dropdown.Item>
									<Dropdown.Item href='#'>Shipped</Dropdown.Item>
									<Dropdown.Item href='#'>Completed</Dropdown.Item>
								</DropdownButton>
							</Row>
							<Table responsive>
								<thead>
									<tr>
										<th>Order ID</th>
										<th>Order Date</th>
										<th>Order Status</th>
										<th>Order Total</th>
										<th>Order Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>
											<Button variant='outline-dark'>View Order Details</Button>
										</td>
									</tr>
									<tr>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>
											<Button variant='outline-dark'>View Order Details</Button>
										</td>
									</tr>
									<tr>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>
											<Button variant='outline-dark'>View Order Details</Button>
										</td>
									</tr>
									<tr>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>Table cell </td>
										<td>
											<Button variant='outline-dark'>View Order Details</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</Tab.Pane>
						<Tab.Pane eventKey='third'>
							<div>
								<Button variant='outline-info' className='addReview'>
									Add review
								</Button>
								<div className='reviewInputZone'>
									<Form>
										<Form.Group className='mb-3' controlId='formBasicEmail'>
											<Form.Label>Your Rating</Form.Label>
											<br />
											<StarRatingComponent
												name='rate2'
												editing={true}
												starCount={5}
												value={0}
											/>
										</Form.Group>
										<Form.Group className='mb-3' controlId='formBasicPassword'>
											<Form.Label>Your Review</Form.Label>
											<Form.Control as='textarea' rows={3} />
										</Form.Group>
										<Form.Group
											className='mb-3'
											controlId='formBasicCheckbox'
										></Form.Group>
										<Button variant='primary' type='submit'>
											Submit
										</Button>
									</Form>
								</div>
							</div>
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MyAccount;
