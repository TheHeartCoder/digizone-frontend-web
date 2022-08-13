import React, { FC } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { Archive, Eye, Pen } from 'react-bootstrap-icons';
import SkuDetailsForm from './SkuDetailsForm';

interface ISkuDetailsListProps {
	skuDetails: any;
}

const SkuDetailsList: FC<ISkuDetailsListProps> = ({ skuDetails }) => {
	const [skuDetailsFormShow, setSkuDetailsFormShow] = React.useState(false);
	const [allSkuDetails, setAllSkuDetails] = React.useState(skuDetails || []);
	return (
		<>
			{!skuDetailsFormShow && (
				<>
					<Button
						variant='secondary'
						onClick={() => setSkuDetailsFormShow(true)}
					>
						Add SKU Details
					</Button>
					<Table responsive>
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>License Keys</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{allSkuDetails && allSkuDetails.length > 0 ? (
								allSkuDetails.map((skuDetail: any, key: any) => (
									<tr key={key}>
										<td>{skuDetail?.skuName}</td>
										<td>
											₹{skuDetail?.price}{' '}
											<Badge bg='warning' text='dark'>
												{skuDetail?.validity}
											</Badge>
										</td>
										<td>{skuDetail?.quantity}</td>
										<td>
											<Button variant='link'>View</Button>
										</td>
										<td>
											<Button variant='outline-dark'>
												<Pen />
											</Button>{' '}
											<Button variant='outline-dark'>
												<Archive />
											</Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5}>No SKU Details found</td>
								</tr>
							)}
						</tbody>
					</Table>
				</>
			)}

			{skuDetailsFormShow && (
				<SkuDetailsForm setSkuDetailsFormShow={setSkuDetailsFormShow} />
			)}
		</>
	);
};

export default SkuDetailsList;
