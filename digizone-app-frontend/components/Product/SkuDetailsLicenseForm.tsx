import React from 'react';
import {
	Button,
	Card,
	Form,
	InputGroup,
	Badge,
	ListGroup,
} from 'react-bootstrap';
import { Archive, Check2Circle, Pen } from 'react-bootstrap-icons';

const SkuDetailsLicenseForm = () => {
	return (
		<Card style={{ padding: '10px' }}>
			<Form>
				<h6 style={{ color: 'green' }}>License Keys Information ()::</h6>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>SKU License Keys</Form.Label>
					<InputGroup className='mb-3'>
						<Form.Control type='text' placeholder='Enter License Key' />
						<Button variant='secondary'>
							<Check2Circle /> Submit
						</Button>
					</InputGroup>
				</Form.Group>
				<div>License Keys are listed below:</div>
				<ListGroup className='licenceLists'>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
					<ListGroup.Item>
						<Badge bg='info'>dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew</Badge>{' '}
						<span>
							<Pen /> <Archive />
						</span>
					</ListGroup.Item>
				</ListGroup>
			</Form>
		</Card>
	);
};

export default SkuDetailsLicenseForm;
