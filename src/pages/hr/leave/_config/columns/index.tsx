import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { ICategoryTableData, IConfigurationTableData, IPolicyTableData } from './columns.type';

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
export const applyLeaveColumns = (): ColumnDef<IPolicyTableData>[] => [
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
	{
		accessorKey: 'leave_category_name',
		header: 'Leave Category',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'maximum_number_of_allowed_leaves',
		header: 'Number of Leaves',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
