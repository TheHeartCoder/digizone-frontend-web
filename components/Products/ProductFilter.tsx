import { useRouter } from 'next/router';
import React from 'react';
import { Card, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
import styles from '../../styles/Product.module.css';

const ProductFilter = () => {
	const router = useRouter();
	const [filterCatText, setFilterCatText] = React.useState('Category');
	const [filterPlatformText, setFilterPlatformText] =
		React.useState('Platform');

	return (
		<Card>
			<Card.Header>Filter By</Card.Header>
			<ListGroup variant='flush'>
				<ListGroup.Item>
					<DropdownButton
						variant='outline-secondary'
						title={filterCatText}
						id='input-group-dropdown-1'
						className={styles.dropdownFilterBtn}
						onSelect={(e) => {
							if (e) {
								setFilterCatText(
									e.includes('Application') ? 'Applications' : 'OS'
								);
								delete router.query.offset;
								router.query.category = e;
								router.push(router);
							} else {
								delete router.query.category;
								router.push(router);
							}
						}}
					>
						<Dropdown.Item href='#' eventKey=''>
							Select category
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='Operating System'>
							Operating System
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='Application Software'>
							Application Software
						</Dropdown.Item>
					</DropdownButton>
				</ListGroup.Item>
				<ListGroup.Item>
					<DropdownButton
						variant='outline-secondary'
						title={filterPlatformText}
						id='input-group-dropdown-1'
						className={styles.dropdownFilterBtn}
						onSelect={(e) => {
							if (e) {
								setFilterPlatformText(e);
								delete router.query.offset;
								router.query.platformType = e;
								router.push(router);
							} else {
								delete router.query.platformType;
								router.push(router);
							}
						}}
					>
						<Dropdown.Item href='#' eventKey=''>
							Select platform
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='Windows'>
							Windows
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='Android'>
							Android
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='iOS'>
							iOS
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='Linux'>
							Linux
						</Dropdown.Item>
						<Dropdown.Item href='#' eventKey='Mac'>
							Mac
						</Dropdown.Item>
					</DropdownButton>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	);
};

export default ProductFilter;
