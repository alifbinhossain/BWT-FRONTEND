import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { getMonth, getYear } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { CustomDatePicker } from '@/components/buttons/CustomDatePicker';
import MonthPickerPopover from '@/components/others/month-picker-pop-up';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { monthlyDetailsColumns } from '../_config/columns';
import { IMonthlyDetailsTableData } from '../_config/columns/columns.type';
import { usePayrollMonthlyDetails } from '../_config/query';

const Payment = lazy(() => import('./payment'));

const ManualEntry = () => {
	const navigate = useNavigate();
	const [date, setDate] = useState<Date>(new Date());
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [updatedData, setUpdatedData] = useState({});
	const { data, postData, isLoading, url, refetch } = usePayrollMonthlyDetails<IMonthlyDetailsTableData[]>(
		date.getFullYear(),
		date.getMonth() + 1
	);

	const pageInfo = useMemo(() => new PageInfo('Payroll/Monthly Details', url, 'payroll__monthly_details'), [url]);

	const handleRedirect = (row: IMonthlyDetailsTableData) => {
		navigate(`/payroll/monthly-employee-details/${row.employee_uuid}/${date.getFullYear()}/${date.getMonth() + 1}`);
	};

	const handlePayment = (row: Row<IMonthlyDetailsTableData>) => {
		setUpdatedData({ ...row.original, current_year: getYear(date), current_month: getMonth(date) + 1 });
		setIsOpenAddModal(true);
	};

	// Table Columns
	const columns = monthlyDetailsColumns({ handleRedirect, handlePayment });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<div className='flex flex-col gap-8'>
				<TableProvider
					title={pageInfo.getTitle()}
					columns={columns}
					data={data ?? []}
					isLoading={isLoading}
					handleRefetch={refetch}
					toolbarOptions={[
						'advance-filter',
						'all-filter',
						'export-csv',
						'export-pdf',
						'faceted-filter',
						'other',
						'refresh',
						'view',
					]}
					defaultVisibleColumns={{
						updated_at: false,
						created_by_name: false,
						created_at: false,
						actions: false,
						remarks: false,
					}}
					otherToolBarComponents={
						<MonthPickerPopover
							date={date}
							setDate={setDate}
							maxDate={new Date()}
						/>
					}
					rightColumnPinning={['payment']}
				>
					{renderSuspenseModals([
						<Payment
							{...{
								url: '/hr/salary-entry',
								open: isOpenAddModal,
								setOpen: setIsOpenAddModal,
								updatedData,
								setUpdatedData,
								postData,
							}}
						/>,
					])}
				</TableProvider>
			</div>
		</PageProvider>
	);
};

export default ManualEntry;
