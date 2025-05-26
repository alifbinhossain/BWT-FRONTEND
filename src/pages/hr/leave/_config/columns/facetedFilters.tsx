import { ITableFacetedFilter, ITableFilterOptionSSR } from '@/types';

import { ILeaveApply } from '../schema';

export const type1FacetedFilters: ITableFacetedFilter[] = [
	{
		id: 'status',
		title: 'Status',
		options: [
			{
				label: 'Success',
				value: 'success',
			},
			{
				label: 'Failed',
				value: 'failed',
			},
		],
	},
];
export const applyLeaveFilters: ITableFilterOptionSSR<ILeaveApply>[] = [
	{
		accessor: 'leave_category_uuid',
		label: 'Category',
		type: 'select',
		apiUrl: '/other/leave-category/value/label',
	},
	{
		accessor: 'employee_uuid',
		label: 'Employee',
		type: 'select',
		apiUrl: '/other/employee/value/label',
	},
	{
		accessor: 'year',
		label: 'Buyer',
		type: 'text',
	},
	{
		accessor: 'from_date',
		label: 'From Date',
		type: 'date',
	},
	{
		accessor: 'to_date',
		label: 'To Date',
		type: 'date',
	},
	{
		accessor: 'approval',
		label: 'Status',
		type: 'date',
	},
];
