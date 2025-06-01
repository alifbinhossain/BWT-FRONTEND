import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { useParams } from 'react-router-dom';

import { PageInfo } from '@/utils';

import { IMonthlyDetailsTableData } from '../../_config/columns/columns.type';
import { usePayrollMonthlyDetails } from '../../_config/query';
import CalcInfo from './calcInfo';
import Information from './information';

const ManualEntry = () => {
	const { uuid, year, month } = useParams();

	const { data, isLoading, url } = usePayrollMonthlyDetails<IMonthlyDetailsTableData>(
		Number(year),
		Number(month),
		`employee_uuid=${uuid}`
	);

	const pageInfo = useMemo(
		() => new PageInfo('Employee Monthly Details', url, 'payroll__monthly_employee_details'),
		[url]
	);

	if (isLoading) return <div>Loading...</div>;

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<div className='space-y-8'>
				<Information data={(data || []) as IMonthlyDetailsTableData} />
				<CalcInfo data={(data || []) as IMonthlyDetailsTableData} />
			</div>
		</PageProvider>
	);
};

export default ManualEntry;
