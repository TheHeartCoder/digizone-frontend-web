import React from 'react';
import type { NextPage } from 'next';
import {
	Button,
	Card,
	Form,
	InputGroup,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Archive, Check2Circle, Pen } from 'react-bootstrap-icons';
import { Badge } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

const UpdateProduct: NextPage = () => {
	return (
		<Card className='updateProductCard' style={{ padding: '15px', marginTop: '20px' }}>
			<Row>
				<Col>
					<Form>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product Name</Form.Label>
							<Form.Control type='text' placeholder='Enter Product Name' />
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Product Description</Form.Label>
							<Form.Control as='textarea' rows={5} />
						</Form.Group>
						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Product Image</Form.Label>
							<Form.Control type='file' />
						</Form.Group>
						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Product Requirements</Form.Label>
							<InputGroup className='mb-3'>
								<Form.Control as='textarea' rows={2} />
								<Form.Control as='textarea' rows={2} />
								<Button variant='outline-secondary'>
									<Check2Circle />
								</Button>
							</InputGroup>
						</Form.Group>
						<div>
							<p style={{ color: '#10557a' }}>Requirements are listed here:</p>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Description</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Requirement 1</td>
										<td>
											<Button
												variant='secondary'
												size='sm'
												style={{ marginRight: '4px' }}
											>
												<Pen />
											</Button>
											<Button variant='danger' size='sm'>
												<Archive />
											</Button>
										</td>
									</tr>
									<tr>
										<td>1</td>
										<td>Requirement 1</td>
										<td>
											<Button
												variant='secondary'
												size='sm'
												style={{ marginRight: '4px' }}
											>
												<Pen />
											</Button>
											<Button variant='danger' size='sm'>
												<Archive />
											</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</Form>
				</Col>
				<Col>
					<Form>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Product Category</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option>Open this select menu</option>
								<option value='1'>One</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Platform Type</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option>Open this select menu</option>
								<option value='1'>One</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Base Type</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option>Open this select menu</option>
								<option value='1'>One</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</Form.Select>
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product URL</Form.Label>
							<Form.Control type='text' placeholder='Enter Product URL' />
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product Download URL</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Product Download URL'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Product Highlights</Form.Label>
							<InputGroup className='mb-3'>
								<Form.Control
									type='text'
									placeholder='Enter Product Highlight'
								/>
								<Button variant='secondary'>
									<Check2Circle />
								</Button>
							</InputGroup>
						</Form.Group>
						<p style={{ color: '#10557a' }}>
							Product highlights are listed below:
						</p>
						<ListGroup>
							<ListGroup.Item>
								Cras justo odio{' '}
								<span>
									<Pen /> <Archive />
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								Dapibus ac facilisis in{' '}
								<span>
									<Pen /> <Archive />
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								Morbi leo risus{' '}
								<span>
									<Pen /> <Archive />
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								Porta ac consectetur a dvds fsdgv refg reg rhgteg dbft h arsdfv
								arsfg{' '}
								<span>
									<Pen /> <Archive />
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								Vestibulum at eros{' '}
								<span>
									<Pen /> <Archive />
								</span>
							</ListGroup.Item>
						</ListGroup>
					</Form>
				</Col>
			</Row>
			<br />
			<Row>
				<Col></Col>
				<Col style={{ textAlign: 'end' }}>
					<Button variant='info'>Cancel</Button>{' '}
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Col>{' '}
			</Row>
		</Card>
	);
};

export default UpdateProduct;
