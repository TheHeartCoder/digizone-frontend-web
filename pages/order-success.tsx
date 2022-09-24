import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Context } from '../context';

const OrderSuccess = () => {
	const router = useRouter();
	const {
		state: { user },
	} = useContext(Context);
	const { cartDispatch } = useContext(Context);
	useEffect(() => {
		// if (!user || !user.email) {
		// 	router.push('/');
		// }
		cartDispatch({ type: 'CLEAR_CART', payload: {} });
	}, [router, user, cartDispatch]);

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<div className='jumbotron text-center'>
					<h1 className='display-3'>Thank You!</h1>
					<p className='lead'>
						<strong>Please check your order details</strong> for further
						instructions. You will recieve an email with order details.
					</p>
					<hr />
					<p className='lead'>
						<Link href={`/products`}>
							<a className='btn btn-primary btn-sm' role='button'>
								Shop More
							</a>
						</Link>
					</p>
				</div>
			</Col>
		</Row>
	);
};

export default OrderSuccess;
