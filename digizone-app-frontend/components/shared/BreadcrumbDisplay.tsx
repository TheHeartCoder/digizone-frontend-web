import Router from 'next/router';
import { FC, Key } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

interface children {
	active: boolean;
	href: string;
	text: string;
}
interface IProps {
	childrens?: children[];
}
const BreadcrumbDisplay: FC<IProps> = ({ childrens }) => {
	return (
		<Breadcrumb style={{ marginTop: '10px' }}>
			{childrens &&
				childrens.map(
					(
						item: {
							active: boolean;
							href: string;
							text: string;
						},
						index: Key | null | undefined
					) => {
						return (
							<Breadcrumb.Item
								key={index}
								onClick={() => Router.push(item.href)}
							>
								{item.text}
							</Breadcrumb.Item>
						);
					}
				)}
		</Breadcrumb>
	);
};

export default BreadcrumbDisplay;
