import Link from 'next/link';
import React, { FC, useContext } from 'react';
import { Badge, Button, Image } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Context } from '../context';
import { getFormatedStringFromDays } from '../helper/utils';

interface IProps {
	rmvdeleteBtn?: boolean;
}

const CartItems: FC<IProps> = ({ rmvdeleteBtn }) => {
	const { cartItems, cartDispatch } = useContext(Context);

	const cartDeleteHandler = (id: string) => {
		cartDispatch({ type: 'REMOVE_FROM_CART', payload: { skuId: id } });
	};
	return (
		<>
			{cartItems.length > 0 ? (
				cartItems.map((item: any, index: number) => (
					<div
						className='d-flex justify-content-between align-items-center mt-3 p-2 items rounded'
						key={index}
					>
						<div className='d-flex flex-row'>
							<Image
								alt=''
								height={50}
								width={50}
								roundedCircle={true}
								src={item.productImage}
							/>
							<div className='ml-2'>
								<span className='d-block'>{item.productName}</span>
								<span className='spec'>
									<Badge bg='info' text='dark'>
										{item.lifetime
											? 'Lifetime'
											: getFormatedStringFromDays(item.validity)}
									</Badge>
								</span>
							</div>
						</div>
						<div className='d-flex flex-row align-items-center'>
							<span>
								{item.quantity} X ₹{item.price}
							</span>
							{!rmvdeleteBtn && (
								<Button
									variant='outline-danger'
									style={{ marginLeft: '5px' }}
									onClick={() => cartDeleteHandler(item.skuId)}
								>
									<Trash />
								</Button>
							)}
						</div>
					</div>
				))
			) : (
				<div className='d-flex flex-row'>
					<h4>No items in cart</h4>
					<Link href={`/products`}>
						<Button variant='outline-primary' style={{ marginLeft: '10px' }}>Shop Now</Button>
					</Link>
				</div>
			)}
			<hr />
			<div className='calPlace'>
				<p className='cartTotal' style={{ textAlign: 'end' }}>
					Total: ₹
					{cartItems
						.map(
							(item: { quantity: number; price: number }) =>
								Number(item.price) * Number(item.quantity)
						)
						.reduce((a: number, b: number) => a + b, 0)}
				</p>
			</div>
		</>
	);
};

export default CartItems;
