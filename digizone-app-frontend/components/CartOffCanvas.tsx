import { FC } from 'react';
import { Button, Card, CloseButton, Image, Offcanvas } from 'react-bootstrap';
interface IProps {
	show: boolean;
	setShow: (show: boolean) => void;
}
const CartOffCanvas: FC<IProps> = ({ show, setShow }: IProps) => {
	const handleClose = () => setShow(false);

	return (
		<>
			<Offcanvas show={show} onHide={handleClose} placement='end'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Shoping Cart</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className='cartBody'>
						<div className='cartItems'>
							<div className='itemTitle'>
								<Image
									height={50}
									width={50}
									roundedCircle={true}
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
									alt=''
								/>
								<p style={{ marginLeft: '5px' }}>
									Windows 10 Home License Key 32-Bit asfdsaf das fsdf sag afsg
									as
									<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
								</p>
							</div>
							<CloseButton className='deleteCartItem' />
						</div>
						<div className='cartItems'>
							<div className='itemTitle'>
								<Image
									height={50}
									width={50}
									roundedCircle={true}
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
									alt=''
								/>
								<p style={{ marginLeft: '5px' }}>
									Windows 10 Home License Key 32-Bit asfdsaf das fsdf sag afsg
									as
									<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
								</p>
							</div>
							<CloseButton className='deleteCartItem' />
						</div>
						<div className='cartItems'>
							<div className='itemTitle'>
								<Image
									height={50}
									width={50}
									roundedCircle={true}
									src='https://i.ytimg.com/vi/aTVOTY93XXU/maxresdefault.jpg'
									alt=''
								/>
								<p style={{ marginLeft: '5px' }}>
									Windows 10 Home License Key 32-Bit asfdsaf das fsdf sag afsg
									as
									<p style={{ fontWeight: 'bold' }}>3 X ₹300</p>
								</p>
							</div>
							<CloseButton className='deleteCartItem' />
						</div>
					</div>
					<hr />
					<div className='calPlace'>
						<p className='cartTotal' style={{ textAlign: 'end' }}>
							Total: ₹900
						</p>
						<Button variant='primary' style={{ width: '100%' }}>
							Checkout
						</Button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default CartOffCanvas;
