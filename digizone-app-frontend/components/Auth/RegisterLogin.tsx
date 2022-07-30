import React, { FC } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Users } from '../../pages/services/user.service';
import { useToasts } from 'react-toast-notifications';
import { resposnePayload } from '../../pages/services/api';
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
	const handleLogin = () => {
		try {
			const payload = {
				email: authForm.email,
				password: authForm.password,
			};
			const res = Users.loginUser(payload);
		} catch (error: any) {
			addToast(error.message, { appearance: 'error' });
		}
	};
	const handleRegister = async () => {
		try {
			const payload = {
				email: authForm.email,
				password: authForm.password,
				name: authForm.name,
			};
			const { success, message, result }: resposnePayload =
				await Users.saveUser(payload);
			if (!success) throw new Error(message);
			addToast(message, { appearance: 'success' });
		} catch (error: any) {
			addToast(error.message, { appearance: 'error' });
		}
	};
	return (
		<Card>
			<Card.Header>{isResgisterForm ? 'Register' : 'Login'}</Card.Header>
			<Card.Body>
				<Form>
					{isResgisterForm && (
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Full name</Form.Label>
							<Form.Control type='text' placeholder='Enter your full name' />
						</Form.Group>
					)}
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Email address</Form.Label>
						<Form.Control type='email' placeholder='name@example.com' />
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' placeholder='Enter your password' />
					</Form.Group>
					{isResgisterForm && (
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Re-type password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Re-type your password'
							/>
						</Form.Group>
					)}
					<Form.Group className='mb-3'>
						<Button
							variant='info'
							type='submit'
							className='btnAuth'
							onSubmit={isResgisterForm ? handleRegister : handleLogin}
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
