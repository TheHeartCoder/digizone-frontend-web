import React, { FC, useEffect } from 'react';
import {
	Button,
	Card,
	Form,
	InputGroup,
	Badge,
	ListGroup,
} from 'react-bootstrap';
import {
	Archive,
	ArrowLeft,
	Check2Circle,
	Pen,
	Plus,
} from 'react-bootstrap-icons';
import { useToasts } from 'react-toast-notifications';
import { Products } from '../../services/product.service';

interface ISkuDetailsLicenseProps {
	licensesListFor: string;
	setLicensesListFor: any;
	productId: string;
}

const SkuDetailsLicense: FC<ISkuDetailsLicenseProps> = ({
	licensesListFor,
	setLicensesListFor,
	productId,
}) => {
	const [licenses, setLicenses] = React.useState([]);
	const [licenseKey, setLicenseKey] = React.useState('');
	const [addFormShow, setAddFormShow] = React.useState(false);
	const [licenseIdForUpdate, setLicenseIdForUpdate] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [isLoadingForDelete, setIsLoadingorDelete] = React.useState({
		status: false,
		id: '',
	});
	const [isLoadingForFetch, setIsLoadingorFetch] = React.useState(false);
	const { addToast } = useToasts();
	useEffect(() => {
		if (licensesListFor) {
			fetchAllLicenses(productId, licensesListFor);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [licensesListFor]);

	// reset all state on useEffect
	useEffect(() => {
		setLicenses([]);
		setLicenseKey('');
		setAddFormShow(false);
		setLicenseIdForUpdate('');
	}, []);

	const fetchAllLicenses = async (productId: string, skuId: string) => {
		try {
			setIsLoadingorFetch(true);
			const licensesRes = await Products.getLicenses(productId, skuId);
			if (!licensesRes.success) {
				throw new Error(licensesRes.message);
			}
			setLicenses(licensesRes?.result);
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
			setIsLoadingorFetch(false);
		}
	};

	const deleteLicense = async (licenseId: string) => {
		try {
			const deleteConfirm = confirm(
				'Want to delete? You will lost all licenses for this sku'
			);
			if (deleteConfirm) {
				setIsLoadingorDelete({ status: true, id: licenseId });
				const deleteLicenseRes = await Products.deleteLicense(licenseId);
				if (!deleteLicenseRes.success) {
					throw new Error(deleteLicenseRes.message);
				}
				fetchAllLicenses(productId, licensesListFor);
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
			setIsLoadingorDelete({ status: false, id: '' });
		}
	};

	const addLicense = async () => {
		try {
			if (!licenseKey) throw new Error('License key is required');
			setIsLoading(true);
			const addLicenseRes = licenseIdForUpdate
				? await Products.updateLicense(
						productId,
						licensesListFor,
						licenseIdForUpdate,
						{ licenseKey }
				  )
				: await Products.addLicense(productId, licensesListFor, { licenseKey });
			if (!addLicenseRes.success) {
				throw new Error(addLicenseRes.message);
			}
			setLicenseKey('');
			setAddFormShow(false);
			fetchAllLicenses(productId, licensesListFor);
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
			setIsLoading(false);
		}
	};

	return (
		<Card style={{ padding: '10px' }}>
			<Button
				variant='info'
				className='btnBackLicense'
				style={{ width: 'fit-content', margin: '3px' }}
				onClick={() => setLicensesListFor('')}
			>
				<ArrowLeft />
			</Button>
			{(!addFormShow || licenseIdForUpdate) && (
				<Button
					variant='secondary'
					className='btnAddLicense'
					onClick={() => {
						setAddFormShow(true);
						setLicenseKey('');
					}}
					style={{ width: 'fit-content', margin: '3px' }}
				>
					<Plus />
					Add New
				</Button>
			)}
			{addFormShow && (
				<Form>
					<h6 style={{ color: 'green' }}>
						License Keys Information ({licenses.length})::
					</h6>
					<Form.Group controlId='formBasicPassword'>
						<Form.Label>SKU License Keys</Form.Label>
						<InputGroup className='mb-3'>
							<Form.Control
								type='text'
								placeholder='Enter License Key'
								onChange={(e) => setLicenseKey(e.target.value)}
								value={licenseKey}
							/>
							<Button
								variant='secondary'
								onClick={addLicense}
								disabled={isLoading}
							>
								{isLoading && (
									<span
										className='spinner-border spinner-border-sm mr-2'
										role='status'
										aria-hidden='true'
									></span>
								)}
								<Check2Circle /> Submit
							</Button>
						</InputGroup>
					</Form.Group>
				</Form>
			)}

			<div>License Keys are listed below:</div>
			<ListGroup className='licenceLists'>
				{licenses.length > 0 ? (
					licenses.map((license: any, index: number) => (
						<ListGroup.Item key={index}>
							<Badge bg='info'>{license.licenseKey}</Badge>{' '}
							<span
								className='editLBtn'
								onClick={() => {
									setLicenseIdForUpdate(license._id);
									setLicenseKey(license.licenseKey);
									setAddFormShow(true);
								}}
							>
								<Pen />
							</span>
							<span
								className='delLBtn'
								onClick={() => deleteLicense(license._id)}
							>
								{isLoadingForDelete.status &&
								isLoadingForDelete.id === license._id ? (
									<span
										className='spinner-border spinner-border-sm mr-2'
										role='status'
										aria-hidden='true'
									></span>
								) : (
									<Archive />
								)}
							</span>
						</ListGroup.Item>
					))
				) : (
					<ListGroup.Item>
						<span>
							{isLoadingForFetch ? (
								<>
									<span
										className='spinner-border spinner-border-sm mr-2'
										role='status'
										aria-hidden='true'
									></span>{' '}
									<span>Loading...</span>
								</>
							) : (
								'No License Keys Found'
							)}
						</span>
					</ListGroup.Item>
				)}
			</ListGroup>
		</Card>
	);
};

export default SkuDetailsLicense;
