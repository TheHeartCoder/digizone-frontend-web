import type { NextPage } from 'next';
import {
	Badge,
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
	ListGroup,
	Nav,
	SplitButton,
	Tabs,
} from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import NumericInput from 'react-numeric-input';
import {
	Archive,
	BagCheckFill,
	Check2Circle,
	Eye,
	Pen,
	PersonFill,
} from 'react-bootstrap-icons';
import { Tab } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import CartOffCanvas from '../../components/CartOffCanvas';

const Product: NextPage = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Row className='firstRow'>
				<Col sm={4}>
					<Card className='productImgCard'>
						<Card.Img
							variant='top'
							src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
						/>
					</Card>
				</Col>
				<Col sm={8}>
					<h2>Microsoft Windows 10 Pro - License Key (64Bit)</h2>
					<div className='divStar'>
						<StarRatingComponent
							name='rate2'
							editing={false}
							starCount={5}
							value={3}
						/>
						(507)
					</div>
					<p className='productPrice'>
						₹949.00{' '}
						<Badge bg='warning' text='dark'>
							2 Years
						</Badge>
					</p>
					<ul>
						<li>
							The sale includes a license key which will be sent to your email
							address immediately after payment.{' '}
						</li>
						<li> The license key is valid for one computer only.</li>
						<li> The license key is valid for one user only.</li>
						<li>
							You will get all official updates and support from Microsoft.{' '}
						</li>
					</ul>
					<div className='productSkuZone'>
						<NumericInput min={1} max={5} value={1} size={5} />
						<Form.Select
							aria-label='Default select example'
							className='selectValidity'
						>
							<option>Select validity</option>
							<option value='1'>One</option>
							<option value='2'>Two</option>
							<option value='3'>Three</option>
						</Form.Select>
						<Button variant='primary' className='cartBtn' onClick={handleShow}>
							<BagCheckFill className='cartIcon' />
							Add to cart
						</Button>
					</div>
				</Col>
			</Row>
			<br />
			<hr />
			<Row>
				<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
					<Row>
						<Col sm={3}>
							<Nav variant='pills' className='flex-column'>
								<Nav.Item>
									<Nav.Link eventKey='first' href='#'>
										Descriptions
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='second' href='#'>
										Requirements
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='third' href='#'>
										Reviews
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey='fourth' href='#'>
										Product SKUs
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey='first'>
									The new Windows 10 Home operating system offers both
									experienced users and beginners in, as the name implies, the
									“home environment” ideal computer support. Just like every
									previous “Home” version from Microsoft, the Win 10 Home
									operating system stand out with its extremely user-friendly
									interface. In addition, Microsoft Windows 10 Home adjusts to
									the device used and its properties according to the platform.
									System requirements for the Windows 10 Home operating system
									are the same as for its two predecessors, Windows 7 und 8.1.
									This means that even older computers can run with Windows 10
									Home without a problem.
								</Tab.Pane>
								<Tab.Pane eventKey='second'>
									<Table responsive>
										<tbody>
											<tr>
												<td width='30%'>Table cell </td>
												<td width='70%'>Table cell </td>
											</tr>
											<tr>
												<td>Table cell </td>
												<td>Table cell </td>
											</tr>
											<tr>
												<td>Table cell </td>
												<td>Table cell </td>
											</tr>
											<tr>
												<td>Table cell </td>
												<td>Table cell </td>
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
												<Form.Group
													className='mb-3'
													controlId='formBasicPassword'
												>
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
										<DropdownButton
											variant='outline-secondary'
											title='Filter by rating'
											id='input-group-dropdown-2'
										>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={5}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={4}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={3}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={2}
												/>
											</Dropdown.Item>
											<Dropdown.Item href='#'>
												<StarRatingComponent
													name='rate2'
													editing={false}
													starCount={5}
													value={1}
												/>
											</Dropdown.Item>
										</DropdownButton>
										<div className='reviewZone'>
											{' '}
											{[
												'Light',
												'Light',
												'Light',
												'Light',
												'Light',
												'Light',
											].map((variant) => (
												<Card
													bg={variant.toLowerCase()}
													key={variant}
													text={
														variant.toLowerCase() === 'light' ? 'dark' : 'white'
													}
													style={{ width: '100%' }}
													className='mb-2'
												>
													<Card.Header className='reviewHeader'>
														<PersonFill className='personReview' />
														Arindam Paul{' '}
														<StarRatingComponent
															name='rate2'
															editing={false}
															starCount={5}
															value={3}
														/>
													</Card.Header>
													<Card.Body>
														<Card.Text>
															<p className='reviewDt'>20th September 2017</p>
															Some quick example text to build on the card title
															and make up the bulk of the cards content.
														</Card.Text>
													</Card.Body>
												</Card>
											))}
										</div>
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey='fourth'>
									<Button variant='secondary'>Add SKU Details</Button>
									<Table responsive>
										<thead>
											<tr>
												<th>Name</th>
												<th>Price</th>
												<th>Quantity</th>
												<th>License Keys</th>
												<th>Actions</th>
											</tr>
										</thead>

										<tbody>
											<tr>
												<td>Lucky 001</td>
												<td>
													₹949.00{' '}
													<Badge bg='warning' text='dark'>
														2 Years
													</Badge>
												</td>
												<td>8</td>
												<td>
													<Button
														variant='outline-dark'
														style={{ width: '100%' }}
													>
														<Eye /> View
													</Button>
												</td>
												<td>
													<Button variant='outline-dark'>
														<Pen />
													</Button>{' '}
													<Button variant='outline-dark'>
														<Archive />
													</Button>
												</td>
											</tr>
											<tr>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
											</tr>
											<tr>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
											</tr>
											<tr>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
												<td>Table cell </td>
											</tr>
										</tbody>
									</Table>
									<Card style={{ padding: '10px' }}>
										<Form>
											<Form.Group controlId='formBasicEmail'>
												<Form.Label>SKU Name</Form.Label>
												<Form.Control
													type='text'
													placeholder='Enter SKU Name'
												/>
											</Form.Group>
											<Form.Group controlId='formBasicPassword'>
												<Form.Label>SKU Price For Each License</Form.Label>
												<Form.Control
													type='text'
													placeholder='Enter SKU Price'
												/>
											</Form.Group>
											<Form.Group controlId='formBasicPassword'>
												<Form.Label>SKU Validity</Form.Label>{' '}
												<small style={{ color: 'grey' }}>
													(If validity is lifetime then check the box)
													<Form.Check type='switch' id='custom-switch' />
												</small>
												<InputGroup className='mb-3'>
													<Form.Control aria-label='Text input with checkbox' />
													<DropdownButton
														variant='outline-secondary'
														title='Dropdown'
														id='input-group-dropdown-9'
														align='end'
													>
														<Dropdown.Item href='#'>Action</Dropdown.Item>
														<Dropdown.Item href='#'>
															Another action
														</Dropdown.Item>
														<Dropdown.Item href='#'>
															Something else here
														</Dropdown.Item>
														<Dropdown.Divider />
														<Dropdown.Item href='#'>
															Separated link
														</Dropdown.Item>
													</DropdownButton>
												</InputGroup>
											</Form.Group>

											<Form.Group controlId='formBasicPassword'>
												<Form.Label>SKU License Keys</Form.Label>
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
											<div>License Keys are listed below:</div>
											<ListGroup className='licenceLists'>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Badge bg='info'>
														dlehf4-ef443g-f4rgv2-fergr3-gvr553r-efwew
													</Badge>{' '}
													<span>
														<Pen /> <Archive />
													</span>
												</ListGroup.Item>
											</ListGroup>
											<div style={{ marginTop: '10px' }}>
												<Button variant='outline-info'>Cancel</Button>{' '}
												<Button variant='outline-primary' type='submit'>
													Submit
												</Button>
											</div>
										</Form>
									</Card>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Row>
			<br />
			<div className='separator'>Related Products</div>
			<br />
			<Row xs={1} md={4} className='g-3'>
				{Array.from({ length: 4 }).map((_, idx) => (
					// eslint-disable-next-line react/jsx-key
					<Col>
						<Card className='productCard'>
							<Card.Img
								variant='top'
								src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
							/>
							<Card.Body>
								<Card.Title>Microsoft Window 10</Card.Title>
								<StarRatingComponent
									name='rate2'
									editing={false}
									starCount={5}
									value={3}
								/>
								<Card.Text>
									<span className='priceText'>
										<span className='priceText'>₹949.00 - ₹1699.00</span>
									</span>
								</Card.Text>
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<Badge bg='warning' text='dark'>
									2 Years
								</Badge>{' '}
								<br />
								<Button variant='outline-dark' className='viewProdBtn'>
									View Details
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			<CartOffCanvas setShow={setShow} show={show} />
		</>
	);
};

export default Product;
