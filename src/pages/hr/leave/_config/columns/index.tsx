import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import DateTime from '@/components/ui/date-time';

import { cn } from '@/lib/utils';

import { IApplyLeaveTableData, ICategoryTableData, IConfigurationTableData, IPolicyTableData } from './columns.type';

//* policy
export const policyColumns = (): ColumnDef<IPolicyTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* category
export const categoryColumns = (): ColumnDef<ICategoryTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* Configuration
export const configurationColumns = (): ColumnDef<IConfigurationTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'leave_policy_name',
		header: 'Policy',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'leave_category_name',
		header: 'Leave Category',
		enableColumnFilter: false,
		cell: (info) => {
			const data = info.row.original.configuration_entry.map((item) => item?.leave_category_name);
			return data?.map((item, idx) => (
				<div>
					<span key={idx} className='p-2'>
						{item}
					</span>
					<br />
				</div>
			));
		},
	},
	{
		accessorKey: 'maximum_number_of_allowed_leaves',
		header: 'Number of Leaves',
		enableColumnFilter: false,
		cell: (info) => {
			const data = info.row.original.configuration_entry.map((item) => item.maximum_number_of_allowed_leaves);
			return data?.map((item, idx) => (
				<div>
					<span className='p-2' key={idx}>
						{item}
					</span>
					<br />
				</div>
			));
		},
	},

	{
		accessorKey: 'enable_earned_leave',
		header: () => (
			<div className='flex items-center gap-1'>
				<span className='p-2'>
					Earned Leave
					<br />
					Status
				</span>
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => {
			const data = info.row.original.configuration_entry.map((item) => item?.enable_earned_leave);
			return data?.map((item, idx) => (
				<div>
					<StatusButton value={item as boolean} />
					<br />
				</div>
			));
		},
	},
];
//* Apply Leave
export const applyLeaveColumns = ({
	selectedFieldVisit,
	setSelectedFieldVisit,
}: {
	selectedFieldVisit: IApplyLeaveTableData | undefined;
	setSelectedFieldVisit: React.Dispatch<React.SetStateAction<IApplyLeaveTableData | undefined>>;
}): ColumnDef<IApplyLeaveTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'employee_name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => (
			<span
				onClick={() => setSelectedFieldVisit(info.row.original)}
				className={cn(
					'cursor-pointer',
					selectedFieldVisit?.uuid === info.row.original.uuid ? 'font-medium text-accent underline' : ''
				)}
			>
				{info.getValue<string>()}
			</span>
		),
	},
	{
		accessorKey: 'leave_category_name',
		header: 'Category',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorFn: (row) => {
			return row.from_date + ' to ' + row.to_date;
		},
		header: 'Date Range',
		enableColumnFilter: false,
		cell: (info) => (
			<div>
				<DateTime date={info.row.original.from_date as string} isTime={false} />
				<span className='text-[0.7rem] font-semibold'> To</span>
				<DateTime date={info.row.original.to_date as string} isTime={false} />
			</div>
		),
	},
	{
		accessorKey: 'approval',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			const getStatusClassName = (statusString: string) => {
				const status = statusString.toLowerCase();
				if (status === 'pending') {
					return 'bg-yellow-400 text-primary p-2 rounded';
				} else if (status === 'rejected') {
					return 'bg-red-400  text-primary p-2 rounded';
				} else if (status === 'approved') {
					return 'bg-green-400  text-primary p-2 rounded';
				}
			};
			return <span className={getStatusClassName(info.getValue<string>())}>{info.getValue<string>()}</span>;
		},
	},
];
