import { Product } from '@/pages/work/_config/utils/component';
import { ProductName } from '@/pages/work/_config/utils/function';
import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { IMonthlyDetailsTableData, ISalaryIncrementTableData, ISalaryTableData } from './columns.type';

//* Salary Columns
export const salaryColumns = (): ColumnDef<ISalaryTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'year',
		header: 'Year',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'month',
		header: 'Month',
		enableColumnFilter: false,
	},
];

//* Salary Increment Columns
export const salaryIncrementColumns = (): ColumnDef<ISalaryIncrementTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'effective_date',
		header: 'Effective Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];

//* Monthly details
export const monthlyDetailsColumns = ({
	handleRedirect,
}: {
	handleRedirect: (row: IMonthlyDetailsTableData) => void;
}): ColumnDef<IMonthlyDetailsTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
		cell: (info) => {
			const { employee_uuid } = info.row.original;
			return (
				// <CustomLink
				// 	url={`/payroll/monthly-employee-details/${employee_uuid}`}
				// 	label={info.getValue() as string}
				// 	openInNewTab={true}
				// />
				<span className='cursor-pointer underline' onClick={() => handleRedirect(info.row.original)}>
					{info.getValue() as string}
				</span>
			);
		},
	},
	{
		accessorKey: 'joining_date',
		header: 'Joining Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'total_salary',
		header: 'Salary',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'present_days',
		header: 'Present Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'late_days',
		header: 'Late Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'week_days',
		header: 'Week Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'absent_days',
		header: 'Absent Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'total_leave_days',
		header: 'Leave Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'total_general_holidays',
		header: 'Holidays Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'total_days',
		header: 'Total Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'gross_salary',
		header: 'Gross Salary',
		enableColumnFilter: false,
		cell: (info) => (info.getValue() as number).toFixed(2),
	},
	{
		accessorKey: 'total_advance_salary',
		header: 'Salary Advance',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'others_deduction',
		header: 'Others Deduction',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'net_payable',
		header: 'Net Payable',
		enableColumnFilter: false,
		cell: (info) => (info.getValue() as number).toFixed(2),
	},
];
