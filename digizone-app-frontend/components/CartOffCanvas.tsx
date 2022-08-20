import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { Badge } from 'react-bootstrap';
import { Button, Card, CloseButton, Image, Offcanvas } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Context } from '../context';
import { getFormatedStringFromDays } from '../helper/utils';
import CartItems from './CartItems';
interface IProps {
	show: boolean;
	setShow: (show: boolean) => void;
}
const CartOffCanvas: FC<IProps> = ({ show, setShow }: IProps) => {
	const handleClose = () => setShow(false);
	const router = useRouter();

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
						onClick={() => {
							setShow(false);
							router.push('/checkout');
						}}
					>
						Checkout
					</Button>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default CartOffCanvas;
