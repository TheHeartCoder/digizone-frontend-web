import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Card, Form } from 'react-bootstrap';
import { resposnePayload } from '../../services/api';
import { Users } from '../../services/user.service';
interface IAccountDetailsProps {
	user: Record<string, any>;
	dispatch: any;
	addToast: any;
}
const AccountDetails: FC<IAccountDetailsProps> = ({
	user,
	dispatch,
	addToast,
}) => {
	const [accountForm, setAccountForm] = React.useState({
		name: user?.name,
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [isLoading, setIsLoading] = React.useState(false);

	const updateUserAccount = async (e: any) => {
		e.preventDefault();
		try {
			const { name, oldPassword, newPassword, confirmPassword } = accountForm;

			if(!newPassword || !confirmPassword || !oldPassword) {
				throw new Error('Invalid password');
			}

			if (newPassword && newPassword.length < 6) {
				throw new Error('Password is too short. Minimum 6 characters');
			}
			if (newPassword !== confirmPassword) {
				throw new Error('Password does not match');
			}
			setIsLoading(true);
			const payload = {
				name,
				oldPassword,
				newPassword,
			};
			const { success, message, result }: resposnePayload =
				await Users.updateUser(payload, user.id);
			if (!success) throw new Error(message);

			dispatch({
				type: 'UPDATE_USER',
				payload: result,
			});

			setAccountForm({
				name: result.name,
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
			});

			addToast(message, { appearance: 'success', autoDismiss: true });
		} catch (error: any) {
			console.log(error);
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Card className='mt-3'>
			<Card.Header>Register</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Full name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your full name'
							value={accountForm.name}
							onChange={(e) =>
								setAccountForm({ ...accountForm, name: e.target.value })
							}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='name@example.com'
							disabled={true}
							value={user?.email}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Current Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter your password'
							onChange={(e) =>
								setAccountForm({ ...accountForm, oldPassword: e.target.value })
							}
							value={accountForm.oldPassword}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>New Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter your new password'
							onChange={(e) =>
								setAccountForm({ ...accountForm, newPassword: e.target.value })
							}
							value={accountForm.newPassword}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Re-type Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Re-type your password'
							onChange={(e) =>
								setAccountForm({
									...accountForm,
									confirmPassword: e.target.value,
								})
							}
							value={accountForm.confirmPassword}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Button
							variant='info'
							type='submit'
							className='btnAuth'
							onClick={updateUserAccount}
							disabled={isLoading}
						>
							{isLoading && (
								<span
									className='spinner-border spinner-border-sm'
									role='status'
									aria-hidden='true'
								></span>
							)}
							Update
						</Button>
					</Form.Group>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default AccountDetails;
