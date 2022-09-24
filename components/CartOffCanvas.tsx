import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useContext } from 'react';
import { Badge } from 'react-bootstrap';
import { Button, Card, CloseButton, Image, Offcanvas } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { useToasts } from 'react-toast-notifications';
import { Context } from '../context';
import { getFormatedStringFromDays } from '../helper/utils';
import { Orders } from '../services/order.service';
import CartItems from './CartItems';
interface IProps {
	show: boolean;
	setShow: (show: boolean) => void;
}
const CartOffCanvas: FC<IProps> = ({ show, setShow }: IProps) => {
	const handleClose = () => setShow(false);
	const { addToast } = useToasts();
	const router = useRouter();
	const { cartItems, cartDispatch } = useContext(Context);
	const [isLoading, setIsLoading] = React.useState(false);
	const handleCheckout = async () => {
		try {
			setIsLoading(true);
			if (cartItems.length > 0) {
				const sessionRes = await Orders.checkoutSession(cartItems);
				if (!sessionRes.success) {
					throw new Error(sessionRes.message);
				}
				router.push(sessionRes.result);
			}
		} catch (error: any) {
			// if (error.response) {
			// 	if (Array.isArray(error.response?.data?.message)) {
			// 		return error.response.data.message.forEach((message: any) => {
			// 			addToast(message, { appearance: 'error', autoDismiss: true });
			// 		});
			// 	} else {
			// 		return addToast(error.response.data.message, {
			// 			appearance: 'error',
			// 			autoDismiss: true,
			// 		});
			// 	}
			// }
			addToast('Something went wrong. Please try again. !', { appearance: 'error', autoDismiss: true });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Offcanvas show={show} onHide={handleClose} placement='end'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Shoping Cart</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<CartItems />
					<Button
						variant='primary'
						style={{ width: '100%' }}
						disabled={isLoading}
						onClick={
							() => handleCheckout()
							// 	{
							// 	setShow(false);
							// 	router.push('/checkout');
							// }
						}
					>
						{isLoading && (
							<span
								className='spinner-border spinner-border-sm mr-2'
								role='status'
								aria-hidden='true'
							></span>
						)}
						Checkout
					</Button>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default CartOffCanvas;
