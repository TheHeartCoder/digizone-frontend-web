import React, { FC, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Users } from '../../pages/services/user.service';
import { useToasts } from 'react-toast-notifications';
import { resposnePayload } from '../../pages/services/api';
import validator from 'validator';
interface IRegisterLoginProps {
	isResgisterForm?: boolean;
}

const RegisterLogin: FC<IRegisterLoginProps> = ({
	isResgisterForm = false,
}) => {
	const { addToast } = useToasts();
	const [authForm, setAuthForm] = React.useState({
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
	});
	// handle login form
	const handleLogin = () => {
		try {
			const payload = {
				email: authForm.email,
				password: authForm.password,
			};
			const res = Users.loginUser(payload);
		} catch (error: any) {
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		}
	};

	// handle register form
	const handleRegister = async (e: any) => {
		e.preventDefault();
		try {
			const { email, name, password, confirmPassword } = authForm;
			if (!name) {
				throw new Error('Invalid name');
			}
			if (!validator.isEmail(email)) {
				throw new Error('Invalid email');
			}
			if (password !== confirmPassword) {
				console.error('Invalid password', password, confirmPassword);
				throw new Error('Password does not match');
			}
			if (password.length < 6 || !validator.isStrongPassword(password)) {
				throw new Error('Password is too short or weak');
			}

			const payload = {
				email: authForm.email,
				password: authForm.password,
				name: authForm.name,
			};

			const { success, message }: resposnePayload = await Users.saveUser(
				payload
			);
			if (!success) throw new Error(message);
			addToast(message, { appearance: 'success', autoDismiss: true });
		} catch (error: any) {
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		}
	};
	return (
		<Card>
			<Card.Header>{isResgisterForm ? 'Register' : 'Login'}</Card.Header>
			<Card.Body>
				<Form>
					{isResgisterForm && (
						<Form.Group className='mb-3'>
							<Form.Label>Full name</Form.Label>
							<Form.Control
								type='text'
								name='name'
								placeholder='Enter your full name'
								value={authForm.name}
								onChange={(e) =>
									setAuthForm({ ...authForm, name: e.target.value })
								}
							/>
						</Form.Group>
					)}
					<Form.Group className='mb-3'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='name@example.com'
							name='email'
							onChange={(e) =>
								setAuthForm({ ...authForm, email: e.target.value })
							}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							name='password'
							placeholder='Enter your password'
							onChange={(e) =>
								setAuthForm({ ...authForm, password: e.target.value })
							}
						/>
					</Form.Group>
					{isResgisterForm && (
						<Form.Group className='mb-3'>
							<Form.Label>Re-type password</Form.Label>
							<Form.Control
								type='password'
								name='repassword'
								placeholder='Re-type your password'
								onChange={(e) =>
									setAuthForm({
										...authForm,
										confirmPassword: e.target.value,
									})
								}
							/>
						</Form.Group>
					)}
					<Form.Group className='mb-3'>
						<Button
							variant='info'
							type='submit'
							className='btnAuth'
							onClick={isResgisterForm ? handleRegister : handleLogin}
						>
							{isResgisterForm ? 'Register' : 'Login'}
						</Button>
					</Form.Group>
				</Form>
				{!isResgisterForm && (
					<a style={{ textDecoration: 'none' }} href=''>
						Forgot your password?
					</a>
				)}
			</Card.Body>
		</Card>
	);
};

export default RegisterLogin;
