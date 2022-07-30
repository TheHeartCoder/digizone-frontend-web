import type { NextPage } from 'next';
import {
	Badge,
	Button,
	Card,
	Col,
	Image,
	ListGroup,
	Row,
	Table,
} from 'react-bootstrap';
import { Clipboard } from 'react-bootstrap-icons';

const Order: NextPage = () => {
	return (
		<>
			<Row>
				<Col>
					<Card style={{ marginTop: '20px' }}>
						<Card.Header> Order Details</Card.Header>
						<Card.Body>
							<Table responsive>
								<thead>
									<tr>
										<th>Products</th>
										<th>License Keys</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											{' '}
											<div className='itemTitle'>
												<Image
													height={50}
													width={50}
													roundedCircle={true}
													src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
													alt=''
												/>
												<p style={{ marginLeft: '5px' }}>
													Windows 10 Home License Key 32-Bit asfdsaf das fsdf
													sag afsg as
													<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
												</p>
											</div>
											<Button variant='link'>
												Issue with this product? Then Contact US...
											</Button>
										</td>
										<td>
											er4r3-f4vrv-45fr44-hgj76-ikjio-n7ef4g5{' '}
											<Button variant='light' size='sm'>
												<Clipboard />
											</Button>
										</td>
									</tr>
									<tr>
										<td>
											{' '}
											<div className='itemTitle'>
												<Image
													height={50}
													width={50}
													roundedCircle={true}
													src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
													alt=''
												/>
												<p style={{ marginLeft: '5px' }}>
													Windows 10 Home License Key 32-Bit asfdsaf das fsdf
													sag afsg as
													<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
												</p>
											</div>
											<Button variant='link'>
												Issue with this product? Then Contact US...
											</Button>
										</td>
										<td>
											er4r3-f4vrv-45fr44-hgj76-ikjio-n7ef4g5{' '}
											<Button variant='light' size='sm'>
												<Clipboard />
											</Button>
										</td>
									</tr>
									<tr>
										<td>
											{' '}
											<div className='itemTitle'>
												<Image
													height={50}
													width={50}
													roundedCircle={true}
													src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
													alt=''
												/>
												<p style={{ marginLeft: '5px' }}>
													Windows 10 Home License Key 32-Bit asfdsaf das fsdf
													sag afsg as
													<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
												</p>
											</div>
											<Button variant='link'>
												Issue with this product? Then Contact US...
											</Button>
										</td>
										<td>
											er4r3-f4vrv-45fr44-hgj76-ikjio-n7ef4g5{' '}
											<Button variant='light' size='sm'>
												<Clipboard />
											</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card style={{ marginTop: '20px' }}>
						<Card.Header>
							<Card.Title>Total Amout : ₹2533</Card.Title>
						</Card.Header>
						<Card.Body>
							<ListGroup className='list-group-flush'>
								<ListGroup.Item>
									Order Date & Time: 20th Sep, 2022, 06:26PM
								</ListGroup.Item>
								<ListGroup.Item>Paymnet Method: Card</ListGroup.Item>
								<ListGroup.Item>
									Order Status: <Badge bg='secondary'>Completed</Badge>
								</ListGroup.Item>
								<ListGroup.Item>
									Billing Address : 1600 Pennsylvania Avenue NW Washington, D.C.{' '}
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Order;
