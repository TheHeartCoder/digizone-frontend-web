import React, { FC } from 'react';
import { Card, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import StarRatingComponent from 'react-star-rating-component';
import { useToasts } from 'react-toast-notifications';

interface IProps {
	reviews: [any];
}

const intialState = {
	rating: 0,
	review: '',
};

const ReviewSection: FC<IProps> = ({ reviews }) => {
	const [allReviews, setAllReviews] = React.useState(reviews);
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = React.useState(false);
	const [reviewForm, setReviewFrom] = React.useState(intialState);

	const handleSubmit = () => {};
	const handleDelete = () => {};
	return (
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
							onStarClick={(nextValue) =>
								setReviewFrom({ ...reviewForm, rating: nextValue })
							}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Your Review</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							onChange={(e) =>
								setReviewFrom({ ...reviewForm, review: e.target.value })
							}
						/>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='formBasicCheckbox'
					></Form.Group>
					<Button variant='primary' onClick={handleSubmit}>
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
				{allReviews.map((review, index) => (
					<Card
						bg='light'
						key={index}
						text='dark'
						style={{ width: '100%' }}
						className='mb-2'
					>
						<Card.Header className='reviewHeader'>
							<PersonFill className='personReview' />
							{review.customerName}
							<StarRatingComponent
								name='rate2'
								editing={false}
								starCount={5}
								value={review.rating}
							/>
						</Card.Header>
						<Card.Body>
							<Card.Text>
								<p className='reviewDt'>{review.updatedAt}</p>
								{review.feedbackMsg}
							</Card.Text>
							<Button variant='danger' onClick={handleDelete}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				))}
				{allReviews.length < 1 && <h5>No reviews</h5>}
			</div>
		</div>
	);
};

export default ReviewSection;
