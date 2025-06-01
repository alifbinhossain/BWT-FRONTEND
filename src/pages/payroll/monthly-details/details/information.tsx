import React from 'react';
import { useParams } from 'react-router-dom';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { IMonthlyDetailsTableData } from '../../_config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: IMonthlyDetailsTableData }> = ({ data }) => {
	const { year, month } = useParams();

	const renderItems = (): ITableListItems => {
		return [
			{ label: 'Employee', value: data.employee_name },
			{ label: 'Salary', value: data.total_salary },
			{
				label: 'Joining Date',
				value: formatDateTable(data.joining_date),
			},
			{ label: 'Month/Year', value: `${month}/${year}` },
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
			<div className=''>
				<TableList items={renderItems()} />
			</div>
		</SectionContainer>
	);
};

export default Information;
