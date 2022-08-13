import React, { FC } from 'react';
import {
	Button,
	Card,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
} from 'react-bootstrap';

interface ISkuDetailsFormProps {
	setSkuDetailsFormShow: any;
}

const SkuDetailsForm: FC<ISkuDetailsFormProps> = ({
	setSkuDetailsFormShow,
}) => {
	const handleCancel = () => {
		setSkuDetailsFormShow(false);
	};
	return (
		<Card style={{ padding: '10px' }}>
			<h6 style={{ color: 'green' }}>SKU information ::</h6>
			<Form>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>SKU Name</Form.Label>
					<Form.Control type='text' placeholder='Enter SKU Name' />
				</Form.Group>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>SKU Price For Each License</Form.Label>
					<Form.Control type='text' placeholder='Enter SKU Price' />
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
							title='Select type'
							id='input-group-dropdown-9'
							align='end'
						>
							<Dropdown.Item href='#'>Months</Dropdown.Item>
							<Dropdown.Item href='#'>Years</Dropdown.Item>
						</DropdownButton>
					</InputGroup>
				</Form.Group>

				<div style={{ marginTop: '10px' }}>
					<Button variant='outline-info' onClick={handleCancel}>
						Cancel
					</Button>{' '}
					<Button variant='outline-primary' type='submit'>
						Submit
					</Button>
				</div>
			</Form>
		</Card>
	);
};

export default SkuDetailsForm;
