import React from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IChallanTableData } from '../../_config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IChallanTableData }> = ({ data }) => {
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Delivery Complete',
				value: <StatusButton value={data.is_delivery_complete as boolean} />,
			},

			{
				label: 'ID',
				value: data.challan_no,
			},
			{
				label: 'Customer',
				value: data.customer_name,
			},
			{
				label: 'Challan Type',
				value: data.challan_type,
			},
			{
				label: 'Employee',
				value: data.employee_name,
				hidden: data?.challan_type !== 'employee_delivery' && data?.challan_type !== 'vehicle_delivery',
			},
			{
				label: 'Vehicle',
				value: data.vehicle_name,
				hidden: data?.challan_type !== 'vehicle_delivery',
			},
			{
				label: 'Courier',
				value: data.courier_name,
				hidden: data?.challan_type !== 'courier_delivery',
			},
			{
				label: 'Courier Branch',
				value: data.courier_branch,
				hidden: data?.challan_type !== 'courier_delivery',
			},
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
		];
	};

	return (
		<SectionContainer title={'Information'}>
			<TableList items={renderItems()} />
		</SectionContainer>
	);
};

export default Information;
