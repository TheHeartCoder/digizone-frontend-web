import React, { FC, useEffect } from 'react';
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { Archive, Eye, Pen } from 'react-bootstrap-icons';
import { useToasts } from 'react-toast-notifications';
import { getFormatedStringFromDays } from '../../helper/utils';
import { Products } from '../../services/product.service';
import SkuDetailsForm from './SkuDetailsForm';
import SkuDetailsLicense from './SkuDetailsLicense';

interface ISkuDetailsListProps {
	skuDetails: any;
	productId: string;
	setAllSkuDetails: any;
}

const SkuDetailsList: FC<ISkuDetailsListProps> = ({
	skuDetails: allSkuDetails,
	productId,
	setAllSkuDetails,
}) => {
	const [skuDetailsFormShow, setSkuDetailsFormShow] = React.useState(false);
	const [skuIdForUpdate, setSkuIdForUpdate] = React.useState('');
	const [licensesListFor, setLicensesListFor] = React.useState('');
	const [isLoadingForDelete, setIsLoadingForDelete] = React.useState({
		status: false,
		id: '',
	});

	const { addToast } = useToasts();
	const deleteHandler = async (skuId: string) => {
		try {
			const deleteConfirm = confirm(
				'Want to delete? You will lost all licenses for this sku'
			);
			if (deleteConfirm) {
				setIsLoadingForDelete({ status: true, id: skuId });
				const deleteSkuRes = await Products.deleteSku(productId, skuId);
				if (!deleteSkuRes.success) {
					throw new Error(deleteSkuRes.message);
				}
				setAllSkuDetails(
					allSkuDetails.filter((sku: { _id: string }) => sku._id !== skuId)
				);
				addToast(deleteSkuRes.message, {
					appearance: 'success',
					autoDismiss: true,
				});
			}
		} catch (error: any) {
			if (error.response) {
				if (Array.isArray(error.response?.data?.message)) {
					return error.response.data.message.forEach((message: any) => {
						addToast(message, { appearance: 'error', autoDismiss: true });
					});
				} else {
					return addToast(error.response.data.message, {
						appearance: 'error',
						autoDismiss: true,
					});
				}
			}
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} finally {
			setIsLoadingForDelete({ status: false, id: '' });
		}
	};

	return (
		<>
			{!skuDetailsFormShow && !licensesListFor && (
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
								{/* <th>Quantity</th> */}
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
												{skuDetail?.lifetime
													? 'Lifetime'
													: getFormatedStringFromDays(skuDetail?.validity)}
											</Badge>
										</td>
										{/* <td>{skuDetail?.quantity}</td> */}
										<td>
											<Button
												variant='link'
												onClick={() => {
													setLicensesListFor(skuDetail?._id);
													setSkuDetailsFormShow(false);
												}}
											>
												View
											</Button>
										</td>
										<td>
											<Button
												variant='outline-dark'
												id={skuDetail._id}
												onClick={() => {
													setSkuIdForUpdate(skuDetail._id);
													setSkuDetailsFormShow(true);
												}}
											>
												<Pen />
											</Button>{' '}
											<Button
												variant='outline-dark'
												onClick={() => deleteHandler(skuDetail._id)}
											>
												{isLoadingForDelete.status &&
												isLoadingForDelete.id === skuDetail._id ? (
													<span
														className='spinner-border spinner-border-sm'
														role='status'
														aria-hidden='true'
													></span>
												) : (
													<Archive />
												)}
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
				<SkuDetailsForm
					setSkuDetailsFormShow={setSkuDetailsFormShow}
					setAllSkuDetails={setAllSkuDetails}
					allSkuDetails={allSkuDetails}
					productId={productId}
					skuIdForUpdate={skuIdForUpdate}
					setSkuIdForUpdate={setSkuIdForUpdate}
				/>
			)}

			{licensesListFor && (
				<SkuDetailsLicense
					licensesListFor={licensesListFor}
					setLicensesListFor={setLicensesListFor}
					productId={productId}
				/>
			)}
		</>
	);
};

export default SkuDetailsList;
